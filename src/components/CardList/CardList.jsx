import React from 'react';
import './CardList.scss';
import { Spin } from 'antd';
import Card from '../Card/Card';
import NoData from '../NoData/NoData';
import PaginationsPages from '../PaginationsPages/PaginationsPages';
import DataContext from '../../context/DataContext';
import UIContext from '../../context/UIContext';

export default function CardList() {
  const { muviesRenderList } = React.useContext(DataContext);
  const { loading } = React.useContext(UIContext);
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
              />
            ))
          ) : (
            <NoData />
          )}
        </main>
      )}
      {muviesRenderList.total_pages > 1 && (
        <footer>
          <PaginationsPages />
        </footer>
      )}
    </div>
  );
}
