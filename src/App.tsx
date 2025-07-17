import './App.css'

import { useEffect } from 'react';

import axios from 'axios';
import { Routes, Route, Navigate } from "react-router-dom";
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
import SearchResults from './pages/beast/pages/searchResults/SearchResults';
import ListHome from './pages/list/ListHome';
import Footer from './components/footer/Footer';

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
        <Routes>
          <Route index element={
            <Loading>
              <Catalog />
            </Loading>
          } />
          <Route path='search' element={
            <Loading>
              <SearchResults />
            </Loading>
          } />
          <Route path='search;' element={
            <Loading>
              <SearchResults />
            </Loading>
          } />
          <Route path='beast'>
            <Route index element={
              <Loading>
                <Catalog />
              </Loading>
            } />
            <Route path=':beastId/gm' element={
              <Loading>
                <View />
              </Loading>
            } />
            <Route path=':beastId/gm/:param1' element={
              <Loading>
                <View />
              </Loading>
            } />
            <Route path=':beastId/gm/:param1/:param2' element={
              <Loading>
                <View />
              </Loading>
            } />
            <Route path=':beastId/player' element={
              <Loading>
                <View />
              </Loading>
            } />
            <Route path=':beastId' element={
              <Loading>
                <View />
              </Loading>
            } />
          </Route>
          <Route path='lists'>
            <Route path=':listId/directlyTo' element={
              <Loading>
                <ListHome />
              </Loading>
            } />
            <Route index element={<Navigate to='/' replace />} />
          </Route>
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />
        <ToastContainer transition={Slide} stacked theme="colored" closeOnClick />
        <Tooltip id="my-tooltip" place="bottom" />
      </div>
    </div >
  )
}
