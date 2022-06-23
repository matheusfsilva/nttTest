import { styled } from '@mui/material/styles';
import { Grid, Paper } from '@mui/material';
import { primary } from '../../../providers/styles/colors';

export const PaperCard = styled(Paper)({
    padding: '24px',
    display: 'flex',
    marginBottom: '10px',
    borderRadius: '15px'
})

export const buttonSx = {
    marginRight: '10px !important',
}

export const AgricultureIconSx = {
    marginRight: '20px',
    fontSize: '30px'
}

export const LocalFloristIconSx = {
    marginRight: '20px',
    fontSize: '30px',
    color: primary
}

export const CropFreeIconSx = {
    marginRight: '20px',
    fontSize: '30px',
    color: 'blue'
}

export const GridItem = styled(Grid)({
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis'
})

export const itemButtonSx = {
    display: 'flex',
    justifyContent: { xs: 'flex-start', sm: 'center' }
}