import React from "react";
import SwapiService from "../servises/swapiServis";

const swapiService = new SwapiService();
const GenreContext = React.createContext(null);

// swapiService.getResponseGenreMovieDB();

export default GenreContext;
