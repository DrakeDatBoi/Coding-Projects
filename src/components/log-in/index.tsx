import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "@mui/styled-engine";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(120),
  newemail: yup.string().required().email(),
  newfname: yup.string().required().min(2).max(120),
  newlname: yup.string().required().min(2).max(120),
  newpass: yup.string().required().min(8).max(120),
});

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(0)
  },
  forgotPass: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(27)
  },
  newUser: {
    marginLeft: theme.spacing(13),
    marginBottom: theme.spacing(4)
  }
}));

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { heading, submitButton, forgotPass, newUser} = useStyles();

  const [json, setJson] = useState<string>();

  const onSubmit = (data: IFormInput) => {
    setJson(JSON.stringify(data));
  };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("email")}
          variant="outlined"
          margin="normal"
          label="Email"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
          fullWidth
          required
        />
        <TextField
          {...register("password")}
          variant="outlined"
          margin="normal"
          label="Password"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={submitButton}
          // component={Link} to="/menu"
        >
          Login
        </Button>

        <Button
          color="secondary"
          className={forgotPass}
          component={Link} to="/forgotpass"

        >
          Forgot Password?
        </Button>
        <Button
          color="secondary"
          className={newUser}
          component={Link} to="/register"
        >
          <h3> Register Account </h3>
        </Button>
        {json && (
          <>
            <Typography variant="body1">
            Verify data in db

            </Typography>
            <Typography variant="body2">{json}</Typography>
          </>
        )}
      </form>
  
    </Container>
  );
}
export default LogIn;
