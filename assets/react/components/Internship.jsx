import { Grid, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect } from "react";
import { useDatepicker, useInput } from "../hooks";
import DeleteIcon from "@mui/icons-material/Delete";

function Internship(props) {
  const {
    value: companyName,
    setValue: setCompanyName,
    bindValue: bindCompanyName,
  } = useInput(props.companyName ?? "");
  const {
    value: start,
    setValue: setStart,
    bindValue: bindStart,
  } = useDatepicker(props.start ?? "");
  const {
    value: end,
    setValue: setEnd,
    bindValue: bindEnd,
  } = useDatepicker(props.end ?? "");

  // useEffect(() => setCompanyName(props.companyName), [props.companyName]);
  // useEffect(() => setStart(props.start ?? ""), [props.start]);
  // useEffect(() => setEnd(props.end ?? ""), [props.end]);

  useEffect(() => {
    if (
      props.companyName === companyName &&
      props.start === start &&
      props.end === end
    )
      return;

    props.handleChange({
      companyName,
      start,
      end,
    });
  }, [companyName, start, end]);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginTop: 2 }}
    >
      <Grid item xs={5}>
        <TextField
          label="Nazwa firmy"
          variant="standard"
          required
          fullWidth
          name="internship-companyNames[]"
          {...bindCompanyName}
        />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          label="Od"
          required
          format="YYYY-MM-DD"
          {...bindStart}
        />
        <input type="hidden" name="internship-from[]" value={start} />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          label="Do"
          required
          format="YYYY-MM-DD"
          {...bindEnd}
        />
        <input type="hidden" name="internship-to[]" value={end} />
      </Grid>
      <Grid item xs="auto">
        <IconButton onClick={props.handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Internship;
