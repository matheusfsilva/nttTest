import { styled } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

export const Input = styled(OutlinedInput)({
    paddingTop: '5px',
    paddingBottom: '5px',
    marginTop: '5px',
    marginBottom: '5px',
    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DDDDDD',
        borderWidth: 2,
    },
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#DDDDDD',
    },
    '&.MuiOutlinedInput-root.Mui-disabled': {
        backgroundColor: '#DDDDDD',
        border: 'none',
    }
})

export const iconErrorSx = {
    fontSize: '17px',
    marginRight: '3px'
}