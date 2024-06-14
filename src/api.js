import axios from "axios"

const BASE_URL_MET = 'https://collectionapi.metmuseum.org/public/collection/v1'
const BASE_URL_EUROPEANA = 'https://www.europeana.eu/api/v2/search.json'
const EUROPEANA_API_KEY = 'norineouti'




function fetchArtworksMet(parameters) {
    const url = `${BASE_URL_MET}/search?q=${encodeURIComponent(parameters)}`

    return axios.get(url)
        .then(res => {
          
            const { objectIDs } = res.data
            if (objectIDs && objectIDs.length > 0) {
                const objectIDsToFetch = objectIDs.slice(0, 50)   
                return Promise.all(objectIDsToFetch.map(objectID => {
                    const artworkUrl = `${BASE_URL_MET}/objects/${objectID}`
                    return axios.get(artworkUrl)
                        .then(response => response.data)
                        .catch(error => {
                          
                            if (error.response && error.response.status === 404) {
                                return null
                            } else {
                                console.error(`Error fetching artwork with object ID ${objectID}:`, error)
                                throw error
                            }
                        })
                }))
            } else {
             
                return []
            }
        })
        .catch(error => {
            console.error('There was an error in fetching artworks from MET API:', error)
            return []
        })
}

function fetchArtworksEuropeana(parameters) {
    const url = `${BASE_URL_EUROPEANA}?query=${encodeURIComponent(parameters)}&wskey=${EUROPEANA_API_KEY}`

    return axios.get(url)
        .then(res => {
            const { items } = res.data
            return items
        })
        .catch(error => {
            console.error('There was an error in fetching artworks from Europeana', error)
            return []
        })
}

export { fetchArtworksMet, fetchArtworksEuropeana}