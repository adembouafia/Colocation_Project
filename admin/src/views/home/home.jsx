import React from 'react'
import Sidebar from '../../components/sidebar'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
<div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    {/*  sidebar start */}
        <Sidebar/>
    {/*  sidebar end */}
  {/*  Main wrapper */}
  <div className="body-wrapper">
    {/*  Header start */}
        <Header/>
    {/*  Header end */}
    <div className="container-fluid">

      {/*  Rows were here */}

      <Outlet/>
      
      <Footer/>
    </div>
  </div>
</div>

  )
}

export default Home

