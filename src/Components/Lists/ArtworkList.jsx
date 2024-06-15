import React from 'react'
import { Link } from 'react-router-dom'


function ArtworkList({ artworks, handleAddToExhibition, handleRemove }) {
    return (
        <div className="artworkList">
            {artworks.map((artwork) => (
                <div key={artwork.id} className="artworkListItem">
                    <Link to={`/artwork/${artwork.id}`} state={{ artwork }}>
                        <img src={artwork.imageUrl} alt={artwork.title} className="artworkImage" />
                    </Link>
                    <div className="artworkDetails">
                        <p className="artworkTitle">{artwork.title}</p>
                        {artwork.year && (
                            <p className="artworkYear">ca. {artwork.year < 0 ? `${Math.abs(artwork.year)} BC` : artwork.year}</p>
                        )}
                    </div>
                    <div className="artworkActions">
                        {handleAddToExhibition && (
                            <button className="actionButton" onClick={() => handleAddToExhibition(artwork)}>Add to Exhibition</button>
                        )}
                        {handleRemove && (
                            <button className="actionButton" onClick={() => handleRemove(artwork.id)}>Remove</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ArtworkList