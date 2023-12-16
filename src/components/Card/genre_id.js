/* eslint-disable no-unused-vars */
// import Access_key from "../ApiClient/api-key";
// import React from "react";

// const GenreId = () => {
//   const [genresMap, setGenresMap] = React.useState({});

//   React.useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const response = await fetch(
//           "https://api.themoviedb.org/3/genre/movie/list?language=en",
//           {
//             method: "GET",
//             headers: {
//               accept: "application/json",
//               Authorization: Access_key,
//             },
//           }
//         );
//         const data = await response.json();
//         const genresArray = data.genres;
//         const genresMap = {};
//         genresArray.forEach((genre) => {
//           genresMap[genre.id] = genre.name;
//         });
//         console.log("Fetched Genres:", genresMap); // Добавленный console.log
//         setGenresMap(genresMap);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchGenres();
//   }, []);

//   const getGenreNamesByIds = (genreIds) => {
//     // Проверка на существование массива genreIds
//     if (Array.isArray(genreIds)) {
//       const genreNames = genreIds.map((id) => genresMap[id]);
//       console.log("Genre Names:", genreNames); // Добавленный console.log
//       return genreNames;
//     } else {
//       return [];
//     }
//   };

//   return { genresMap, getGenreNamesByIds };
// };

// export default GenreId;

const genresData = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Abenteuer",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Komödie",
    },
    {
      id: 80,
      name: "Krimi",
    },
    {
      id: 99,
      name: "Dokumentarfilm",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Familie",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "Historie",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Musik",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Liebesfilm",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV-Film",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "Kriegsfilm",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

const getGenreNamesByIds = (genreIds) => genreIds.map((id) => {
    const genre = genresData.genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown";
  });

// Пример использования:
const exampleGenreIds = [28, 12, 16];
const genreNames = getGenreNamesByIds(exampleGenreIds);
// console.log(genreNames); // Выведет: ["Action", "Abenteuer", "Animation"]

export default getGenreNamesByIds;
