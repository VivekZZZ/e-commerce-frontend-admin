import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to="/merchanthomepage/add-product"style={{textDecoration:"none"}}>
        <div className="sidebar-items">
          Add Product
        </div>
      </Link>
      <Link to="/merchanthomepage/list-product"style={{textDecoration:"none"}}>
        <div className="sidebar-items">
          List Products
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
