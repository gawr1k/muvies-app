/* eslint-disable no-unused-vars */
import React from 'react';
import './CardList.scss';
import { Spin } from 'antd';
import Card from '../Card/Card';
import NoData from '../NoData/NoData';
import PaginationsPages from '../PaginationsPages/PaginationsPages';
import getGenreNamesByIds from '../Card/genre_id';
import DataContext from '../../context/DataContext';
import UIContext from '../../context/UIContext';

export default function CardList() {
  const {
    muviesRenderList, ratedMoviesIds, setRatedMoviesIds, guestSessionId,
  } = React.useContext(DataContext);
  const {
    loading, currentPage, setCurrentPage, setSearchTerm,
  } = React.useContext(UIContext);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <div className="example">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <main>
          {muviesRenderList.results && muviesRenderList.results.length > 0 ? (
            muviesRenderList.results.map((item) => (
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
                guestSessionId={guestSessionId}
              />
            ))
          ) : (
            <NoData />
          )}
        </main>
      )}
      {muviesRenderList.total_pages > 1 && (
        <footer>
          <PaginationsPages
            page={currentPage}
            handlePageChange={handlePageChange}
            total={muviesRenderList.total_pages}
          />
        </footer>
      )}
    </div>
  );
}
