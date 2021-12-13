import React from 'react';
import Cart from '../../classes/cart';
import MenuItem from '../../classes/menu-item';
import MenuSection from '../menu/menu-section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBakeryFormattedList } from '../menu_breakfast/parse_menu';
import PumpkinImage from './images/pumpkin_walnut_muffin.jpg'
import RaspberryDanish from './images/raspberry_danish.jpg'
import CocoCremeux from './images/choco_cremeux.jpg'
import '../menu/styles.css';

const IMAGES = [
	PumpkinImage,
	RaspberryDanish,
	CocoCremeux
]
interface MenuItem_State {
	menuItem: {[key: string]: MenuItem[] }
};

export default class MenuBakery extends React.Component<{}, MenuItem_State> {
	constructor(props: object) {
		super(props);
		this.state = {menuItem: {}};
	}

	componentDidMount(){
		
		this.setState({
			menuItem: getBakeryFormattedList()
		  });
	}


	render() {
		console.log(this.state.menuItem)

		// Return component with generated title/image and list of entries
		const itemList = this.state.menuItem;
		return (
			<div className="menu_bakery">
				{Object.keys(itemList).map(function(key, index) {
					return (
						<MenuSection name={key} image={IMAGES[index % IMAGES.length]} menuItems={itemList[key]} alt={index % 2 == 1} haveOptions={false} />
					);
				})}
				<ToastContainer/>
			</div>
		);

	}

};
