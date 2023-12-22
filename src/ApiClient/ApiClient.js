import { defToken, apiKey } from './api-key'

const BASE_URL = 'https://api.themoviedb.org/3'

async function getSearchMuvies(search, page) {
  const url = new URL(`${BASE_URL}/search/movie`)
  url.searchParams.set('query', search)
  url.searchParams.set('page', page)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  }

  const response = await fetch(url.toString(), options)
  if (!response.ok) {
    throw new Error(`getSearchMuvies failed with status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

const getCreateGuestSession = async () => {
  const url = new URL(`${BASE_URL}/authentication/guest_session/new`)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  }

  const response = await fetch(url.toString(), options)

  if (!response.ok) {
    throw new Error(
      `getCreateGuestSession failed with status: ${response.status}`
    )
  }

  const data = await response.json()
  return data.guest_session_id
}

const postAddRating = async (id, rate, guestSessionId) => {
  const url = new URL(`${BASE_URL}/movie/${id}/rating`)
  const searchParams = new URLSearchParams({
    api_key: apiKey,
    guest_session_id: guestSessionId,
  })
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ value: rate }),
  }
  url.search = searchParams.toString()

  const response = await fetch(url.toString(), options)

  if (!response.ok) {
    throw new Error(`postAddRating failed with status: ${response.status}`)
  }

  const data = await response.json()
  return data
}

const getRateFilm = async (guestSessionId, page) => {
  const url = new URL(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies`
  )
  const searchParams = new URLSearchParams({
    api_key: apiKey,
    language: 'en-US',
    page,
    sort_by: 'created_at.asc',
  })

  url.search = searchParams.toString()

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error(`getRateFilm failed with status: ${res.status}`)
  }

  const rated = await res.json()
  return rated
}

const getRatingMovies = async (guestSessionId, page) => {
  const url = new URL(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies`
  )
  const searchParams = new URLSearchParams({
    api_key: apiKey,
    language: 'en-US',
    page,
    sort_by: 'created_at.asc',
  })

  url.search = searchParams.toString()

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error(`getRatingMovies failed with status: ${res.status}`)
  }

  const rated = await res.json()
  const totalPages = rated.total_pages
  const fetchPromises = []

  for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
    const fetchPromise = fetch(
      `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${currentPage}&sort_by=created_at.asc`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(
          `getRatingMovies failed with status: ${response.status}`
        )
      }
      return response.json()
    })

    fetchPromises.push(fetchPromise)
  }

  const movieArrays = await Promise.all(fetchPromises)
  const ratingArr = []

  movieArrays.forEach((movies) => {
    movies.results.forEach((movie) => {
      ratingArr.push({ id: movie.id, rating: movie.rating })
    })
  })

  return ratingArr
}

async function gethMovieGenres() {
  const url = new URL(`${BASE_URL}/genre/movie/list`)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  }

  const response = await fetch(url.toString(), options)

  if (!response.ok) {
    throw new Error(`gethMovieGenres failed with status: ${response.status}`)
  }

  const data = await response.json()
  return data
}
export {
  getSearchMuvies,
  postAddRating,
  getCreateGuestSession,
  getRateFilm,
  gethMovieGenres,
  getRatingMovies,
}
