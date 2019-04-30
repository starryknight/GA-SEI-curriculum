import React from 'react'

export default function Result(props) {
  return (
    <div className="result">
      <img src={props.image} alt={props.name}/>
      <h2>{props.name}</h2>
    </div>
  )
}
