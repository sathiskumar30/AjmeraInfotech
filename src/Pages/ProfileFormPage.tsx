import { Box, Button, Grid2, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup';
import InputComponent from '../Components/InputComponent';
import { useContextHook } from '../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SnackBar from '../Components/SnackBar';
import { FormValues } from '../Types/profileForm.type';

const ProfileFormPage = () => {

    type FormErrors = Partial<Record<keyof FormValues, string>>;

    const [formValues, setFormValues] = useState<FormValues>({
        name: null,
        email: null,
        age: null,
    })

    const [errors, setErrors] = useState<FormErrors>({});

    const { myProfileCreateMode, setMyProfileCreateMode,
        URI, setError, editMode, profile, editProfileId,
        setEditProfileId, setEditMode, reload, setReload } = useContextHook();

    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [snackbarmsg, setSnakbarMessgae] = useState<string>('')


    useEffect(() => {
        
        if (editMode) {

            const FilterValue = profile.find((item: any) => {
                return item?.id === editProfileId;
            });

            if (FilterValue) {
                setFormValues((prev) => ({
                    ...prev,
                    name: FilterValue?.name,
                    email: FilterValue?.email,
                    age: FilterValue?.age
                }))
            }
        }else{
            setFormValues({
                name: '',
                email: '',
                age: ''
            })
        }
    }, [editMode])

    const SchemaValidationForForm = Yup.object({
        name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Name must contain only Characters')
            .min(3, 'Name must be at least 3 characters')
            .max(20, 'Name cannot be more than 50 characters')
            .required('Name field is required'),
        email: Yup.string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid Email Format')
            .required('Email field is required'),
        age: Yup.number()
            .typeError('Age must be a number')
            .max(99, 'Age cannot be more than 100')
    })

    const validateField = async (name: string, value: string | number) => {

        try {
            await SchemaValidationForForm.validateAt(name, { ...formValues, [name]: value });
            setErrors((prevErrors) => ({ ...prevErrors, [name]: null }))

        } catch (err: any) { 

            setErrors((prevErros) => ({ ...prevErros, [name]: err.message }))

        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        validateField(name, value);
    }


    const handleSubmitForm = async () => {

        try {

            setErrors({});

            if (editMode) {

                const response = await axios.put(URI + `/${editProfileId}`, {
                    name: formValues?.name,
                    email: formValues?.email,
                    age: formValues?.age
                })

                if (response?.status === 200) {
                    setEditProfileId(null);
                    setFormValues({
                        name: null,
                        email: null,
                        age: null,
                    })
                    setEditMode(false);
                    setReload(true);
                    navigate('/')

                } else if (response?.status === 404) {
                    setError("API is not found , Check you API")
                    setSnackbar(!snackbar)
                    setSnakbarMessgae('API is not found')
                } else {
                    setError('Something went wrong .... ')
                    setEditProfileId(null);
                    setEditMode(false);
                    setReload(false)
                    setSnackbar(!snackbar)
                    setSnakbarMessgae('Something went Wrong')

                }

            } else {

                const response = await axios.post(URI, {
                    name: formValues?.name,
                    email: formValues?.email,
                    age: formValues?.age
                })

                if (response?.status === 201) {
                    if (myProfileCreateMode) {
                        setFormValues({
                            name: null,
                            email: null,
                            age: '',
                        })
                        localStorage.setItem('myprofile', JSON.stringify(response?.data))
                        setMyProfileCreateMode(!myProfileCreateMode)

                    } else {
                        setFormValues({
                            name: null,
                            email: null,
                            age: '',
                        })
                    }
                    setReload(true);
                    setTimeout(() => {
                        setReload(false)
                    }, 500)
                    navigate('/');
                } else if (response?.status === 404) {
                    setError("API is not found , Check you API")
                } else {
                    setError('Something went wrong .... ')
                }
            }


        } catch (validationErrors: any) { 
            const errorObj: FormErrors = {};
            validationErrors.inner.forEach((err: any) => {
                if (err.path) {
                    errorObj[err.path as keyof FormValues] = err.message;
                }
            });
            setErrors(errorObj);
        }

    }

    const isFormValid = formValues.name && formValues.email && !errors.name && !errors.email &&!errors.age;


    return (
        <Grid2 sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh', gap: 4,
            backgroundColor: 'black'
        }}>
            <SnackBar message={snackbarmsg} open={snackbar} onClose={() => false} />

            <Grid2
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 4,
                    padding: 4,
                    borderRadius: 2,
                    color: 'white',
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                }}
            >

                <Grid2>
                    <Typography variant='h5' fontWeight={600}>
                        Create Profile
                    </Typography>
                </Grid2>


                <Grid2 display='flex' flexDirection='column' gap={3} sx={{ color: 'white' }} >
                    <Grid2 sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                        <Typography>Name</Typography>
                        <InputComponent
                            label={"Enter Name"}
                            name={'name'}
                            value={formValues?.name}
                            change={handleInputChange}
                            errorC={Boolean(errors?.name)}
                            helperText={errors?.name}
                            errors={errors}
                            requird={true}
                        />
                    </Grid2>
                    <Grid2 sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                        <Typography>Email</Typography>
                        <InputComponent
                            label={"Enter Email"}
                            name={'email'}
                            value={formValues?.email}
                            change={handleInputChange}
                            errorC={Boolean(errors?.email)}
                            helperText={errors?.email}
                            errors={errors}
                            requird={true}
                        />
                    </Grid2>
                    <Grid2 sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                        <Typography>Age</Typography>
                        <InputComponent
                            label={"Enter Age"}
                            name={'age'}
                            value={formValues?.age}
                            change={handleInputChange}
                            errorC={Boolean(errors?.age)}
                            helperText={errors?.age}
                            errors={errors}
                            requird={false}
                        />
                    </Grid2>
                </Grid2>

                <Grid2 sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>

                    <Button
                        fullWidth
                        variant="contained"
                        color='error'
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            marginBottom: 2,
                            "&:hover": { backgroundColor: "#fe2712" },
                        }}
                        onClick={()=>{
                            setFormValues({
                                name: '',
                                email: '',
                                age: '',
                            })
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color='primary'
                        disabled={!isFormValid}
                        onClick={handleSubmitForm}
                        sx={{
                            fontWeight: "bold",
                            marginBottom: 2,
                            "&:hover": {
                                backgroundColor: "#add8e6",
                                color: 'black'
                            },
                            ":disabled": {
                                color: 'gray',
                                cursor: 'not-allowed'
                            }
                        }}
                    >
                        {editMode ? 'Update' : 'Create'}
                    </Button>

                </Grid2>
            </Grid2>

        </Grid2>
    )
}

export default ProfileFormPage
