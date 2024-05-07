import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./SetNewPasswordComponent.css";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const SetNewPasswordComponent: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthentificated) {
      navigate("/");
    }
  }, [auth.isAuthentificated]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    console.log(data);
    auth.setNewPassword(data.password);
  };

  return (
    <div>
      <h2>Set new password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form-container">
          <TextField
            {...register("password", { required: true })}
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            required
          />

          <TextField
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === watch("password") || "Passwords do not match"
            })}
            label="Confirm password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetNewPasswordComponent;
