import "./App.scss";
import React, { useEffect, useState } from "react";
import getGenreNamesByIds from "./components/Card/genre_id";
import ApiClient from "./components/ApiClient/ApiClient";
import Card from "./components/Card/Card";
import MuvieMenu from "./components/Menu/Menu";
import { Input, Spin } from "antd";
import PaginationsPages from "./components/PaginationsPages/PaginationsPages";
import _ from "lodash";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ratedMoviesIds, setRatedMoviesIds] = useState([]);
  const [menustate, setMenuState] = useState("/search");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ApiClient(searchTerm, currentPage).then((data) => {
      setData(data);
      setLoading(false); // Ensure loading is set to false after data is fetched
    });
  }, [searchTerm, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const inputHandler = (e) => {
  //   var lowerCase = e.target.value.toLowerCase();
  //   setSearchTerm(lowerCase);
  //   setCurrentPage(1);
  // };

  const debouncedInputHandler = _.debounce((e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    setCurrentPage(1);
  }, 500); // 500 миллисекунд задержки (можете изменить значение)

  const inputHandler = (e) => {
    // Вызывается только после того, как прошло 500 миллисекунд с момента последнего вызова
    debouncedInputHandler(e);
  };

  const onMenuClick = (id) => {
    setMenuState(id);
  };

  const handleRateChange = (movieId, newRate) => {
    const isCardRated = ratedMoviesIds.some((movie) => movie.id === movieId);

    if (isCardRated) {
      setRatedMoviesIds((prevRatedMoviesIds) =>
        prevRatedMoviesIds.map((movie) =>
          movie.id === movieId ? { ...movie, rate: newRate } : movie
        )
      );
    } else {
      setRatedMoviesIds((prevRatedMoviesIds) => [
        ...prevRatedMoviesIds,
        { id: movieId, rate: newRate },
      ]);
    }
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
              {data.results &&
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
                ))}
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
      const itemsPerPage = 20;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const ratedMoviesToDisplay = ratedMoviesIds.slice(startIndex, endIndex);

      const showPagination = ratedMoviesIds.length > itemsPerPage;

      return (
        <main>
          {ratedMoviesToDisplay &&
            ratedMoviesToDisplay.map(
              (item) =>
                item && (
                  <Card
                    item={item}
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
                    loading={loading}
                    rate={item.rate || 0}
                    onRateChange={(newRate) =>
                      handleRateChange(item.id, newRate)
                    }
                  />
                )
            )}
          {showPagination && (
            <PaginationsPages
              page={currentPage}
              handlePageChange={handlePageChange}
              total={Math.ceil(ratedMoviesIds.length / itemsPerPage)}
            />
          )}
        </main>
      );
    }
  };

  return (
    <div className="container">
      <div className="content">
        <header>
          <div className="menu-center">
            <MuvieMenu className="menu-center" onMenuClick={onMenuClick} />
          </div>
        </header>
        {/* <div className="input-container">
          <Input
            value={searchTerm}
            onChange={inputHandler}
            placeholder="Type to search..."
          />
        </div> */}
        <div className="input-container"></div>
        {/* {loading && <Spin />}
        {!loading && renderContent()} */}
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
