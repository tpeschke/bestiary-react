import './App.css'

import { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'

import Header from './components/header/Header'
import Catalog from './components/catalog/Catalog'
import GMView from './components/beast-view/GMView';
import PlayerView from './components/beast-view/PlayerView';

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
            <Route path=':beastId/gm' element={<GMView />} />
            <Route path=':beastId/player' element={<PlayerView />} />
          </Route>
        </Routes>
        <br />
        {/* footer */}
      </div>
    </div>
  )
}
