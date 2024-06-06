import axios from 'axios'

const BASE_URL_MET = 'https://collectionapi.metmuseum.org/public/collection/v1'
const BASE_URL_RIJKS = 'https://www.rijksmuseum.nl/api/en/collection';

function fetchArtworksMet (parameters) {
    return axios.get(`${BASE_URL_MET}/search?q=${parameters}`)
    .then(res => res.data)
    .then(data => {
        if (data.total > 0) {
            const artPromises = data.objectIDs.slice(0,10).map(id => {
                return axios.get(`${BASE_URL_MET}/objects/${id}`)
                .then(res => res.data)
            })
            return Promise.all(artPromises)
        } else {
            return []
        }
    })
    .catch(error => {
        console.error('There was an error in fetching artworks', error)
        return []
    })
}

function fetchArtworksRijks(parameters) {
    const apiKey = 'lXOLoetK'
    return axios.get(`${BASE_URL_RIJKS}?key=${apiKey}&q=${parameters}&ps=10`)
        .then(res => res.data.artObjects.map(item => ({
            id: item.objectNumber,
            title: item.title,
            imageUrl: item.webImage ? item.webImage.url : null,
        })))
        .catch(error => {
            console.error('There was an error fetching artworks from the Rijksmuseum API', error)
            return []
        })
}

export { fetchArtworksMet, fetchArtworksRijks}