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
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
  
const theme = createTheme();

  interface IFormInput {
    email: string;
  }
  
  const schema = yup.object().shape({
    email: yup.string().required().email(),
  });
  
  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 2),
    },
    submitButton: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(0)
    },
    login: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
        marginLeft: theme.spacing(27)
      }
  }));

  function ForgotPass() {
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
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
        <Typography className={heading} variant="h5">
          Enter Email to reset password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            className={submitButton}
            sx={{ mt: 3, mb: 2, bgcolor:"#c9092b"}}
          >
            Submit
          </Button>
          
          <Button

            color="secondary"
            className={login}
            component={Link} to="/login"
            sx={{ mt: 0, mb: 4, color:"#c9092b"}}
          >
            Back to Login page
          </Button>
          
          {json && (
            <>
              <Typography variant="body1">
              <p>An email with a password reset link has been sent to {json.substring(10,json.length-2)} </p>

              </Typography>
            </>
          )}
        </form>

    
        </Box>
    </Container>
    </ThemeProvider>
    );
  }
  export default ForgotPass;