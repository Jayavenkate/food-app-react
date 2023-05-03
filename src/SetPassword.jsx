import { Button, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import * as yup from "yup";
import { useState } from "react";
import { API } from "./global";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required"),
  // password: yup.string().required("password required").min(8),
});
export function SetPassword() {
  const navigate = useNavigate();

  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        const data = await fetch(`${API}/setpassword`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (data.status === 401) {
          console.log("error");
        } else {
          navigate("/login");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={4}>
        <h2>Reset your Password </h2>
        <CardContent className="card-container">
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
            variant="outlined"
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <TextField
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            variant="outlined"
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          {/* <span>
          <Checkbox onClick={togglePassword}aria-label="Checkbox demo"/>
            show password</span> */}

          <Button color="secondary" variant="contained">
            Confirm
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
