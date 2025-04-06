import './App.css'

import { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';


import Header from './components/header/Header'
import Catalog from './components/catalog/Catalog'
import View from './components/beast/View'

import { accessURL } from './frontend-config'
import { setUser } from './redux/slices/userSlice';

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(accessURL + '/isLoggedIn').then(({ data }) => {
      dispatch(setUser(data))
    })
  }, []);

  return (
    <div className='background'>
      <div className='container'>
        <Header />
        <br />
        <Routes>
          <Route index element={<Catalog />} />
          <Route path='beast'>
            <Route index element={<Catalog />} />
            <Route path=':beastId/gm' element={<View />} />
            <Route path=':beastId/player' element={<View />} />
            <Route path=':beastId' element={<View />} />
          </Route>
        </Routes>
        <br />
        {/* footer */}
        <ToastContainer transition={Slide} stacked theme="colored" closeOnClick/>
      </div>
    </div>
  )
}
