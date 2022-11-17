import axios from "axios";
import React, { Component } from "react";
import {movies} from '../movieData'
export class Banner extends Component {

  constructor(){
    super()
    this.state={
      movieArr : []
    }
  }


  async componentDidMount() { // used for side effect  
    let randomNum = Math.floor(Math.random() * 100)
    console.log(randomNum);
    let res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=4d8e0bed443e8ebba0ce19fbfe2b872c&language=en-US&page=${randomNum}`)
    let movieDataObj = res.data;
    // console.log(movieDataObj.results);
    this.setState({
      movieArr: [...movieDataObj.results]
    })
  }

 
 
  render() {
    let randomNum = Math.floor(Math.random() * this.state.movieArr.length)
  let moviesPosterPath = this.state.movieArr.map((elm) =>{
    return elm.poster_path
  })
  
    let moviesTitle = this.state.movieArr.map((elm) => {
      return elm.title
    })

   
    return (
    <> 
        <div className="card banner-card">
        
          <img src={`https://image.tmdb.org/t/p/original${moviesPosterPath[randomNum]}`} className="card-img-top banner-img" alt="..."/>
        
            <h5 className="card-title banner-title">{moviesTitle[randomNum]}</h5>
            {/* <p className="card-text banner-text">{movies.results[randomNum].overview}</p> */}
          </div>
      </>
    )
  }
}
export default Banner
