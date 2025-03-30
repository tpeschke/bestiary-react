import './App.css'

import Catalog from './components/catalog/Catalog'
import Header from './components/header/Header'

export default function App() {
  return (
    <div className='background'>
      <div className='container'>
        <Header/>
        <br/>
        <Catalog/>
        <br/>
        {/* Footer */}
      </div>
    </div>
  )
}