import React from 'react';
import "./home.css"

const Home = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid m-15 p-5" id="firstJumbo">
        <h1 className="display-1">Delve</h1>
      </div>
      <div className="jumbotron jumbotron-fluid text-end h-75 m-15 p-5 text-right" id="secondJumbo">
        <h1 className="display-2">Into</h1>
      </div>
      <div className="jumbotron jumbotron-fluid h-75 m-15 p-5" id="thirdJumbo">
        <h1 className="display-3">The</h1>
      </div>
      <div className="jumbotron jumbotron-fluid text-center h-75 m-15 p-5" id="fourthJumbo">
        <h1 className="display-4">Deep</h1>
        <a href="/signup" className="btn btn-primary btn-lg btn-dark my-5">Sign Up</a>
      </div>
    </div>
  )

}

export default Home;
