/* eslint-disable react/prop-types */
import './PaginationPages.scss';
import React from 'react';
import { Pagination } from 'antd';

function PaginationsPages({ page, handlePageChange, total }) {
  return (
    <Pagination
      defaultPageSize={1}
      defaultCurrent={1}
      current={page}
      onChange={handlePageChange}
      total={total}
    />
  );
}

export default PaginationsPages;
