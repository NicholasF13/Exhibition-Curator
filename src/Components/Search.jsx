import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchArtworksMet, fetchArtworksEuropeana } from '../api'


const eras = [
    { name: 'Ancient', startYear: -Infinity, endYear: 500 },
    { name: 'Medieval', startYear: 500, endYear: 1500 },
    { name: 'Renaissance', startYear: 1400, endYear: 1600 },
    { name: 'Baroque', startYear: 1600, endYear: 1750 },
    { name: 'Neoclassical', startYear: 1750, endYear: 1850 },
    { name: 'Modern', startYear: 1850, endYear: Infinity }
];

function normalizeArtworkData(artworks, source) {
    switch (source) {
        case 'MET':
            return artworks
                .filter(artwork => artwork !== null)
                .map(artwork => ({
                    id: artwork.objectID,
                    imageUrl: artwork.primaryImageSmall,
                    title: artwork.title,
                    year: artwork.objectEndDate,
                    link: artwork.objectURL,
                    artist: artwork.artistDisplayName,
                    medium: artwork.medium,
                    department: artwork.department,
                    description: artwork.creditLine || 'No description available'
                }))
        case 'EUROPEANA':
            return artworks
                .filter(artwork => artwork !== null)
                .map(artwork => ({
                    id: extractUniqueIdentifier(artwork.id),
                    imageUrl: artwork.edmPreview ? artwork.edmPreview[0] : null,
                    title: artwork.title[0],
                    year: artwork.year ? parseInt(artwork.year[0], 10) : null,
                    source: 'EUROPEANA',
                    description: null,
                    link: artwork.edmIsShownAt || ''
                }))
        default:
            return artworks
    }
}

const extractUniqueIdentifier = (europeanaId) => {
    const parts = europeanaId.split('/')
    return parts[parts.length - 1]
};

const Search = ({ handleAddToCollection }) => {
    const [parameters, setParameters] = useState('')
    const [artworks, setArtworks] = useState([])
    const [selectedEra, setSelectedEra] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')

    const handleSearch = () => {
        Promise.all([fetchArtworksMet(parameters), fetchArtworksEuropeana(parameters)])
            .then(([artworksMet, artworksEuropeana]) => {
                const normArtworksMet = normalizeArtworkData(artworksMet, 'MET')
                const normArtworksEuropeana = normalizeArtworkData(artworksEuropeana, 'EUROPEANA')
                let mergedArtworks = [...normArtworksMet, ...normArtworksEuropeana]

                if (selectedEra) {
                    mergedArtworks = mergedArtworks.filter(
                        artwork => artwork.year && artwork.year >= selectedEra.startYear && artwork.year < selectedEra.endYear
                    )
                }

                const sortedArtworks = sortArtworksByYear(mergedArtworks)
                setArtworks(sortedArtworks)
            })
            .catch(err => {
                console.error('Error fetching artworks', err)
            })
    }

    const handleSelectEra = (e) => {
        const era = JSON.parse(e.target.value)
        setSelectedEra(era)
    }

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value)
    }

    const sortArtworksByYear = (artworks) => {
        return artworks.slice().sort((a, b) => {
            if (!a.year || !b.year) return 0
            return sortOrder === 'asc' ? a.year - b.year : b.year - a.year
        })
    }

    useEffect(() => {
        const sortedArtworks = sortArtworksByYear(artworks)
        setArtworks(sortedArtworks)
    }, [sortOrder])

    return (
        <div className="searchContainer">
            <input
                type="text"
                value={parameters}
                onChange={(e) => setParameters(e.target.value)}
                placeholder="Search for artworks"
            />
            <button onClick={handleSearch}>Search</button>

            <label>Select Era: </label>
            <select onChange={handleSelectEra}>
                <option value="">All</option>
                {eras.map((era, index) => (
                    <option key={index} value={JSON.stringify(era)}>{era.name}</option>
                ))}
            </select>

            <label>Sort by Year: </label>
            <select value={sortOrder} onChange={handleSortOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <div className="artworks">
                {artworks.map((artwork) => (
                    <div key={artwork.id} className="artworkItem">
                        <Link to={`/artwork/${artwork.id}`} state={{ artwork }}>
                            <img src={artwork.imageUrl} alt={artwork.title} />
                        </Link>
                        <p>{artwork.title}</p>
                        <p>ca. {artwork.year < 0 ? `${Math.abs(artwork.year)} BC` : artwork.year || 'N/A'}</p>
                        <button onClick={() => handleAddToCollection(artwork)}>Add to Collection</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search