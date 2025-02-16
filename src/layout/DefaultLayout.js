import React, { useState, useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const DefaultLayout = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  },[userInfo,navigate])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
