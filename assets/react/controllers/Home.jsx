import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Form from "../components/Form";
import Providers from "../components/Providers";

const BaseGrid = styled(Grid)(({ theme }) => ({
  minWidth: "100vw",
  minHeight: "100vh",
  background: theme.palette.primary.main,
  paddingTop: theme.spacing(4),
}));

const BasePaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
  minWidth: 850,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
}));

function Home() {
  return (
    <Providers>
      <BaseGrid
        container
        alignItems="center"
        justifyContent="flex-start"
        direction="column"
      >
        <Grid item>
          <BasePaper>
            <Typography variant="h4">Zgłoszenie rekrutacyjne</Typography>
          </BasePaper>
        </Grid>
        <Grid item component={Box} mt={2}>
          <BasePaper>
            <Form />
          </BasePaper>
        </Grid>
      </BaseGrid>
    </Providers>
  );
}

export default Home;
