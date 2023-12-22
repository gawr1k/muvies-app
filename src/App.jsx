import React, { useState, useEffect } from 'react'
import './App.scss'
import { Input, Alert } from 'antd'
import _ from 'lodash'

import MuvieMenu from './components/Menu/Menu'
import AlertAlarm from './components/AlertAlarm/AlertAlarm'
import UIContext from './context/UIContext'
import CardList from './components/CardList/CardList'
import {
  getSearchMuvies,
  getCreateGuestSession,
  getRateFilm,
  gethMovieGenres,
  getRatingMovies,
} from './ApiClient/ApiClient'

export default function App() {
  const [menustate, setMenuState] = useState('')
  const [muviesRenderList, setMuviesRenderList] = useState([])
  const [guestSessionId, setGuestSessionId] = useState([])
  const [searchTerm, setSearchTerm] = useState('open')
  const [ratedMovies, setRatedMovies] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [genresList, setGenresList] = useState('')
  const [errorState, setError] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [errorMessage, setErrorMessage] = useState('')
  const uiContextValue = { genresList }
  const OFFLINE_ERROR_MESSAGE =
    'No internet connection. Please check your network settings.'

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setErrorMessage('')
    }

    const handleOffline = () => {
      setIsOnline(false)
      setErrorMessage(OFFLINE_ERROR_MESSAGE)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)

      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const savedSessionId = localStorage.getItem('guestSessionId')
    if (savedSessionId) {
      setGuestSessionId(savedSessionId)
      setMenuState('/search')
    } else {
      getCreateGuestSession()
        .then((newSessionId) => {
          localStorage.setItem('guestSessionId', newSessionId)
          setGuestSessionId(newSessionId)
        })
        .catch((error) => {
          setError(error.message)
        })
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (menustate === '/search') {
          const rating = await getRatingMovies(guestSessionId, currentPage)
          setRatedMovies(rating)
          const res = await getSearchMuvies(searchTerm, currentPage)
          setMuviesRenderList(res)
        } else if (menustate === '/rated') {
          const rating = await getRatingMovies(guestSessionId, currentPage)
          setRatedMovies(rating)
          const ratedMovie = await getRateFilm(guestSessionId, currentPage)
          setMuviesRenderList(ratedMovie)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [guestSessionId, searchTerm, currentPage, menustate])

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await gethMovieGenres()
        setGenresList(genresData)
      } catch (error) {
        setError(error.message)
      }
    }
    fetchGenres()
  }, [])

  const debouncedInputHandler = _.debounce((e) => {
    const lowerCase = e.target.value.toLowerCase()
    setSearchTerm(lowerCase)
    setCurrentPage(1)
  }, 500)

  const inputHandler = (e) => {
    debouncedInputHandler(e)
  }

  return (
    <div className="container">
      <div className="content">
        <UIContext.Provider value={uiContextValue}>
          {isOnline ? (
            <>
              {errorState && (
                <AlertAlarm errorState={errorState} setError={setError} />
              )}
              <header>
                <div className="menu-center">
                  <MuvieMenu
                    className="menu-center"
                    setMenuState={setMenuState}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </header>
              {menustate === '/search' && (
                <div className="input-container">
                  <Input
                    onChange={inputHandler}
                    placeholder="Type to search..."
                  />
                </div>
              )}
              <CardList
                muviesRenderList={muviesRenderList}
                loading={loading}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                guestSessionId={guestSessionId}
                ratedMovies={ratedMovies}
              />
            </>
          ) : (
            <Alert
              className="custom-alert"
              message={errorMessage}
              type="error"
              showIcon
            />
          )}
        </UIContext.Provider>
      </div>
    </div>
  )
}
