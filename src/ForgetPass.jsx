// export function ForgetPass() {
//   return <div>forget pass</div>;
// }
import { Button, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import * as yup from "yup";
import { useState } from "react";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
});
export function ForgetPass() {
  const navigate = useNavigate();

  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        const data = await fetch("http://localhost:7000/login/forgetpassword", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (data.status === 200) {
          console.log("success");
          navigate("/verifyotp");
        } else {
          alert("user not found");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={4}>
        <h2>ForgetPassword </h2>
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

          <Button
            color="secondary"
            type="submit"
            variant="contained"
            sx={{ width: "400px" }}
          >
            Send OTP
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
