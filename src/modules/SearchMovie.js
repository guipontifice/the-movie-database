// Aqui, seria feito os links necessários para puxar a renderização dos filmes
// E para cada resultado dos filmes, seria feito a renderização particular.
//Porém no meu rendermovie, os links estão dentro do arquivo
// É necessário separar os fetches.

import React, { useState, useEffect } from "react";
import apiKey from "../assets/environment/apiKey";
import handleSubmit from "../pages/Header";
async function SearchMovie(currentPage) {
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
async function SearchTitle(movieTitle) {
    console.log("Search Title:", movieTitle);
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey()}&query=${movieTitle}&language=en-US&page=1`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API URL:", url);
        console.log("API Response:", data);

        // Check the structure of data.results
        if (!data.results || !Array.isArray(data.results)) {
            console.error("Invalid results structure:", data.results);

            throw new Error("Invalid results structure");
        }
        console.log('Data results:', data.results)
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export { SearchMovie, SearchTitle }
