import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useDatepicker, useInput, useSelect } from "../hooks";
import Internship from "./Internship";
import { styled } from "@mui/system";

const InternshipTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

function Form() {
  const educationOptions = [
    { value: 1, label: "Podstawowe" },
    { value: 2, label: "Średnie" },
    { value: 3, label: "Wyższe" },
  ];

  const { value: name, bindValue: bindName } = useInput("");
  const { value: surname, bindValue: bindSurname } = useInput("");
  const { value: birthDate, bindValue: bindBirthDate } = useDatepicker("");
  const { value: email, bindValue: bindEmail } = useInput("");
  const { value: education, bindValue: bindEducation } = useSelect(
    educationOptions[0].value
  );
  const [internships, setInternships] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    isValidatedOk();

    console.log(name);
    console.log(surname);
    console.log(birthDate);
    console.log(email);
    console.log(education);
    console.log(internships);

    // e.currentTarget.submit();
  };

  const isValidatedOk = () => {
    // TODO dodac walidacje

    return true;
  };

  const addInternship = () => {
    setInternships((internships) => [
      ...internships,
      {
        companyName: "",
        start: "",
        end: "",
      },
    ]);
  };

  const handleDeleteInternship = (i) => {
    setInternships((internships) =>
      internships.filter((el, index) => index !== i)
    );
  };

  const handleModifyInternship = (newEl, i) => {
    const temp = internships.slice();
    temp[i] = newEl;

    setInternships(temp);
  };

  return (
    <Grid
      container
      flexDirection="column"
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
      // action="test"
      sx={{ width: "100%", height: "100%" }}
    >
      <Grid item>
        <TextField
          label="Imie"
          variant="standard"
          fullWidth
          required
          {...bindName}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Nazwisko"
          variant="standard"
          fullWidth
          required
          {...bindSurname}
        />
      </Grid>
      <Grid item>
        <DatePicker
          sx={{ width: "100%" }}
          label="Data urodzenia"
          required
          {...bindBirthDate}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Email"
          variant="standard"
          type="email"
          fullWidth
          required
          {...bindEmail}
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth variant="standard">
          <InputLabel id="select-education">Wykształcenie</InputLabel>
          <Select
            labelId="select-education"
            label="Wykształcenie"
            {...bindEducation}
          >
            {educationOptions.map((educationOption) => (
              <MenuItem
                value={educationOption.value}
                key={educationOption.value}
              >
                {educationOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <InternshipTitle>
          <Typography variant="h6">Staże:</Typography>
          <Button onClick={addInternship} variant="contained">
            Dodaj staż
          </Button>
        </InternshipTitle>
        {internships.map((internship, i) => (
          <Internship
            key={`internship-${i}`}
            {...internship}
            handleDelete={() => handleDeleteInternship(i)}
            handleChange={(newEl) => handleModifyInternship(newEl, i)}
          />
        ))}
        {!internships.length && (
          <Typography variant="body1">Brak staży</Typography>
        )}
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained" fullWidth>
          Zatwierdź
        </Button>
      </Grid>
    </Grid>
  );
}

export default Form;
