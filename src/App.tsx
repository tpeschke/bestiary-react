import './App.css'

import { useEffect } from 'react';

import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import { Tooltip } from 'react-tooltip'

import Header from './components/header/Header'
import Catalog from './pages/catalog/Catalog'
import View from './pages/beast/View'

import { accessURL } from './frontend-config'
import { setUser, isUserLoggedOn } from './redux/slices/userSlice';
import Loading from './components/loading/Loading';

export default function App() {
  const userIsLoggedIn = useSelector(isUserLoggedOn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userIsLoggedIn) {
      axios.get(accessURL + '/isLoggedIn').then(({ data }) => {
        dispatch(setUser(data))
      })
    }
  }, []);

  return (
    <div className='background'>
      <div className='container'>
        <Header />
        <br />
        <Routes>
          <Route index element={<Loading component={Catalog} />} />
          <Route path='beast'>
            <Route index element={<Loading component={Catalog} />} />
            <Route path=':beastId/gm' element={<Loading component={View} />} />
            <Route path=':beastId/player' element={<Loading component={View} />} />
            <Route path=':beastId' element={<Loading component={View} />} />
          </Route>
        </Routes>
        <br />
        {/* footer */}
        <ToastContainer transition={Slide} stacked theme="colored" closeOnClick />
        <Tooltip id="my-tooltip" place="bottom"/>
      </div>
    </div>
  )
}
