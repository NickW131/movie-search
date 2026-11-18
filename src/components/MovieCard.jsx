/* ======================================================
    Lab 8 - MovieCard.jsx starter
====================================================== */



import { useState } from "react";

export default function MovieCard({ movie, addToWatchlist }) {
    const [imageError, setImageError] = useState(false);

    const posterAvailable =  movie.Poster && movie.Poster !== "N/A" && !imageError;

    return (
        <article className="card">
            {posterAvailable ? (
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="noPoster">
                    No Poster Available
                </div>
            )}

            <div className="cardContent">
                <h3>{movie.Title}</h3>

                <p>
                    {movie.Year} – {movie.Type}
                </p>

                <button onClick={() => addToWatchlist(movie)}>
                    Add to Watchlist
                </button>
            </div>
        </article>
    );
}

