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
      <Container maxWidth="xs">
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
         {/* <p id="resetcomplete">hi </p> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={submitButton}
            // component={Link} to="/menu"
          >
            Submit
          </Button>
          
          <Button

            color="secondary"
            className={login}
            component={Link} to="/login"
          >
            Back to Login page
          </Button>
          
          {json && (
            <>
              <Typography variant="body1">
              <p>An email with a password reset link has been sent to {json} </p>

              </Typography>
              {/* <Typography variant="body2">{json}</Typography> */}
            </>
          )}
        </form>

    
      </Container>
    );
  }
  export default ForgotPass;