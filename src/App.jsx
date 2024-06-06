import './App.css'
import React, { useState } from 'react'
import { Route, Routes, Link} from 'react-router-dom'
import Search from './Components/Search'
import Collection from './Components/Lists/Collection'
import Exhibition from './Components/Lists/Exhibition'


function App() {

  const [collection, setCollection] = useState([])
  const [exhibition, setExhibition] = useState([])


  const handleAddToCollection = (artwork) => {
    setCollection([...collection, artwork])
  }

  const handleAddToExhibition = (artwork) => {
    setExhibition([...exhibition, artwork])
  }

  return (
    <main>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/collection'>Collection</Link>
        <Link to='/exhibition'>Exhibition</Link>
      </nav>
      <Routes>
      <Route path='/' element={<Search handleAddToCollection={handleAddToCollection}/> }/>
      <Route path='/collection' element={<Collection collection={collection} handleAddToExhibition={handleAddToExhibition}/>}/>
      <Route path='/exhibition' element={<Exhibition exhibition={exhibition}/>} />
      </Routes>
    </main>
  )
}

export default App
