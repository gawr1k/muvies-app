import { Menu } from "antd";

const items = [
  {
    label: "Search",
    key: '/search'
  },
  {
    label: "Rated",
    key: "/rated"
  }
];

const MuvieMenu = ({onMenuClick}) => {
  
  return (
    <Menu 
      mode="horizontal"
      items={items}
      onClick={({key}) => {
        onMenuClick(key);
      }}
    />
  );
};

export default MuvieMenu;
