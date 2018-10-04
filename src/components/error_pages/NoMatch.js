import React from 'react'
import './no-match-style.css'
import OhSnap from './oh-snap.svg'

const NoMatch = ({ location, history }) => (
  <div className="flex flex-col justify-center items-center bg-white h-screen">
    <div className="text-center">
      
      <h1 className="text-grey-dark" style={{fontSize: '16em'}}>4<img src={OhSnap} alt="oh snap" className="mx-3" height="180" width="180" />4</h1>
      <h3 className="text-grey-light">
        Sorry, Page Not Found
      </h3>
      <button className="bg-grey text-white hover:bg-grey-dark px-3 py-2 mt-3 rounded" onClick={history.goBack}>Go Back</button>
    </div>
  </div>
)

export default NoMatch