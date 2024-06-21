import React, { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Login from './components/user/login/Login';
import Register from './components/user/register/Register';
import Dashboard from './components/main/dashboard/Dashboard';
import Brewery from './components/main/brewery/Brewery';


const App = () => {

  return (
      <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/brewery/:id' element={<Brewery/>}/>
      

      </Routes>
      
      </>
  )
}

export default App