import React, { useState } from 'react'

import { fetchArtworksMet, fetchArtworksRijks } from '../api';

function normalizeArtworkData(artworks, source) {
    switch (source) {
        case 'MET':
            return artworks.map(artwork => ({
                id: artwork.objectID,
                imageUrl: artwork.primaryImageSmall,
                title: artwork.title,
            }));
        case 'RIJKS':
          console.log(artworks)
            return artworks.map(artwork => ({
                id: artwork.id,
                imageUrl: artwork.imageUrl,
                title: artwork.title,
            }))
        default:
            return artworks;
    }
}

function Search({ handleAddToCollection }) {
    const [parameters, setParameters] = useState('')
    const [artworks, setArtworks] = useState([])

    function handleSearch() {
        Promise.all([
            fetchArtworksMet(parameters),
            fetchArtworksRijks(parameters)
        ])
        .then(([artworksMet, artworksRijks]) => {
            const normalizedArtworksMet = normalizeArtworkData(artworksMet, 'MET')
            const normalizedArtworksRijks = normalizeArtworkData(artworksRijks, 'RIJKS')
            setArtworks([...normalizedArtworksMet, ...normalizedArtworksRijks])
        })
        .catch(err => {
            console.error('Error fetching artworks', err)
        });
    }

    return (
        <div>
            <input
                type="text"
                value={parameters}
                onChange={(e) => setParameters(e.target.value)}
                placeholder="Search for artworks"
            />
            <button onClick={handleSearch}>Search</button>
            <div className="artworks">
                {artworks.map((artwork) => (
                    <div key={artwork.id} onClick={() => handleAddToCollection(artwork)}>
                        {artwork.imageUrl ? (
                            <img src={artwork.imageUrl} alt={artwork.title} />
                        ) : (
                            <p>No image available</p>
                        )}
                        <p>{artwork.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search