import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { primary } from '../../../providers/styles/colors';

export const Indicator = styled(Paper)({
    // position: 'fixed',
    width: '5px',
    backgroundColor: primary,
    borderRadius: '0px !impotant'
})

export const BoxSx = {
    marginTop: { sm: '100px', xs: '0' }
}