import { defToken, apiKey } from "./api-key.js";

const getSearchMuvies = (search, page) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: defToken,
    },
  };

  const result = fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
  return result;
};

const getCreateGuestSession = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: defToken,
    },
  };

  const result = fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    options
  )
    .then((response) => response.json())
    .then((response) => response.guest_session_id)
    .catch((err) => console.error(err));
  return result;
};

const postAddRating = async (id, rate, guestSessionId) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ value: rate }),
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
      options
    );

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRateFilm = async (guestSessionId) => {
  console.log("guestSessionId:", guestSessionId);
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Could not fetch.");
  }

  const rated = await res.json();
  // console.log(rated.results);
  return rated;
};

export { getSearchMuvies, postAddRating, getCreateGuestSession, getRateFilm };
