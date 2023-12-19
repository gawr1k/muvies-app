import { defToken, apiKey } from './api-key';

function getSearchMuvies(search, page) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };

  const result = fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`,
    options,
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
  return result;
}

const getCreateGuestSession = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };

  const result = fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
    options,
  )
    .then((response) => response.json())
    .then((response) => response.guest_session_id)
    .catch((err) => console.error(err));
  return result;
};

const postAddRating = async (id, rate, guestSessionId) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ value: rate }),
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRateFilm = async (guestSessionId, page) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
  );
  if (!res.ok) {
    throw new Error('Could not fetch.');
  }
  const rated = await res.json();
  return rated;
};

const getRatingMovies = async (guestSessionId, page) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
    );
    if (!res.ok) {
      throw new Error('Could not fetch.');
    }
    const rated = await res.json();
    const totalPages = rated.total_pages;
    const fetchPromises = [];

    for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
      const fetchPromise = fetch(
        `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${currentPage}&sort_by=created_at.asc`,
      ).then((response) => response.json());

      fetchPromises.push(fetchPromise);
    }

    const movieArrays = await Promise.all(fetchPromises);
    const ratingArr = [];

    movieArrays.forEach((movies) => {
      movies.results.forEach((movie) => {
        ratingArr.push({ id: movie.id, rating: movie.rating });
      });
    });

    return ratingArr;
  } catch (error) {
    console.error('Error in getRatingMovies:', error.message);
    throw error;
  }
};

async function gethMovieGenres() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };
  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  getSearchMuvies,
  postAddRating,
  getCreateGuestSession,
  getRateFilm,
  gethMovieGenres,
  getRatingMovies,
};
