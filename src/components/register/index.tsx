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
    newemail: string;
    newfname: string;
    newlname: string;
    newpass: string;
  }
  
  const schema = yup.object().shape({
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
    login: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
        marginLeft: theme.spacing(27)
      },
  }));
  
  function Register() {
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
        <Typography className={heading} variant="h3">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("newemail")}
            variant="outlined"
            margin="normal"
            label="Email"
            helperText={errors.newemail?.message}
            error={!!errors.newemail?.message}
            fullWidth
            required
          />
          <TextField
            {...register("newfname")}
            variant="outlined"
            margin="normal"
            label="First Name"
            helperText={errors.newfname?.message}
            error={!!errors.newfname?.message}
            fullWidth
            required
          />
          <TextField
            {...register("newlname")}
            variant="outlined"
            margin="normal"
            label="Last Name"
            helperText={errors.newlname?.message}
            error={!!errors.newlname?.message}
            fullWidth
            required
          />
          <TextField
            {...register("newpass")}
            variant="outlined"
            margin="normal"
            label="Password"
            helperText={errors.newpass?.message}
            error={!!errors.newpass?.message}
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
            Sign Up
          </Button>
          <Button

            color="secondary"
            className={login}
            component={Link} to="/login"
          >
            Already have an account?
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
  export default Register;
  