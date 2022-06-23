import React from 'react';
import { Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { PaperCard, GridItem, AgricultureIconSx, LocalFloristIconSx, CropFreeIconSx } from './styles';
// import FilterVintageIcon from '@mui/icons-material/FilterVintage';
// import ForestIcon from '@mui/icons-material/Forest';
// import LandscapeIcon from '@mui/icons-material/Landscape';
// import ParkIcon from '@mui/icons-material/Park';

import { ProducerModel } from '../../../providers/models/ProducerModel';

interface _ItemCard {
    producer: ProducerModel,
}
export default function ItemCard({ producer }: _ItemCard) {
    return (
        <NavLink to={`/Producer/${producer.id}`}>
            <PaperCard elevation={0} >
                <Grid container spacing={2}>
                    <GridItem item xs={12} sm={6} >
                        <AgricultureIcon sx={AgricultureIconSx} /><Typography>{producer.name}</Typography>
                    </GridItem>
                    <GridItem item xs={6} sm={4}>
                        <LocalFloristIcon sx={LocalFloristIconSx} />
                        <Typography>{producer.plantationCrops.toLocaleString().replace(/,/g, ", ")}</Typography>
                    </GridItem>
                    <GridItem item xs={6} sm={2}>
                        <CropFreeIcon sx={CropFreeIconSx} />
                        <Typography>{producer.totalArea} ha</Typography>
                    </GridItem>
                </Grid>
            </PaperCard >
        </NavLink>

    )
}