import React, { Component } from "react";
import { movies } from "../movieData";
import axios from "axios";
import { json } from "react-router-dom";
export class MoviesList extends Component {

  constructor(){
    super()
    this.state= {
      hover : "", // this will contain movie id when we hover movielist
      pageArr : [1], // this stores page number of the project
      movieArr : [], // this will store all movie fecthing through api call
      currPage : 1, // this is for page number 
      favourites :[] // this array stores fav movies strore them into local storage
    }
  }

  // componentDidMount method only runs one time in react life cycle when data requird so we need this code responsive for more uses so make new function with same code
 async componentDidMount(){ // used for side effect  
   let res = await axios('https://api.themoviedb.org/3/movie/popular?api_key=4d8e0bed443e8ebba0ce19fbfe2b872c&language=en-US&page=1')
   let movieDataObj = res.data;
  // console.log(movieDataObj.results);
   this.setState({
    movieArr : [...movieDataObj.results]
   })
  }


  // chnage movie function getting all movie data from tdmb api call bcz componentDidMount runs only one time
 changeMovies = async() =>{
   let res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=4d8e0bed443e8ebba0ce19fbfe2b872c&language=en-US&page=${this.state.currPage}`) // when we click next button then api call will occures for next page movie list
    let movieDataObj = res.data;
    // console.log(movieDataObj.results);
    this.setState({
      movieArr: [...movieDataObj.results]
    })
  }


  // handle next => when we click next page currPage state will change and changeMovies function will call for fetching new page data
  handleNextPage = ()=>{
    // pageArr.length and state.currPage then we will add new value on tempArry for showing number into screen
    if(this.state.pageArr.length === this.state.currPage){
      let tempArr = [];
      for (let i = 1; i <= this.state.pageArr.length + 1; i++) {
        tempArr.push(i);
      }
      this.setState({
        pageArr: [...tempArr],
        currPage: this.state.currPage + 1
      }, this.changeMovies) // this is how in after setstate we have option to call function
    } else{
       this.setState({
         currPage: this.state.currPage + 1
       }, this.changeMovies)
    }
  }

  // vice versa of handle next
  handlePreviousPage = ()=>{
    if(this.state.currPage !=1){
      this.setState({
        currPage: this.state.currPage-1
      }, this.changeMovies) // this is how the function calling for fetching data after handlePreviousPage states are change
    }
  }
// when we are clicking number of page then we will render on that page
  handleValuePage =(pageValue)=>{
    if(pageValue != this.state.currPage){
      this.setState({
        currPage : pageValue
      }, this.changeMovies) // calling changeMovies function after chaining state of currPage value with selected number 
    }
  }

  // this function first check data from local storage  if found then already into list then ignore else store and upadte local storage and chnange the state of favourites array
  handleAddToFavourite = (movieArrObj) =>{
    let oldData = JSON.parse(localStorage.getItem("movie-app") || '[]');
    if(this.state.favourites.includes(movieArrObj.id)){
            oldData = oldData.filter((favMovieId) => favMovieId.id !=movieArrObj.id) 
   }else{
      oldData.push(movieArrObj); 
   }
    localStorage.setItem('movie-app' , JSON.stringify(oldData));
    // calling the function for chaning the state of  favourites array 
    this.handleFavouritesState();
  }

// this is for favourites array state change after update fav movie into local storage 
  handleFavouritesState =()=>{
    let oldData = JSON.parse(localStorage.getItem("movie-app") || '[]');
    let temp = oldData.map((favMovieArr) => favMovieArr.id)
    this.setState({
      favourites : [...temp]
    })
  }

  render() {

    return (
      <>
        <div>
          <h3 className="text-center">
            <strong>Trending</strong>
          </h3>
        </div>

        <div className="movies-list">
          
          {this.state.movieArr.map((arrayElm) => {
            return (
              <div
                className="card movie-card"
                // onMouseEnter and onMouseDown both are same like doms mouseOver and mouseDown
                onMouseEnter={() => this.setState({ hover: arrayElm.id }) } 
                onMouseLeave= {() => this.setState({hover : ''})}
              >
                <img
                // completeing the path for   diffrent movie  image using backdrop_path using movie obj  
                  src={`https://image.tmdb.org/t/p/original${arrayElm.backdrop_path}`}
                  style={{ height: "40vh", width: "20vw" }}
                  className="card-img-top movie-img"
                  alt="movies"
                />
                    {/* movie title from movie array obj   */}
                <h5 className="card-title movie-title">{arrayElm.title}</h5> 
                
             <div className="button-wrapper " style={{ display: "flex", justifyContent: "center" }}>
                     {/* if hover and movie id is equal then show fav button on the movie card */}
                   {this.state.hover == arrayElm.id && (
                    // onMouseEnter in movie card and calling handleFavouritesState bcz initialy favourites array value is empty so if any movie already in fav list then it will show remove to list else add to favourites
                    <a className="btn btn-primary movie-button text-center" onMouseEnter={this.handleFavouritesState}  onClick={() => this.handleAddToFavourite(arrayElm)} > {this.state.favourites.includes(arrayElm.id) ? "Remove from favourite" : "Add favourite"}</a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* {pagination} */}
        <div style={{display :"flex" , justifyContent : "center"}}>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" onClick={this.handlePreviousPage}>
                  Previous
                </a>
              </li>

               {this.state.pageArr.map((pageVal) => {
                 return (<li class="page-item">
                   <a class="page-link" onClick={()=>this.handleValuePage(pageVal)}>
                     {pageVal}
                   </a>
                 </li>)
  })}
              <li class="page-item">
                <a class="page-link" onClick={this.handleNextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default MoviesList;
