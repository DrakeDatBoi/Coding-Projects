import React from "react";
import { Button, withStyles } from "@mui/material";
import { Link } from "react-router-dom";
import HomeImage from './clydes.png';
import './styles.css';

const WELCOME_BUTTON_SX = {
	fontSize: '3vmin',
	fontWeight: 'bolder',
	color: '#f1bd44',
	bgcolor: '#c9092b',
	':hover': {
		color: '#c9092b',
		bgcolor: '#f1bd44'
	}
}

export default class Home extends React.Component {

	render() {

		// Return complete component
		return (
			<div>
				<div className="homeWelcome">
					<img className="homeWelcomeImage" src={HomeImage} alt="" />
					<div className="homeWelcomeCenter">
						<span className="homeWelcomeText">Welcome to Clyde's!</span>
						<div className="homeWelcomeButtonContainer">
							<Button className="homeWelcomeButton" component={Link} to="/menu" sx={WELCOME_BUTTON_SX}>Menu</Button>
							<Button className="homeWelcomeButton" component={Link} to="/login" sx={WELCOME_BUTTON_SX}>Login</Button>
						</div>
					</div>
				</div>
			</div>
		);

	}

};