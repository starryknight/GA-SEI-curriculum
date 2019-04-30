import React from 'react'
import Result from './Result.js'


function Results(props) {
  return (
    <div>
        <button onClick={props.handleSearchAgain}>Search Again</button>
        <div className="results">
            {
                props.movies.map((movie) => {
                    const {name, image, id} = movie
                    return (
                        <Result
                            key={id}
                            name={name}
                            image={image ? image.medium : 'https://via.placeholder.com/210x295'}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Results;
