import React from 'react'
import './CardList.scss'
import { Spin } from 'antd'

import Card from '../Card/Card'
import NoData from '../NoData/NoData'
import PaginationsPages from '../PaginationsPages/PaginationsPages'

export default function CardList({
  muviesRenderList,
  loading,
  setCurrentPage,
  currentPage,
  guestSessionId,
  ratedMovies,
  setError,
}) {
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
                posterPath={item.poster_path}
                voteAverage={item.vote_average}
                item={item}
                guestSessionId={guestSessionId}
                ratedMovies={ratedMovies}
                setError={setError}
              />
            ))
          ) : (
            <NoData />
          )}
        </main>
      )}
      {muviesRenderList.total_pages > 1 && (
        <footer>
          {!loading && (
            <PaginationsPages
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              muviesRenderList={muviesRenderList}
            />
          )}
        </footer>
      )}
    </div>
  )
}
