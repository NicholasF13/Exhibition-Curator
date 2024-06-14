import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Search from './Components/Search'
import Collection from './Components/Lists/Collection'
import Exhibition from './Components/Lists/Exhibition'
import ArtworkDetail from './Components/ArtworkDetail'

function App() {
    const [collection, setCollection] = useState(() => {
        const savedCollection = localStorage.getItem('collection')
        return savedCollection ? JSON.parse(savedCollection) : []
    })
    const [exhibition, setExhibition] = useState(() => {
        const savedExhibition = localStorage.getItem('exhibition')
        return savedExhibition ? JSON.parse(savedExhibition) : []
    })

    useEffect(() => {
        localStorage.setItem('collection', JSON.stringify(collection))
    }, [collection])

    useEffect(() => {
        localStorage.setItem('exhibition', JSON.stringify(exhibition))
    }, [exhibition])

    const handleAddToCollection = (artwork) => {
        if (!collection.some(item => item.id === artwork.id)) {
            setCollection([...collection, artwork])
        } else {
            console.log('Artwork already in collection')
        }
    }

    const handleRemoveFromCollection = (artworkId) => {
        setCollection(collection.filter(item => item.id !== artworkId))
    }

    const handleAddToExhibition = (artwork) => {
        if (!exhibition.some(item => item.id === artwork.id)) {
            setExhibition([...exhibition, artwork])
        } else {
            console.log('Artwork already in exhibition')
        }
    }

    const handleRemoveFromExhibition = (artworkId) => {
        setExhibition(exhibition.filter(item => item.id !== artworkId))
    }

    return (
        <main>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/collection'>Collection</Link>
                <Link to='/exhibition'>Exhibition</Link>
            </nav>
            <Routes>
                <Route path='/' element={<Search handleAddToCollection={handleAddToCollection} />} />
                <Route path='/collection' element={<Collection collection={collection} handleAddToExhibition={handleAddToExhibition} handleRemoveFromCollection={handleRemoveFromCollection} />} />
                <Route path='/exhibition' element={<Exhibition exhibition={exhibition} handleRemoveFromExhibition={handleRemoveFromExhibition} />} />
                <Route path='/artwork/:id' element={<ArtworkDetail />} />
            </Routes>
        </main>
    )
}

export default App