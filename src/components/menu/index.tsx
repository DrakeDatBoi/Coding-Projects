/*
 * AUTHOR:  Adam Walters and David Vachlon
 *
 * CREATED:  11/30/2021
 * MODIFIED: 12/07/2021
*/

import React from 'react';
import Cart from '../../classes/cart';
import MenuItem from '../../classes/menu-item';
import MenuSection from './menu-section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormattedList } from '../menu_breakfast/parse_menu';
import TestImage1 from './images/mushroom_swiss.png';
import TestImage2 from './images/hamburger.png';
import TestImage3 from './images/chicken_burger.png';
import TestImage4 from './images/deluxe_cheeseburger.png';
import './styles.css';


const IMAGES = [
	TestImage1,
	TestImage2,
	TestImage3,
	TestImage4
]

interface MenuItem_State {
	menuItem: {[key: string]: MenuItem[] }
};

export default class Menu extends React.Component<{}, MenuItem_State> {
	constructor(props: object) {
		super(props);
		this.state = {menuItem: {}};
	}

	componentDidMount(){
		
		this.setState({
			menuItem: getFormattedList()
		  });
	}


	render() {
		// Return component with generated title/image and list of entries
		const itemList = this.state.menuItem;
		return (
			<div className="menu">
				{Object.keys(itemList).map(function(key, index) {
					return (
						<MenuSection name={key} image={IMAGES[index % IMAGES.length]} menuItems={itemList[key]} alt={index % 2 == 1} haveOptions={index <= 1} />
					);
				})}
				<ToastContainer/>
			</div>
		);

	}

};
