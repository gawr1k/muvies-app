import './PaginationPages.scss'
import React from 'react'
import { Pagination } from 'antd'

function PaginationsPages({ currentPage, setCurrentPage, muviesRenderList }) {
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  return (
    <Pagination
      defaultPageSize={1}
      defaultCurrent={1}
      current={currentPage}
      onChange={handlePageChange}
      total={muviesRenderList.total_pages}
    />
  )
}

export default PaginationsPages
