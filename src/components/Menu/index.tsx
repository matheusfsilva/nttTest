import React from "react";
import { Paper } from "@mui/material";
import { PaperMenu } from './styles';
import ButtonsContainer from "./ButtonsContainer";

export default function Menu() {
    return (
        <Paper elevation={0} square sx={PaperMenu}>
            <ButtonsContainer />
        </Paper>
    )
} 