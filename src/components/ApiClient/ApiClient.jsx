import Access_key from "./api-key";

const ApiClient = (search, page) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: Access_key,
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

export default ApiClient;
