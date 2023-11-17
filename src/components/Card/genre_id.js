import Access_key from "../ApiClient/api-key";
import React from "react";

  
const GenreId = () => {
    const [genresMap, setGenresMap] = React.useState({});
  
    React.useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: Access_key,
              },
            }
          );
          const data = await response.json();
          const genresArray = data.genres;
          const genresMap = {};
          genresArray.forEach((genre) => {
            genresMap[genre.id] = genre.name;
          });
          setGenresMap(genresMap);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchGenres();
    }, []);
  
    const getGenreNamesByIds = (genreIds) => {
      // Проверка на существование массива genreIds
      if (Array.isArray(genreIds)) {
        return genreIds.map((id) => genresMap[id]);
      } else {
        return [];
      }
    };
  
    return { genresMap, getGenreNamesByIds };
  };
  
  export default GenreId;