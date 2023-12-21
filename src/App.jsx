import React from 'react';
import './App.scss';
import { Input, Alert } from 'antd';
import _ from 'lodash';
import MuvieMenu from './components/Menu/Menu';
import AlertAlarm from './components/AlertAlarm/AlertAlarm';
import MenuStateContext from './context/MenuStateContext';
import DataContext from './context/DataContext';
import UIContext from './context/UIContext';
import CardList from './components/CardList/CardList';
import {
  getSearchMuvies, getCreateGuestSession, getRateFilm, gethMovieGenres, getRatingMovies,
} from './ApiClient/ApiClient';

export default function App() {
  const [menustate, setMenuState] = React.useState('');
  const menuContextValue = React.useMemo(() => ({ menustate, setMenuState }), [
    menustate]);
  const [muviesRenderList, setMuviesRenderList] = React.useState([]);
  const [guestSessionId, setGuestSessionId] = React.useState([]);
  const dataContextValue = React.useMemo(() => ({
    muviesRenderList,
    setMuviesRenderList,
    guestSessionId,
  }), [
    muviesRenderList, guestSessionId]);
  const [searchTerm, setSearchTerm] = React.useState('open');
  const [ratedMovies, setRatedMovies] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [genresList, setGenresList] = React.useState('');
  const [errorState, setError] = React.useState(null);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [errorMessage, setErrorMessage] = React.useState('');
  const uiContextValue = React.useMemo(() => ({
    loading,
    genresList,
    currentPage,
    ratedMovies,
    errorState,
    setError,
    setCurrentPage,
    setSearchTerm,
    setRatedMovies,
  }), [loading, errorState, genresList, currentPage, ratedMovies]);

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setErrorMessage('');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setErrorMessage('No internet connection. Please check your network settings.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  React.useEffect(() => {
    const savedSessionId = localStorage.getItem('guestSessionId');
    if (savedSessionId) {
      setGuestSessionId(savedSessionId);
      setMenuState('/search');
    } else {
      getCreateGuestSession()
        .then((newSessionId) => {
          localStorage.setItem('guestSessionId', newSessionId);
          setGuestSessionId(newSessionId);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (menustate === '/search') {
          const rating = await getRatingMovies(guestSessionId, currentPage);
          setRatedMovies(rating);
          const res = await getSearchMuvies(searchTerm, currentPage);
          setMuviesRenderList(res);
        } else if (menustate === '/rated') {
          const rating = await getRatingMovies(guestSessionId, currentPage);
          setRatedMovies(rating);
          const ratedMovie = await getRateFilm(guestSessionId, currentPage);
          setMuviesRenderList(ratedMovie);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [guestSessionId, searchTerm, currentPage, menustate]);

  React.useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await gethMovieGenres();
        setGenresList(genresData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGenres();
  }, []);

  const debouncedInputHandler = _.debounce((e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    setCurrentPage(1);
  }, 500);

  const inputHandler = React.useCallback((e) => {
    debouncedInputHandler(e);
  }, [debouncedInputHandler]);

  return (
    <div className="container">
      <div className="content">
        <UIContext.Provider value={uiContextValue}>
          <DataContext.Provider value={dataContextValue}>
            <MenuStateContext.Provider value={menuContextValue}>
              {isOnline ? (
                <>
                  {errorState && <AlertAlarm />}
                  <header>
                    <div className="menu-center">
                      <MuvieMenu className="menu-center" />
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
                  <CardList />
                </>
              ) : (
                <Alert className="custom-alert" message={errorMessage} type="error" showIcon />
              )}
            </MenuStateContext.Provider>
          </DataContext.Provider>
        </UIContext.Provider>
      </div>
    </div>
  );
}

export { App };
