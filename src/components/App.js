import React, { Component } from 'react'
import SideBar from './SideBar'
import Main from './Main';

class App extends Component {
  render() {
    return ( 
      <div className="container flex h-screen">
        <SideBar />
        <Main />
      </div>
    )
  }
}

export default App