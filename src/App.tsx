import './App.css'

import { useEffect } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import { Tooltip } from 'react-tooltip'

import Header from './components/header/Header'

import { accessURL } from './frontend-config'
import { setUser, isUserLoggedOn } from './redux/slices/userSlice';
import Footer from './components/footer/Footer';
import AllRoutes from './routing/AllRoutes';

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
        <AllRoutes />
        <Footer />
        <ToastContainer transition={Slide} stacked theme="colored" closeOnClick />
        <Tooltip id="my-tooltip" place="bottom" />
      </div>
    </div >
  )
}
