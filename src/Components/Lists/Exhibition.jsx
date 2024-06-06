import React from 'react'
import ArtworkList from './ArtworkList'


function Exhibition ({exhibition}) {
    return (
        <div>
            <h2>Exhibition</h2>
            <ArtworkList artworks={exhibition}/>
        </div>
    )

}

export default Exhibition