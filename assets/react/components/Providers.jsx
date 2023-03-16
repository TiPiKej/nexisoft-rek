import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from "@mui/system";
import React from "react";
import { createTheme } from '@mui/material';

function Providers(props) {
    const theme = createTheme();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default Providers;
