import "./SearchBar.css";
import {useEffect, useState} from "react";
import MagnifyingGlassIcon from "../../assets/icons/magnifying-glass.svg";


function SearchBar({ value = '', onSearch}) {
    const [searchQuery, setSearchQuery] = useState( value);

    useEffect(() => {
        setSearchQuery(value);
    }, [value]);

    function handleSearchQueryChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    }

    return (
        <div className="search-bar-container">
            <form className="search-bar" id="search-form" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="search-bar-input"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
                <button
                    type='submit'
                    className='search-bar-button'
                >
                    <img src={MagnifyingGlassIcon} alt="Search" className='magnifying-glass-icon'/>
                </button>
            </form>
        </div>
    )
}



export default SearchBar;