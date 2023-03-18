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
import { toast } from "react-toastify";
import dayjs from "dayjs";

const InternshipTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

function Form() {
  const educationOptions = [
    { value: "primary", label: "Podstawowe" },
    { value: "secondary", label: "Średnie" },
    { value: "higher", label: "Wyższe" },
  ];

  const { value: name, bindValue: bindName } = useInput("");
  const { value: surname, bindValue: bindSurname } = useInput("");
  const { value: birthDate, bindValue: bindBirthDate } = useDatepicker("");
  const { value: email, bindValue: bindEmail } = useInput("");
  const { value: education, bindValue: bindEducation } = useSelect(
    educationOptions[0].value
  );
  const [internships, setInternships] = useState([]);
  const [extraAttachments, setExtraAttachments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidatedOk()) return;

    e.currentTarget.submit();
  };

  const isValidatedOk = () => {
    if (name.length === 0) {
      toast("Uzupełnij imie");
      return false;
    }

    if (name.length > 50) {
      toast("Imię musi mieć max 50 znaków");
      return false;
    }

    if (surname.length === 0) {
      toast("Uzupełnij nazwisko");
      return false;
    }

    if (surname.length > 50) {
      toast("Nazwisko musi mieć max 50 znaków");
      return false;
    }
    
    if (!dayjs(birthDate).isValid()) {
      toast("Podaj poprawną datę urodzenia");
      return false;
    }

    const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailReg.test(email)) {
      toast("Wpisz poprawny adres email");
      return false;
    }

    for (const internship of internships) {
      if (internship.companyName.length === 0) {
        toast("Uzupełnij nazwę firmy stażowej");
        return false;
      }

      if (internship.companyName.length > 50) {
        toast("Nazwa firmy stażowej musi mieć max 50 znaków");
        return false;
      }

      if (!dayjs(internship.start).isValid()) {
        toast("Podaj poprawną datę rozpoczęcia stażu");
        return false;
      }

      if (!dayjs(internship.end).isValid()) {
        toast("Podaj poprawną datę zakończenia stażu");
        return false;
      }
    }

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

  const handleAddAttachment = () => {
    setExtraAttachments((extraAttachments) => [
      ...extraAttachments,
      <TextField
        type="file"
        name="extraAttachments[]"
        fullWidth
        // required
        // inputProps={{ accept: ".jpg, .pdf, .doc" }}
        key={`extraAttachment-${extraAttachments.length}-${parseInt(
          Math.random() * 1000
        )}`}
      />,
    ]);
  };

  return (
    <Grid
      container
      flexDirection="column"
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
      action="submit-form"
      encType="multipart/form-data"
      method="POST"
      sx={{ width: "100%", height: "100%" }}
    >
      <Grid item>
        <TextField
          label="Imie"
          variant="standard"
          fullWidth
          required
          name="name"
          {...bindName}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Nazwisko"
          variant="standard"
          fullWidth
          required
          name="surname"
          {...bindSurname}
        />
      </Grid>
      <Grid item>
        <DatePicker
          sx={{ width: "100%" }}
          label="Data urodzenia"
          required
          name="birthDate"
          format="YYYY-MM-DD"
          {...bindBirthDate}
        />
        <input type="hidden" name="birthDate" value={birthDate} />
      </Grid>
      <Grid item>
        <TextField
          label="Email"
          variant="standard"
          type="email"
          fullWidth
          required
          name="email"
          {...bindEmail}
        />
      </Grid>
      <Grid item>
        <Typography variant="h6">LM</Typography>
        <TextField
          type="file"
          name="LM"
          fullWidth
          required
          inputProps={{ accept: ".jpg, .pdf, .doc" }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h6">CV</Typography>
        <TextField
          type="file"
          name="CV"
          fullWidth
          required
          inputProps={{ accept: ".jpg, .pdf, .doc" }}
        />
      </Grid>
      <Grid item>
        <Button onClick={handleAddAttachment} fullWidth variant="outlined">
          Dodaj kolejny załącznik
        </Button>
      </Grid>
      {!!extraAttachments.length && (
        <Grid item container flexDirection="column">
          {extraAttachments.map((extraAttachment) => (
            <Grid item>{extraAttachment}</Grid>
          ))}
        </Grid>
      )}
      <Grid item>
        <FormControl fullWidth variant="standard">
          <InputLabel id="select-education">Wykształcenie</InputLabel>
          <Select
            labelId="select-education"
            label="Wykształcenie"
            name="education"
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
