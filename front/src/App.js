import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Singup";
import Login from "./components/Login";
import MoviePoster from "./components/MoviePoster";
import { Route, Routes } from "react-router";
import Card from "./components/Card";

function App() {
  return (
    <div>
      <h1 className="text-center mt-5 mb-5">TMDB MOVIES</h1>
      <Navbar />
      <Routes>
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/movieInfo" element={<Card />}></Route>//!falta completar
        <Route path="/users/signup" element={<Signup />}></Route>
        <Route path="/" element={<MoviePoster />}></Route>
      </Routes>
    </div>
  );
}

export default App;
