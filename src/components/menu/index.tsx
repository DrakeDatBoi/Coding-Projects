/**
 * This file handles the basic daily menu for this Website.
 */


import React from "react";
import Paper from "@mui/material/Paper";
import BackgroundImage from './clydes.png';
import hamburger from './hamburger.png';
import cheeseburger from './cheeseburger.png';
import baconcheeseburger from './bacon_cheeseburger.png';
import deluxecheeseburger from './deluxe_cheeseburger.png';
import mushswissburger from './mushroom_swiss.png';
import chickenburger from './chicken_burger.png';
import falafelburger from './falafel_burger.png';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import './styles.css';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

//Menu item pictures to load
const menuItems = [
  {
    label: 'Hamburger',
    imgPath:hamburger,
  },
  {
    label: 'Cheeseburger',
    imgPath:cheeseburger,
  },
  {
    label: 'Bacon Cheeseburger',
    imgPath:baconcheeseburger,
  },
  {
    label: 'Deluxe Cheeseburger',
    imgPath:deluxecheeseburger,
  },
  {
    label: 'Mushroom Swiss Burger',
    imgPath:mushswissburger,
  },
  {
    label: 'Chicken Burger',
    imgPath:chickenburger,
  },
  {
    label: 'Falafel Burger',
    imgPath:falafelburger,
  },
];

function Menu() {

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = menuItems.length;

  //Handler for the "NEXT" button
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //Handler for the "LAST" button
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //Handler to change to a new picture
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const [open, setOpen] = React.useState(false);

  //Handler for clicking on a menu item
  const handleClick = () => {
    setOpen(true);
  };

  //How to handle closing the TOAST prompt
  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //Closing the TOAST prompt
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <div
    //The CLDES background image found on the home page
    //Set it as the background for the menu
    style={{
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      height: "85vh",
      color: "#000000"
      
    }}
    //Set the size and location of the scrolling pictures
    >
      <div className="centerScrollingFood">
        <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            alignItems: 'center',
            display: 'flex',
            pl: 10,
            bgcolor: 'white',
            height: 50,
          }}
        >
        <Typography>{menuItems[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          enableMouseEvents
          onChangeIndex={handleStepChange}
          index={activeStep}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          >
          {menuItems.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    display: 'block',
                    height: 355,
                    overflow: 'hidden',
                    maxWidth: 600,
                  }}
                  alt={step.label}
                  src={step.imgPath}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          activeStep={activeStep}
          position="static"
          steps={maxSteps}
          nextButton={
            <Button
              onClick={handleNext}
              size="small"
              disabled={activeStep === maxSteps - 1}
            >
              NEXT
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />) : (<KeyboardArrowRight />)}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />) : (<KeyboardArrowLeft />)
                }
              LAST
             </Button>
            }
          />
        </Box>
        </div>

        <div className="itemSelection">
            <Box sx={{ maxWidth: 300, maxHeight: 600, flexGrow: 1 }}>
              <Paper square>
                <FormGroup>
                  <h3>Menu:</h3>
                  <FormControlLabel control={<Checkbox onClick={handleClick}/>} label="Hamburger (580 cal)" />
                  <FormControlLabel control={<Checkbox onClick={handleClick}/>} label="Cheeseburger (670 cal)" />
                  <FormControlLabel control={<Checkbox onClick={handleClick}/>} label="Bacon Cheeseburger (850 cal)" />
                  <FormControlLabel control={<Checkbox onClick={handleClick}/>} label="Deluxe Cheeseburger (771 cal)" />
                  <FormControlLabel control={<Checkbox onClick={handleClick}/>} label="Mushroom Swiss Burger (670 cal)" />
                  <FormControlLabel control={<Checkbox onClick={handleClick}/>} label="Chicken Burger (428 cal)" />
                  <FormControlLabel control={<Checkbox onClick={handleClick}/>} label="Falafel Burger (478 cal)" />
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Item Added/Removed"
                    action={action}
                  />
                </FormGroup>
              </Paper>
            </Box>
            <Box sx={{ maxWidth: 225, maxHeight: 600, flexGrow: 1 }}>
              <Paper square>
              <FormGroup>
                  <h3>Allergens:</h3>
                  <FormControlLabel control={<Checkbox checked color="secondary"/>} label="Dairy" />
                  <FormControlLabel control={<Checkbox checked color="secondary"/>} label="Soy/Grain" />
                  <FormControlLabel control={<Checkbox checked color="secondary"/>} label="Soy/Shellfish/Fish" />
                  <FormControlLabel control={<Checkbox checked color="secondary"/>} label="Peanut/Tree Nut/Fish" />
                  <FormControlLabel control={<Checkbox checked color="secondary"/>} label="Eggs" />
                  <FormControlLabel control={<Checkbox checked color="secondary"/>} label="Soy/Dairy" />
                  <FormControlLabel control={<Checkbox disabled/>} label="" />
                </FormGroup>
              </Paper>
            </Box>
            <Box sx={{ maxWidth: 75, maxHeight: 600, flexGrow: 1 }}>
              <Paper square>
              <Grid container rowSpacing={1}>
                <Grid item xs={6}>
                   <h3>Price:</h3>
                </Grid>
              </Grid>
                <Box sx={{ m: .5 }} />
                <Typography variant="h6">
                  $5.99
                </Typography>
                <Box sx={{ m: 1 }} />
                <Typography variant="h6">
                  $7.99
                </Typography>
                <Box sx={{ m: 1.2 }} />
                <Typography variant="h6">
                  $7.99
                </Typography>
                <Box sx={{ m: 1.5 }} />
                <Typography variant="h6">
                  $8.99
                </Typography>
                <Box sx={{ m: 1.4 }} />
                <Typography variant="h6">
                  $9.99
                </Typography>
                <Box sx={{ m: 1.5 }} />
                <Typography variant="h6">
                  $7.99
                </Typography>
                <Box sx={{ m: 1.7 }} />
                <Typography variant="h6">
                  $8.99
                </Typography>
              </Paper>
            </Box>
        </div>
        
    </div>
  );
};

export default Menu;