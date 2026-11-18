/* ======================================================
    Lab 8 - Header.jsx starter
====================================================== */

export default function Header({ title, searchTerm }) {
    /* TODO 12: Create the entire Header component. */

    return (
        <header className="header">
            <h1>{title}</h1>

            <p>
                Search for your favourite movies and add them to your watchlist.
            </p>

            <p>
                Currently searching for: <strong>{searchTerm}</strong>
            </p>
        </header>
    );
}