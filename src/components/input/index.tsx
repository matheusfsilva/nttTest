/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography } from '@mui/material';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Input, iconErrorSx } from './styles'

interface _Input extends OutlinedInputProps {
    labelinput?: string,
    errormessage?: string | boolean
}

export default function InputSearch(props: _Input) {
    return (
        <>
            <Typography>
                {props?.labelinput}
            </Typography>
            <Input
                size="small"
                fullWidth
                {...props} />
            {
                props.error &&
                <Typography>
                    <InfoOutlinedIcon sx={iconErrorSx} />{props.errormessage}
                </Typography>
            }

        </>

    )
}