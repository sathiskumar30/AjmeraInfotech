import { TextField } from '@mui/material';
import React from 'react'

interface InputComponentPropsTypes {
    label: string,
    name: string,
    value: string | number | null,
    change: any;
    errorC: Boolean,
    helperText: string | undefined;
    errors: any,
    requird: Boolean,
}

const InputComponent: React.FC<InputComponentPropsTypes> = ({ label, name, value, change, errorC, helperText, errors, requird }) => {


    return (
        <div>
            <TextField
                name={name}
                value={value}
                onChange={change}
                helperText={helperText}
                required={requird === true ? true : false}
                fullWidth
                sx={{

                    '& .MuiInputBase-input': {
                        color: 'white', 
                    },
                    '& .MuiInputBase-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        borderRadius: '5px',
                        color: 'white',
                        height: '40px',
                        borderColor: errorC ? 'red' : 'black',
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '14px',
                        top: '-6px',
                        color:'white'
                    },
                    '& .MuiFormHelperText-root': {
                        position: 'absolute',
                        bottom: '-20px',
                        left: 0,
                        width: '100%',
                        color: 'yellow',
                        display: errors?.[name] ? 'block' : 'none',
                    },
                }}
            />
        </div>
    )
}

export default InputComponent
