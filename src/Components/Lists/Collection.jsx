import React from 'react'
import ArtworkList from './ArtworkList'


function Collection ({collection, handleAddToExhibition}) {
    return (
        <div>
            <h2>Collection</h2>
            <ArtworkList artworks={collection} handleAddToExhibition={handleAddToExhibition}/>
        </div>
    )
}

export default Collection