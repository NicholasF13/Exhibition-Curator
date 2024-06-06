import React from 'react'

function ArtworkList ({artworks, handleAddToExhibition}) {
    console.log(artworks)
    return (
        <div className='artworkList'>
            {artworks.map((artwork, index) => (
                <div key={index} onClick={() => handleAddToExhibition && handleAddToExhibition (artwork)}>
                    <img src={artwork.primaryImageSmall} alt={artwork.title} />
                    <p>{artwork.title}</p>
                </div>
            ))}
        </div>
    )
}

export default ArtworkList