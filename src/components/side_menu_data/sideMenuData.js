import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Breakfast Menu',
    path: '../menu_breakfast',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Daily Menu',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Bakery Menu',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
];