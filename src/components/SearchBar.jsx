import { useEffect, useState } from "react";

import { BASE_URL } from "../tools/constante.js";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [collection, setCollection] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        // Fetch collections from the backend
        axios.get(`${BASE_URL}/collections`)
            .then((response) => {
                setCollections(response.data.data.result);
            })
            .catch((error) => {
                console.error("There was an error fetching the collections!", error);
            });
    }, []);

    const handleSearch = () => {
        onSearch({
            query,
            collection,
            minPrice,
            maxPrice
        });
    };

    return (
        <div className="search-bar search-bar flex flex-col md:flex-row mt-14 sm:flex-col">
            <input
                type="text"
                placeholder="Search by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select value={collection} onChange={(e) => setCollection(e.target.value)}>
                <option value="">Select Collection</option>
                {collections.map((col) => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
