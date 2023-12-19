import { defToken, apiKey } from './api-key';

async function getSearchMuvies(search, page) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`,
    options,
  );
  if (!response.ok) {
    throw new Error(`getSearchMuvies failed with status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

const getCreateGuestSession = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
    options,
  );

  if (!response.ok) {
    throw new Error(`getCreateGuestSession failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data.guest_session_id;
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

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`postAddRating failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const getRateFilm = async (guestSessionId, page) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
  );

  if (!res.ok) {
    throw new Error(`getRateFilm failed with status: ${res.status}`);
  }

  const rated = await res.json();
  return rated;
};

const getRatingMovies = async (guestSessionId, page) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
  );

  if (!res.ok) {
    throw new Error(`getRatingMovies failed with status: ${res.status}`);
  }

  const rated = await res.json();
  const totalPages = rated.total_pages;
  const fetchPromises = [];

  for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
    const fetchPromise = fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${currentPage}&sort_by=created_at.asc`,
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`getRatingMovies failed with status: ${response.status}`);
      }
      return response.json();
    });

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
};

async function gethMovieGenres() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };

  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);

  if (!response.ok) {
    throw new Error(`gethMovieGenres failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export {
  getSearchMuvies,
  postAddRating,
  getCreateGuestSession,
  getRateFilm,
  gethMovieGenres,
  getRatingMovies,
};
