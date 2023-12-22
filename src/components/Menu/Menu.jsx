import { Menu } from 'antd'
import React from 'react'

const items = [
  {
    label: 'Search',
    key: '/search',
  },
  {
    label: 'Rated',
    key: '/rated',
  },
]

export default function MuvieMenu({ setMenuState, setCurrentPage }) {
  const onMenuClick = (id) => {
    setMenuState(id)
    setCurrentPage(1)
  }

  return (
    <Menu
      mode="horizontal"
      items={items}
      onClick={({ key }) => {
        onMenuClick(key)
      }}
    />
  )
}
