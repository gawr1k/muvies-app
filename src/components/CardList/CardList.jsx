import React, { useEffect, useState } from "react";
import "./CardList.scss";
import { Input, Spin } from "antd";
import _ from "lodash";
import Card from "../Card/Card";
import NoData from "../NoData/NoData";
import PaginationsPages from "../PaginationsPages/PaginationsPages";
import getGenreNamesByIds from "../Card/genre_id";
import MenuStateContext from '../../context/MenuStateContext';
import {
    getSearchMuvies,
    getCreateGuestSession,
    getRateFilm,
  } from "../../ApiClient/ApiClient";

export default function CardList () {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ratedMoviesIds, setRatedMoviesIds] = useState([]);
    // const [menustate, setMenuState] = useState("/search");
    const [loading, setLoading] = useState(true);
    const [guestSessionId, setGuestSessionId] = useState([]);
    const menustate = React.useContext(MenuStateContext);

    useEffect(() => {
        setLoading(true);
        getSearchMuvies(searchTerm, currentPage).then((res) => {
          setData(res);
          setLoading(false);
        });
      }, [searchTerm, currentPage]);
    
      useEffect(() => {
        const savedSessionId = localStorage.getItem("guestSessionId");
        if (savedSessionId) {
          setGuestSessionId(savedSessionId);
          // console.log(guestSessionId);
        } else {
          getCreateGuestSession().then((newSessionId) => {
            localStorage.setItem("guestSessionId", newSessionId);
            setGuestSessionId(newSessionId);
            // console.log(guestSessionId);
          });
        }
      }, []);
    
      useEffect(() => {
        if (guestSessionId && menustate && menustate === "/rated") {
          getRateFilm(guestSessionId).then((ratedMovies) => {
            setRatedMoviesIds(ratedMovies);
          });
        }
      }, [menustate]);
    
      useEffect(() => {
        localStorage.removeItem("guestSessionId");
      }, []);

      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
      const debouncedInputHandler = _.debounce((e) => {
        const lowerCase = e.target.value.toLowerCase();
        setSearchTerm(lowerCase);
        setCurrentPage(1);
      }, 500);
    
      const inputHandler = (e) => {
        debouncedInputHandler(e);
      };

    //   const onMenuClick = (id) => {
    //     setMenuState(id);
    //   };
    
      if (menustate === "/search") 
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
                    guestSessionId = {guestSessionId}
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
     if (menustate === "/rated") 
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
                guestSessionId = {guestSessionId}
                item={item}
              />
            ))
          ) : (
            <NoData />
          )}
        </main>
      );
      return null;
  };