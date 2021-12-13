import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../side_menu_data/sideMenuData';
import HalalImage from '../menu/food-icons/halal.png'
import DairyImg from '../menu/food-icons/dairy.png'
import EggsImg from '../menu/food-icons/eggs.png'
import FishImg from '../menu/food-icons/fish.png'
import ShellFishImg from '../menu/food-icons/shellfish.png'
import SoyImg from '../menu/food-icons/soy.png'
import VegImg from '../menu/food-icons/vegetarian.png'
import VeganImg from '../menu/food-icons/vegan.png'
import TreeNutImg from '../menu/food-icons/tree-nuts.png'
import PeanutImg from '../menu/food-icons/peanuts.png'
import wheatImg from '../menu/food-icons/wheat-gluten.png'
import "./index.css"
import { fontSize } from '@mui/system';

const IMAGES = [
  {'image': HalalImage,
  'name': "Halal"},
  {'image': DairyImg,
  'name': "Dairy"},
  {'image':EggsImg,
  'name': "Eggs"},
  {'image': FishImg,
  'name': "Fish"},
  {'image': ShellFishImg,
  'name': "Shell Fish"},
  {'image': SoyImg,
  'name': "Soy"},
  {'image': VegImg,
  'name': "Vegetarian"},
  {'image': VeganImg,
  'name': "Vegan"},
  {'image': TreeNutImg,
  'name': "Tree Nut"},
  {'image': PeanutImg,
  'name': "Peanuts"},
  {'image': wheatImg,
  'name': "Wheat/Gluten"},
]

export const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = (props:any) => setSidebar(!sidebar);

  return (
    <>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="imagelist">
            <p style={{fontSize:"20px", fontWeight:"bold"}} >Legend:</p>
            {IMAGES.map((item, index) => {
              return (
                <div key={index} className="imageItem">
                  <img src={item.image} style={{ width: 30 }}/>
                  <span style={{fontSize:"16px"}}>{item.name}</span>
                </div>
              );
            })}
          </div>
        </nav>
    </>
  );
};

export default NavBar;