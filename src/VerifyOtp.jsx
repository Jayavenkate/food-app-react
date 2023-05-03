import { Button, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useState } from "react";
import { API } from "./global";

export function VerifyOtp() {
  const navigate = useNavigate();

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      OTP: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(`${API}/verifyotp`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        alert("Invalid Otp");
      } else {
        navigate("/setpassword");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={4}>
        <h2>OTP verification</h2>
        <CardContent className="card-container">
          <TextField
            name="OTP"
            value={values.OTP}
            onChange={handleChange}
            label="OTP"
            variant="outlined"
          />

          <Button
            color="secondary"
            type="submit"
            variant="contained"
            sx={{ width: "400px" }}
          >
            Verify OTP
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
