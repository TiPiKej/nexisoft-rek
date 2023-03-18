import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from "@mui/system";
import React from "react";
import { createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Providers(props) {
    const theme = createTheme();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                {props.children}
                <ToastContainer />
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default Providers;
