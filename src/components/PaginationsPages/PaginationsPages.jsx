import './PaginationPages.scss'
import React from 'react';
import { Pagination } from 'antd';


const PaginationsPages = ({ page, handlePageChange, total }) => (
  <Pagination defaultPageSize={1}
  defaultCurrent={1} current={page} onChange={handlePageChange} total={total} />
);

export default PaginationsPages;