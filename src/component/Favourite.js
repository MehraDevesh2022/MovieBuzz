import React, { Component } from "react";
import { movies } from "../movieData";
export class Favourite extends Component {
   
    constructor(){
        super();
        this.state={
           favGenresArr :[], // this is for fav genre for filtering movie
           currGenre : "All genre", // it ponit currValue of genre and highlight the area with blue color
           favMovieArr : [] , // this all fav movie stored in local staorge
           currText : "" // this is for serch baar text value for seraching movie  
        }
    }


     // for the very first time when we getting movie from local stoarge when user entering in fav page
   componentDidMount(){
    // this obj is for genre matching with movie obj fecthed from tdmb 
       let genreIdObj = {
           "genres": [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" },
           { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" },
           { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" },
           { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" },
           { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" },
           { "id": 9648, "name": "Mystery" },
           { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" },
           { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" },
           { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }] 
       }
 // if local stoarge has value then retrun  value else empty array
      let oldStorageData = JSON.parse(localStorage.getItem('movie-app') || []);
       // this is for genre type section
       let tempArr = [];
       oldStorageData.map((movieObj) => {
       genreIdObj.genres.map((genreName) => {
        //  agar genre name pehle se tempArr main hai to return ho jao
               if (genreName.id === movieObj.genre_ids[0]) {
                   if (tempArr.includes(genreName.name)) {
                       return
                   }
                   else {
                       tempArr.push(genreName.name);
                   }
               }
           })
       })         // adding another elm All genere
       tempArr.unshift('All genre')

       this.setState({
           favGenresArr : [...tempArr],
           favMovieArr : [...oldStorageData]
       })
 }

// delete button working =>
    handelDanzerZone = (movie) => {
     let tempData = this.state.favMovieArr.filter((myObj) => {
            return myObj.id != movie.id
        })
        localStorage.setItem('movie-app', JSON.stringify(tempData))
        this.setState({
         favMovieArr : [...tempData],
    
        })
    }

    // currGenreHandler
    currGenreHandler = (genreName) => {
        this.setState({
            currGenre: genreName
        })
 }

       
    sortPopularityDescending = () => {
        let temp = this.state.favMovieArr
        // this is Array.sort() function it take call back and retrun value in descending order
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity
        })
         this.setState({
            movies: [...temp]
        })
    }

    sortPopularityAscending =()=>{ // this will return value in ascending order 
        let temp = this.state.favMovieArr
        temp.sort(function(objA , objB){
            return objA.popularity -objB.popularity 
        })
        this.setState({
            favMovieArr : [...temp]
        })
    }
  
    sortRatingDescending = () => { // this will return movie obj  in descending  order comapre vote_average
           let temp = this.state.favMovieArr
           temp.sort((objA ,objB)=>{
             return objB.vote_average -objA.vote_average
           })
           this.setState({
            favMovieArr : [...temp]
           })
    }
// this function return movie obj in ascending order as per vote_average property
    sortRatingAscending =()=>{
        let temp = this.state.favMovieArr
        temp.sort((objA ,objB)=>{
            return objA.vote_average - objB.vote_average
        })
        this.setState({
            favMovieArr : [...temp]
        })
    }
    

     render() {
        let genreIdObj = { "genres": [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, 
        { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, 
        { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, 
        { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, 
        { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, 
        { "id": 9648, "name": "Mystery" }, 
        { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, 
        { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, 
        { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }] }

        // filter array for serching movie and selecting movie as per genre
         let filterArr =[]
      
         // search baar area has no value then show all movie 
        if(this.state.currText ==''){
            filterArr = this.state.favMovieArr
        }else{
            // if searching movie with there name then show them as per input text value
            filterArr = this.state.favMovieArr.filter((movieObj)=>{
                let original_title = movieObj.original_title.toLowerCase();
                return original_title.includes(this.state.currText.toLowerCase().trim())
            })
        }
        
        
        
        
        // when user selecting specific genre movie then show only those movie using genre id compare with genre obj and local storage movie collection
         if (this.state.currGenre !== 'All genre'){
               genreIdObj.genres.map((genre)=>{
                if(genre.name === this.state.currGenre){
                    filterArr = this.state.favMovieArr.filter((movie) =>{
                        return movie.genre_ids[0] == genre.id
                    })
                }
               })
         }
      
       
    
        return (

            
               <div className="main">
                <div className="row">
                    <div className="col-3">
                        <ul class="list-group genre-selector">
                        {this.state.favGenresArr.map((genreName) =>(
                            // this is for currGenre genre selction . when user click genre section match that genre name with favMovieArr and highlight that genre and call  function for filter specific genre movie
                          this.state.currGenre === genreName ?
                                <li style={{ backgroundColor:"#3f51b5" , color :"white" , fontWeight : "bolder" , textAlign : "center"}} className="list-group-item">{genreName}</li>
                                : <li style={{ color: "#3f51b5", textAlign: "center" }} className="list-group-item" onClick={()=>this.currGenreHandler(genreName)}>{genreName}</li>
                      ))}
                            
                        </ul>
                    </div>
                    <div className="col-9 favourites-table">
                        <div className="row">
                            <input type="text" className="input-group-text col"  placeholder="search"
                            value={this.state.currText} onChange ={(e) => this.setState({currText : e.target.value})}
                            />
                            <input type="number" className="input-group-text col" />
                        </div>

                        <div className="row">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        {/* this is for popular movie selction in descending and ascending order */}
                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDescending}></i >Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAscending}></i></th>
                                         {/* this for sorting as per rating in descending and ascending order */}
                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDescending}></i>Ratting<i class="fa-solid fa-sort-down" onClick={this.sortRatingAscending}></i></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      filterArr.map((movieObj) => (
                                            <tr>
                                                <td >
                                                    <img 
                                                    style={{ width: "6rem" }} 
                                                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} />
                                                    
                                                    </td>
                                                <th scope="row">{movieObj.title}</th>
                                                {/* this is for genre from genreIdObj */}
                                               
                                                {genreIdObj.genres.map((genreNameArr) => {
                                                    if (genreNameArr.id === movieObj.genre_ids[0]) {
                                                        return (<td>{genreNameArr.name}</td>)
                                                    }
                                                })}
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td>{<button type="button" class="btn btn-danger" onClick={()=>this.handelDanzerZone(movieObj)}>Danger</button>}</td>
                                            </tr>
                                        ))
                                    }
                             </tbody>
                            </table>
                        </div>
                        {/* pagination */}
                        {/* <div aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>

        )
    }

}

export default Favourite