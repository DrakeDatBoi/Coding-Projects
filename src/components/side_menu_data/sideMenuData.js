import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Daily Menu',
    path: '../menu',
    icon: <AiIcons.AiOutlineMenu />,
    cName: 'nav-text'
  },
  {
    title: 'Bakery Menu',
    path: '../menu_bakery',
    icon: <IoIcons.IoMdPint />,
    cName: 'nav-text'
  },
];