// Aqui, seria feito os links necessários para puxar a renderização dos filmes
// E para cada resultado dos filmes, seria feito a renderização particular.
//Porém no meu rendermovie, os links estão dentro do arquivo
// É necessário separar os fetches.

import React, { useState, useEffect } from "react";
import apiKey from "../assets/environment/apiKey";
async  function SearchMovie(currentPage) {
    try {
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey()}&language=en-US&page=${currentPage}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export default SearchMovie
