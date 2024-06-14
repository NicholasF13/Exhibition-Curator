import React from 'react';
import { useLocation } from 'react-router-dom';

const ArtworkDetail = () => {
    const { state } = useLocation()
    const artwork = state.artwork

    return (
        <div>
            <h2>{artwork.title}</h2>
            <img src={artwork.imageUrl} alt={artwork.title} />
            <p>ca. {artwork.year < 0 ? `${Math.abs(artwork.year)} BC` : artwork.year || 'N/A'}</p>
            {artwork.artist && <p>Artist: {artwork.artist}</p>}
            {artwork.medium && <p>Medium: {artwork.medium}</p>}
            {artwork.department && <p>Category: {artwork.department}</p>}
            {artwork.link && <a href={artwork.link} target="_blank" rel="noopener noreferrer">More Information</a>}
        </div>
    )
}

export default ArtworkDetail