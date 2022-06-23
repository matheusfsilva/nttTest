import React from "react";
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { NavLink, useLocation } from "react-router-dom";
import Button from '../../Button';
import { Indicator, BoxSx } from "./styles";

export default function ButtonsContainer() {
    const location = useLocation()
    return (
        <Box sx={BoxSx}>
            <NavLink to="/">
                <Box sx={{ display: 'flex', paddingRight: '20px' }}>
                    <Indicator square elevation={0} sx={{ display: location.pathname === '/' ? 'block' : 'none', marginRight: '10px' }} />
                    <Button fullWidth variante="none" cor="grey" tonalidade={900} startIcon={<HomeIcon />}>Dashboard</Button>
                </Box>
            </NavLink>

            <NavLink to="/listProducer">
                <Box sx={{ display: 'flex', paddingRight: '20px' }}>
                    <Indicator square elevation={0} sx={{ display: location.pathname === '/listProducer' ? 'block' : 'none', marginRight: '10px' }} />
                    <Button fullWidth size="large" variante="none" cor="grey" tonalidade={900} startIcon={<AgricultureIcon />}>Produtores</Button>
                </Box>
            </NavLink>
        </Box>
    )
}