import React from 'react'
import ArtworkList from './ArtworkList'


function Collection({ collection, handleAddToExhibition, handleRemoveFromCollection }) {
    return (
        <div className="collectionContainer">
            <h2 className="collectionTitle">Collection</h2>
            {collection.length > 0 ? (
                <div className="collectionArtworks">
                    <ArtworkList
                        artworks={collection}
                        handleAddToExhibition={handleAddToExhibition}
                        handleRemove={handleRemoveFromCollection}
                    />
                </div>
            ) : (
                <p className="collectionEmpty">Your collection is empty.</p>
            )}
        </div>
    )
}

export default Collection