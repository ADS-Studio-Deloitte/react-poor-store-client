import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./LoginComponent.css";
import { useAuth } from "../../auth/AuthProvider";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { setNewPasswordPath } from "../../router/pagePaths";

interface FormValues {
  username: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (auth.isAuthentificated) {
      navigate("/");
    }
  }, [auth.isAuthentificated]);

  useEffect(() => {
    if (auth.newPasswordRequired) {
      navigate('../' + setNewPasswordPath);
    }
  }, [auth.newPasswordRequired]);

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data: any) => {

    auth.login(data.username, data.password);
  };

  return (
    <div>
        <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form-container">
        <TextField
          {...register("username")}
          label="Username"
          name="username"
          type="text"
          variant="outlined"
          required
        />

        <TextField
          {...register("password")}
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>

        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
