/* eslint-disable react/prop-types */
import { Menu } from 'antd';
import React from 'react';
import MenuStateContext from '../../context/MenuStateContext';
import UIContext from '../../context/UIContext';

const items = [
  {
    label: 'Search',
    key: '/search',
  },
  {
    label: 'Rated',
    key: '/rated',
  },
];

export default function MuvieMenu() {
  const { setMenuState } = React.useContext(MenuStateContext);
  const { setCurrentPage } = React.useContext(UIContext);

  const onMenuClick = (id) => {
    setMenuState(id);
    setCurrentPage(1);
  };

  return (
    <Menu
      mode="horizontal"
      items={items}
      onClick={({ key }) => {
        onMenuClick(key);
      }}
    />
  );
}
