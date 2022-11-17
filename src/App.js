import "./App.css";
import MoviesList from "./component/MoviesList";
import NavBar from "./component/NavBar";
import Banner from './component/Banner'
import Favourite from "./component/Favourite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<><Banner/> <MoviesList/></>}/>
         <Route path="/favourite" element={<Favourite />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
