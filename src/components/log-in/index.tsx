import {
  makeStyles,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
interface IFormInput {
  email: string;
  password: string;
}
const theme = createTheme();
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(120),
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

const LogIn = () => {
  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/menu");
  }

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
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
          sx={{
            marginTop: 2,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
    <Avatar sx={{ m: 1, bgcolor: '#c9092b' }}>
            <LockOutlinedIcon />
          </Avatar>
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
        <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor:"#c9092b"}}
          color="error"
          // sx={{bgcolor = "#c9092b"}}
          className={submitButton}
        >
          Login
        </Button>

        <Grid container>
        <Button
          // color="secondary"
          className={forgotPass}
          component={Link} to="/forgotpass"
          sx={{ mt: 0, mb: 4, color:"#c9092b"}}

        >
          Forgot Password?
        </Button>
        <Box
          sx={{
            marginLeft: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // bgcolor: 'red'
          }}
        >
        <Button
          color="secondary"
          className={newUser}
          component={Link} to="/register"
          sx={{ mt: 0, mb: 4, color:"#c9092b"}}
        >
          <h3> Register Account </h3>
        </Button>
        </Box>
        </Grid>
        
        {json && (
          handleRoute()
        )}
      </form>
          
          </Box>
    </Container>
    </ThemeProvider>
  );
}
export default LogIn;
