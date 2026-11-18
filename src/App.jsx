/* ======================================================
    Lab 8 - App.jsx starter
====================================================== */

import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import MovieGrid from "./components/MovieGrid.jsx";

export default function App() {
    // TODO 3: Create state variables
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("Batman");
    const [watchlist, setWatchlist] = useState([]);

    const API_KEY = "2bf11ce1";

    const fetchMovies = async (query) => {
        // TODO 4: Set loading and clear errors
        setIsLoading(true);
        setError("");

        if (!API_KEY) {
            setMovies([]);
            setError("No API key. Please enter your OMDb API key.");
            setIsLoading(false);
            return;
        }

        try {
            const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            // TODO 5: Check API response
            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setMovies([]);
                setError(data.Error || "No movies found");
            }

        } catch (err) {
            // TODO 6: Handle errors
            setError("Failed to fetch movies.");
            setMovies([]);

        } finally {
            // TODO 7: Stop loading
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // TODO 8: Fetch movies when searchTerm changes
        fetchMovies(searchTerm);
    }, [searchTerm]);

    const handleSearch = (newSearchTerm) => {
        // TODO 9: Update searchTerm
        setSearchTerm(newSearchTerm);
    };

    const addToWatchlist = (movie) => {
        setWatchlist((prevWatchlist) => {
            
            const alreadyExists = prevWatchlist.some((item) => item.imdbID === movie.imdbID);

            if (alreadyExists) {
                return prevWatchlist;
            }
            return [...prevWatchlist, movie];
        });
    };

    return (
        <div className="page">
            <Header title="Movie Search" searchTerm={searchTerm} />

            {/* TODO 10: Render SearchBar */}
            <SearchBar onSearch={handleSearch} />

            <main className="panel">

                {/* TODO 11A: Display search results */}
                {isLoading ? (
                    <p className="status">Loading...</p>
                ) : error ? (
                    <p className="status error">{error}</p>
                ) : movies.length === 0 ? (
                    <p className="status">No movies found.</p>
                ) : (<MovieGrid movies={movies} addToWatchlist={addToWatchlist}/>
                )}

                {/* TODO 11B: Watchlist section */}
                <section className="watchlist">
                    <h2>My Watchlist</h2>

                    {watchlist.length === 0 ? (
                        <p>No movies in watchlist yet.</p>
                    ) : (
                        <div className="watchlist-grid">
                            {watchlist.map((movie) => (
                                <div className="watchlist-item" key={movie.imdbID}>
                                    <img
                                        src={movie.Poster}
                                        alt={movie.Title}
                                    />
                                    <h3>{movie.Title}</h3>
                                    <p>{movie.Year}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
}
