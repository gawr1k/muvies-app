import { defToken, apiKey } from './api-key';

async function getSearchMuvies(search, page) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getSearchMovies:', error.message);
    throw error;
  }
}

const getCreateGuestSession = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };

  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/authentication/guest_session/new',
      options,
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.guest_session_id;
  } catch (error) {
    console.error('Error in getCreateGuestSession:', error.message);
    throw error;
  }
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

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in postAddRating:', error.message);
    throw error;
  }
};

const getRateFilm = async (guestSessionId, page) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
    );

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const rated = await res.json();
    return rated;
  } catch (error) {
    console.error('Error in getRateFilm:', error.message);
    throw error;
  }
};

const getRatingMovies = async (guestSessionId, page) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
    );

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const rated = await res.json();
    const totalPages = rated.total_pages;
    const fetchPromises = [];

    for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
      const fetchPromise = fetch(
        `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${currentPage}&sort_by=created_at.asc`,
      ).then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
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

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error in getMovieGenres:', error.message);
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
