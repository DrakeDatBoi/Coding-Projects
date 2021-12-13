/*
 * AUTHOR:  Adam Walters
 *
 * CREATED:  11/10/2021
 * MODIFIED: 11/30/2021
 */

import React from 'react';
import { Button, withStyles } from '@mui/material';
import { Link } from 'react-router-dom';
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
				<div className="home-welcome">
					<img className="home-welcome-image" src={HomeImage} alt="" />
					<div className="home-welcome-center">
						<span className="home-welcome-text">Welcome to Clyde's!</span>
						<div className="home-welcome-button-container">
							<Button className="home-welcome-button" component={Link} to="/menu" sx={WELCOME_BUTTON_SX}>Menu</Button>
							<Button className="home-welcome-button" component={Link} to="/login" sx={WELCOME_BUTTON_SX}>Login</Button>
						</div>
					</div>
				</div>
			</div>
		);

	}

};