import { Button, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Checkbox from "@mui/material/Checkbox";
import * as yup from "yup";
import { useState } from "react";

const formValidationSchema = yup.object({
  name: yup.string().required("required"),
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required"),
  // password: yup.string().required("password required").min(8),
});
export function SignUp() {
  // const [show,setshow]= useState(false);
  const navigate = useNavigate();
  const reDirect =()=>{
    navigate("/login");
  }
  // const togglePassword=()=>{
  //   setshow(!show);
  // }
  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        const data = await fetch("http://localhost:7000/signup",{
          method:"POST",
          headers :{
            "content-type":"application/json"
          },
          body:JSON.stringify(values),
        });
        const result = await data.json();
        console.log(data);
        navigate("/login")
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={4}>
        <h2>SignUp </h2>
        <CardContent className="card-container">
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            variant="outlined"
            error={touched.name && touched.error}
            helperText={touched.name && errors.name ? errors.name : null}
          />
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
          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ width: "400px" }}
          >
            Register
          </Button>
          <small> already registered ?</small>
        </CardContent>

        <h5 className="sign-btn" onClick={() => reDirect()}>
          Sign in
        </h5>
      </Card>
    </form>
  );
}
