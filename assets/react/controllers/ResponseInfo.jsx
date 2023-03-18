import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import Providers from "../components/Providers";

const BaseGrid = styled(Grid)(({ theme }) => ({
  minWidth: "100vw",
  minHeight: "100vh",
  background: theme.palette.primary.main,
}));

function ResponseInfo(props) {
  const { infoText } = props;

  return (
    <Providers>
      <BaseGrid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Paper sx={{ p: 6 }}>
          <Typography variant="h3">{infoText}</Typography>
        </Paper>
      </BaseGrid>
    </Providers>
  );
}

export default ResponseInfo;
