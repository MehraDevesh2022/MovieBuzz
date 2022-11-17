import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavBar extends Component {


  render() {
    return (
      <div style={{ display: 'flex', padding: '0.5rem' }}>
        <Link to='/' style={{textDecoration :"none"}}> <h1>MoviesApp</h1></Link >
        <Link to='/favourite' style={{textDecoration :"none"}}>   <h2 style={{ marginLeft: '2rem', marginTop: '0.3rem' }}>Favourites</h2></Link>
      </div>
    );
  }
}

export default NavBar
