import React from 'react'
import './no-match-style.css'

const NoMatch = ({ location, history }) => (
  <div className="flex flex-col justify-center items-center bg-white h-screen">
    <div className="text-center">
      <h1 className="text-grey-dark" style={{fontSize: '16em'}}>4<div className="bigO"></div>4</h1>
      <h3 className="text-grey-light">
        No match for <code>{location.pathname}</code>
      </h3>
      <button className="bg-grey text-white hover:bg-grey-dark px-3 py-2 mt-3 rounded" onClick={history.goBack}>Go Back</button>
    </div>
  </div>
)

export default NoMatch