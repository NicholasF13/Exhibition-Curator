import React from 'react'
import ArtworkList from './ArtworkList'

function Exhibition({ exhibition, handleRemoveFromExhibition }) {
    return (
        <div className="exhibitionContainer">
            <h2 className="exhibitionTitle">Exhibition</h2>
            {exhibition.length > 0 ? (
                <div className="exhibitionArtworks">
                    <ArtworkList
                        artworks={exhibition}
                        handleRemove={handleRemoveFromExhibition}
                    />
                </div>
            ) : (
                <p className="exhibitionEmpty">Your exhibition is empty.</p>
            )}
        </div>
    )
}

export default Exhibition