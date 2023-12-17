import './PaginationPages.scss';
import React from 'react';
import { Pagination } from 'antd';
import UIContext from '../../context/UIContext';
import DataContext from '../../context/DataContext';

function PaginationsPages() {
  const { currentPage, setCurrentPage } = React.useContext(UIContext);
  const { muviesRenderList } = React.useContext(DataContext);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <Pagination
      defaultPageSize={1}
      defaultCurrent={1}
      current={currentPage}
      onChange={handlePageChange}
      total={muviesRenderList.total_pages}
    />
  );
}

export default PaginationsPages;
