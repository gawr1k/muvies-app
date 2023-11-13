import Access_key from "./api-key"
import React from "react";



const SwapiService = () => {

    const [data, setData] = React.useState(null);
  
    React.useEffect(() => {
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${Access_key}`)
        .then(res => res.json())
        .then(json => setData(json.results))
        .catch(err => console.log(err));
    }, []);
  
    return data;
  
  }
  
  export default SwapiService;