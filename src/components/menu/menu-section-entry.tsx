/*
 * AUTHORS:  Adam Walters and David Vachlon
 *
 * CREATED:  11/30/2021
 * MODIFIED: 12/07/2021
 */

import React, {useState} from 'react';
import MenuItem from '../../classes/menu-item';
import FormControlLabel from '@mui/material/FormControlLabel';
import Cart from '../../classes/cart';
import Checkbox from '@mui/material/Checkbox';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast } from 'react-toastify';

import SelectionOptions from './selection-options';
import HalalIcon from './food-icons/halal.png';
import VegetarianIcon from './food-icons/vegetarian.png';
import VeganIcon from './food-icons/vegan.png';
import DairyIcon from './food-icons/dairy.png';
import GrainIcon from './food-icons/wheat-gluten.png';
import SoyIcon from './food-icons/soy.png';
import ShellfishIcon from './food-icons/shellfish.png';
import FishIcon from './food-icons/fish.png';
import PeanutIcon from './food-icons/peanuts.png';
import TreeNutsIcon from './food-icons/tree-nuts.png';
import EggsIcon from './food-icons/eggs.png';
import './styles.css';

const QUALITIES_IMAGE_MAP: { [key: string]: string } = {
	['halal']: HalalIcon,
	['vegetarian']: VegetarianIcon,
	['vegan']: VeganIcon,
};
const ALLERGENS_IMAGE_MAP: { [key: string]: string } = {
	['dairy']: DairyIcon,
	['grain']: GrainIcon,
	['soy']: SoyIcon,
	['shellfish']: ShellfishIcon,
	['fish']: FishIcon,
	['peanut']: PeanutIcon,
	['tree nuts']: TreeNutsIcon,
	['eggs']: EggsIcon,
};

const TEST_SELECTION_OPTIONS: SelectionOptions[] = [
	new SelectionOptions("Lettuce"),
	new SelectionOptions("Onion"),
	new SelectionOptions("Pickle"),
	new SelectionOptions("Tomato"),
	new SelectionOptions("Ketchup"),
	new SelectionOptions("Mustard")
];

const customId = "custom-id-yes";

interface MenuSectionEntry_Props {
	menuItem: MenuItem,
	haveOptions: boolean
};

export default class MenuSectionEntry extends React.Component<MenuSectionEntry_Props, {}> {

	constructor(props: MenuSectionEntry_Props) {
		super(props);
		this.state = { showPopup: false };
	}

    popup = () => {
		toast.success("Item Added To Cart", {
			position: toast.POSITION.BOTTOM_LEFT, autoClose:5000
		});
	}

	render() {
		// Return component as selectable button with selectable condiments and which displays the appropriate allergen and qualities information
		const menuItem = this.props.menuItem;
		const popup = this.popup.bind(this);
		const haveOptions = this.props.haveOptions;

		return (
			<div className="MenuElement" id="element">
				<div className="innerElement">
					<button className="menu-option" onClick={(e) => {Cart.addItem(menuItem); popup();}}>
						<div className="menu-section-entry">
							<span className="menu-section-entry-label menu-section-entry-title">{menuItem.name}</span>
							<span className="menu-section-entry-label menu-section-entry-calories">({menuItem.calories} cal)</span>
							{menuItem.qualities.map((x) => {
								return (
									<img className="menu-section-entry-icon" src={QUALITIES_IMAGE_MAP[x]} />
								);
							})}
							{menuItem.allergens.map((x) => {
								return (
									<img className="menu-section-entry-icon" src={ALLERGENS_IMAGE_MAP[x]} />
								);
							})}
							<span className="menu-section-entry-label menu-section-entry-dots">{'.'.repeat(500)}</span>
							<span className="menu-section-entry-label menu-section-entry-price">${`${Math.floor(menuItem.price / 100)}.${('0' + (menuItem.price % 100)).slice(-2)}`}</span>
						</div>
					</button>
					{(() => {
						if (haveOptions) {
							return (
								<div id="SelectToppings">
									{TEST_SELECTION_OPTIONS.map((x) => {
										return (	
											<FormControlLabel control={<Checkbox/>} label= {x.name} id="condimentsSelect"/>
										);
									})}
								</div> 
							);
						}
					})()}
				</div>
			</div>
		)};
}
