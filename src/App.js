import './App.css';
import React from 'react';
import SwapiService from './components/ApiClient/ApiClient';


function App() {

  const data = SwapiService()
  
  console.log(data)

  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>{item.title}</div>  
      ))}
    </div>
  );
}

export default App;
