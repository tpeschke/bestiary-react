import { useLocation } from 'react-router-dom';
import './SearchOptions.css'

import BestiarySearch from './bestiarySearch/BestiarySearch'
import ObstacleSearch from './obstacleSearch/ObstacleSearch';

export default function SearchOptions() {
    const location = useLocation()
    const isOnObstacleIndex = location.pathname.substring(0, 10) === '/obstacles'
    

    function clearInputs() {
        const inputs = document.getElementsByClassName('search-options-shell')[0].querySelectorAll('input');
        inputs.forEach(input => input.value = '')
        inputs.forEach(input => input.checked = false)
    }

    function clearSelects() {
        const selects = document.getElementsByClassName('search-options-shell')[0].querySelectorAll('select');
        selects.forEach(input => input.value = 'none')
    }

    return (
        <div className='search-options-shell'>
            {!isOnObstacleIndex && <BestiarySearch clearInputs={clearInputs} clearSelects={clearSelects} />}
            {isOnObstacleIndex && <ObstacleSearch clearInputs={clearInputs} clearSelects={clearSelects} />}
        </div>
    )
}