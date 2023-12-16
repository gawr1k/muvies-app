import React from "react";
import "./App.scss";
import MuvieMenu from "./components/Menu/Menu";
import MenuStateContext from './context/MenuStateContext'; 
import CardList from "./components/CardList/CardList";

export default function App () {
  const [menustate, setMenuState] = React.useState("/search");


  const onMenuClick = (id) => {
    setMenuState(id);
  };



  return (
      <div className="container">
        <div className="content">
          <header>
            <div className="menu-center">
              <MuvieMenu className="menu-center" onMenuClick={onMenuClick} />
            </div>
          </header>
          <MenuStateContext.Provider value={menustate}>
            <CardList />
          </MenuStateContext.Provider>
        </div>
      </div>
  );
};

export { App };
