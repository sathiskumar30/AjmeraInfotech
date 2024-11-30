import { useCallback, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useContextHook } from '../Context/Context'
import { Avatar, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Grid as Grid2, } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ReplayIcon from '@mui/icons-material/Replay';


type FetchingError = AxiosError | any;

const ProfilePage = () => {

  const myProfileData: any = localStorage.getItem('myprofile');
  const parsedData = JSON.parse(myProfileData);

  const [createProfileModal, setCreateProfileModal] = useState<boolean>(false);
  const { URI, profile, setProfile, loading,
    setLoading, error, setError, myProfile,
    setMyProfile, myProfileCreateMode, editMode,
    setMyProfileCreateMode, setEditProfileId, setEditMode, reload, setReload } = useContextHook();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();

  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: 300,
    bgcolor: '#b3bfe1',
    p: 4,
  };

  const fetchData = useCallback(async (endpoint: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(endpoint, { timeout: 5000 });
      if (response?.status === 200) {
        setProfile(response?.data);
        localStorage.setItem('profile', JSON.stringify(response?.data))
      } else if (response?.status === 404) {
        setError("API is not found , Check you API")
      } else {
        setError('Something went wrong .... ')
      }
    } catch (error) {
      const AxiosError = error as FetchingError;
      setError(AxiosError.message || 'Something went wrong ... ')
    } finally {
      setLoading(false)
    }
  }, [editMode])



  useEffect(() => {

    if (!reload) {
      const LocalStorgeCheck = localStorage.getItem('profile');
      const parsedData = LocalStorgeCheck && JSON.parse(LocalStorgeCheck);

      if (parsedData && parsedData.length > 0) {
        setLoading(true);
        setProfile(parsedData);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {

        let url = new URL(URI);
        url.searchParams.append('order', 'desc');
        fetchData(url.toString());
      }
    } else {
      let url = new URL(URI);
      url.searchParams.append('order', 'desc');
      fetchData(url.toString());
    }

    const source = axios.CancelToken.source();
    return () => {
      source.cancel("Component unmounted: Cancelled request");
    };
  }, [fetchData, reload]);



  useEffect(() => {
    if (parsedData?.name) {
      setMyProfile(parsedData)
      setCreateProfileModal(false)
    } else {
      setCreateProfileModal(true)
    }

  }, [myProfileCreateMode])



  const createProfile = () => {
    setMyProfileCreateMode(!myProfileCreateMode)
    navigate('/profile-form');
  }

  const initiateDelete = (id: number) => {
    setDeleteId(id);
    setConfirmDelete(true);
  }

  const handleProfileDelete = async () => {

    try {

      const response = await axios.delete(URI + `/${deleteId}`);

      if (response?.status === 200) {
        setReload(true);
        setTimeout(() => {
          setReload(false);
        }, 500)
      } else if (response?.status === 404) {
        setError("API is not found , Check you API")
      } else {
        setError('Something went wrong .... ')
      }

    } catch (error) {
      setError("Something went wrong")
    } finally {
      setConfirmDelete(false);
      setDeleteId(null)
    }

  }

  const initiateEditMode = (id: any) => {
    setEditProfileId(id);
    setEditMode(true);
    navigate('/profile-form');
  }


  return (
    <Grid2>

      <Modal
        open={createProfileModal}
      >

        <Box sx={style}>
          <Typography variant='h6' sx={{ pb: 3 }}>Create your Profile</Typography>
          <Button variant='contained' onClick={createProfile}>Create Profile</Button>
        </Box>

      </Modal>

      {/* Confirmation Modal for Delete */}
      <Dialog open={confirmDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setConfirmDelete(false)
            setDeleteId(null);
          }} color="primary">
            Cancel
          </Button>
          <Button onClick={handleProfileDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header Container */}
      <Grid2
        bgcolor='#6d44b8'
        height='15%'
        display='flex'
        justifyContent='flex-start'
        alignItems='center'
        px={3}
        py={2}
        gap={2}
      >
        <Typography variant='h5' color='white'> Hi !</Typography>
        <Typography variant='h5' color='white'> {parsedData?.name}</Typography>
      </Grid2>

      {/* Loading Container */}
      {loading &&
        <Grid2 height='100vh' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress />
        </Grid2>
      }

      {/* Body Container */}
      {(!loading && !error) && (
        <Grid2 container direction="column" spacing={2}>

          {/* Title */}
          <Grid2 display='flex' justifyContent='space-between' alignItems='center'>
            <Grid display='flex' justifyContent='center' alignItems='center' gap={1}>
              <Typography variant='h6' paddingLeft={3} paddingTop={2}>Profile Management</Typography>
              <Tooltip title="Fetch data from Database" arrow onClick={() => {
                setReload(true);
                setTimeout(() => {
                  setReload(false);
                }, 500)
              }}>
                <ReplayIcon sx={{ mt: 2 , cursor:'pointer' }} color="primary" />
              </Tooltip>
            </Grid>
            <Button onClick={() => {
              navigate('/profile-form')
              setEditMode(false)
              setMyProfileCreateMode(false);
            }} variant='contained' sx={{ marginRight: 3 }}>Add Profile</Button>
          </Grid2>

          {profile?.length > 0 ? (

            <Grid2 container spacing={2} justifyContent="flex-start" paddingLeft={3} >
              {profile.map((item, index) => (
                <Card sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                  width: { xs: '100%', sm: '30%', md: '29%', lg: '24%' },
                  height: '40%'
                }}>
                  <Grid2 container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant='body1' fontWeight={700}>Profile Details</Typography>
                    <Grid2 sx={{ display: 'flex', gap: 1 }}>
                      <div onClick={() => initiateEditMode(item?.id)}>
                        <EditIcon color='primary' sx={{ cursor: 'pointer' }} />
                      </div>
                      <div onClick={() => initiateDelete(item?.id)}>
                        <DeleteIcon color='error' sx={{ cursor: 'pointer' }} />
                      </div>
                    </Grid2>
                  </Grid2>

                  <Grid2 container spacing={2} flexDirection='row' justifyContent="flex-start" alignItems="center" gap={3}>

                    {/* Avatar */}
                    <Grid2>
                      <Avatar sx={{ width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 } }} />
                    </Grid2>

                    {/* Details */}
                    <Grid2 >
                      <Grid2 container direction="column" spacing={1}>
                        <Grid2>
                          <Typography variant="body1" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Name:</Typography>
                            <Typography>{item?.name}</Typography>
                          </Typography>
                        </Grid2>
                        <Grid2>
                          <Typography variant="body1" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Email:</Typography>
                            <Typography>{item?.email}</Typography>
                          </Typography>
                        </Grid2>
                        <Grid2>
                          <Typography variant="body1" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Age:</Typography>
                            <Typography>{item?.age ? item?.age : '- -'}</Typography>
                          </Typography>
                        </Grid2>
                      </Grid2>
                    </Grid2>

                  </Grid2>
                </Card>
              ))}
            </Grid2>
          ) : (
            <Grid2 display='flex' justifyContent='center' alignItems='center' height='80vh'>
              <Typography variant='h5'>No Data Found</Typography>
            </Grid2>
          )}
        </Grid2>
      )}

      {error && <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{error}</h2>}
    </Grid2>
  )
}

export default ProfilePage