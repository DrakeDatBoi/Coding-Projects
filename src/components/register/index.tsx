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

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

  interface IFormInput {
    Email: string;
    FirstName: string;
    LastName: string;
    Password: string;
  }
  
  const schema = yup.object().shape({
    Email: yup.string().required().email(),
    FirstName: yup.string().required().min(2).max(120),
    LastName: yup.string().required().min(2).max(120),
    Password: yup.string().required().min(8).max(120),
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
    login: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(10),
        marginLeft: theme.spacing(27)
      },
  }));
  
  const Register = () => {
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
  
    const { heading, submitButton, login} = useStyles();
  
    const [json, setJson] = useState<string>();
  
    const onSubmit = (data: IFormInput) => {
      setJson(JSON.stringify(data));
    };
  
    return (
      <ThemeProvider theme={theme}>
        
      <Container maxWidth="xs">
      <CssBaseline />
      <Box
          sx={{
            marginTop: 1,
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
        <Typography className={heading} variant="h3">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("Email")}
            variant="outlined"
            margin="normal"
            label="Email"
            helperText={errors.Email?.message}
            error={!!errors.Email?.message}
            fullWidth
            required
          />
          <TextField
            {...register("FirstName")}
            variant="outlined"
            margin="normal"
            label="First Name"
            helperText={errors.FirstName?.message}
            error={!!errors.FirstName?.message}
            fullWidth
            required
          />
          <TextField
            {...register("LastName")}
            variant="outlined"
            margin="normal"
            label="Last Name"
            helperText={errors.LastName?.message}
            error={!!errors.LastName?.message}
            fullWidth
            required
          />
          <TextField
            {...register("Password")}
            variant="outlined"
            margin="normal"
            label="Password"
            helperText={errors.Password?.message}
            error={!!errors.Password?.message}
            type="password"
            fullWidth
            required
          />
           <Box
          sx={{
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive marketing promotions and updates via email."
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt:1, mb: 1, bgcolor:"#c9092b"}}
            className={submitButton}
          >
            Sign Up
          </Button>
          <Button

            color="secondary"
            className={login}
            component={Link} to="/login"
            sx={{ mt: 0, mb: 4, color:"#c9092b"}}

          >
            Already have an account?
          </Button>
          </Box>
          {json && (
             handleRoute()
          )}
        </form>
        </Box>

      </Container>
      </ThemeProvider>

    );
  }
  export default Register;
  