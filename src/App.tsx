import './App.css'
import { Routes, Route } from "react-router-dom";

import Header from './components/header/Header'
import Catalog from './components/catalog/Catalog'
import GMView from './components/beast-view/GMView';
import PlayerView from './components/beast-view/PlayerView';

export default function App() {
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
