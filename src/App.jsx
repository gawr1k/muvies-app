import "./App.scss";
import React, { useEffect, useState } from "react";
import getGenreNamesByIds from "./components/Card/genre_id";
import {
  getSearchMuvies,
  getCreateGuestSession,
  getRateFilm,
} from "./components/ApiClient/ApiClient";
import Card from "./components/Card/Card";
import MuvieMenu from "./components/Menu/Menu";
import NoData from "./components/NoData/NoData";
import { Input, Spin } from "antd";
import PaginationsPages from "./components/PaginationsPages/PaginationsPages";
import _ from "lodash";

const AuthContext = React.createContext();

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ratedMoviesIds, setRatedMoviesIds] = useState([]);
  const [menustate, setMenuState] = useState("/search");
  const [loading, setLoading] = useState(true);
  const [guestSessionId, setGuestSessionId] = useState([]);

  useEffect(() => {
    setLoading(true);
    getSearchMuvies(searchTerm, currentPage).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const savedSessionId = localStorage.getItem("guestSessionId");
    if (savedSessionId) {
      setGuestSessionId(savedSessionId);
      console.log(guestSessionId);
    } else {
      getCreateGuestSession().then((newSessionId) => {
        localStorage.setItem("guestSessionId", newSessionId);
        setGuestSessionId(newSessionId);
        console.log(guestSessionId);
      });
    }
  }, []);

  useEffect(() => {
    if (guestSessionId && menustate && menustate === "/rated") {
      getRateFilm(guestSessionId).then((ratedMovies) => {
        setRatedMoviesIds(ratedMovies);
        console.log(1);
      });
    }
  }, [menustate]);

  useEffect(() => {
    return () => localStorage.removeItem("guestSessionId");
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const debouncedInputHandler = _.debounce((e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    setCurrentPage(1);
  }, 500);

  const inputHandler = (e) => {
    debouncedInputHandler(e);
  };

  const onMenuClick = (id) => {
    setMenuState(id);
  };

  const renderContent = () => {
    if (menustate === "/search") {
      return (
        <>
          <div className="input-container">
            <Input onChange={inputHandler} placeholder="Type to search..." />
          </div>
          {loading ? (
            <div className="example">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <main>
              {data.results && data.results.length > 0 ? (
                data.results.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    original_title={item.original_title}
                    overview={item.overview}
                    release_date={item.release_date}
                    poster_path={item.poster_path}
                    genre_ids={item.genre_ids}
                    vote_average={item.vote_average}
                    getGenreNamesByIds={getGenreNamesByIds}
                    ratedMoviesIds={ratedMoviesIds}
                    setRatedMoviesIds={setRatedMoviesIds}
                    item={item}
                  />
                ))
              ) : (
                <NoData />
              )}
            </main>
          )}
          <footer>
            {data.total_pages > 1 && (
              <PaginationsPages
                page={currentPage}
                handlePageChange={handlePageChange}
                total={data.total_pages}
              />
            )}
          </footer>
        </>
      );
    } else if (menustate === "/rated") {
      return (
        <main>
          {ratedMoviesIds.results && ratedMoviesIds.results.length > 0 ? (
            ratedMoviesIds.results.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                original_title={item.original_title}
                overview={item.overview}
                release_date={item.release_date}
                poster_path={item.poster_path}
                genre_ids={item.genre_ids}
                vote_average={item.vote_average}
                getGenreNamesByIds={getGenreNamesByIds}
                ratedMoviesIds={ratedMoviesIds}
                setRatedMoviesIds={setRatedMoviesIds}
                item={item}
              />
            ))
          ) : (
            <NoData />
          )}
        </main>
      );
    }
  };

  return (
    <AuthContext.Provider value={{ guestSessionId }}>
      <div className="container">
        <div className="content">
          <header>
            <div className="menu-center">
              <MuvieMenu className="menu-center" onMenuClick={onMenuClick} />
            </div>
          </header>
          {renderContent()}
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export { App };
export { AuthContext };
