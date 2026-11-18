/* ======================================================
    Lab 8 - SearchBar.jsx starter
====================================================== */

import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
    // TODO 13: Create local state
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO 14: Submit search if input isn't empty
        if (inputValue.trim() !== "") {
            onSearch(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            {/* TODO 15: Controlled input */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a movie title..."
            />

            <button type="submit" className="primary">
                Search Movies
            </button>
        </form>
    );
}