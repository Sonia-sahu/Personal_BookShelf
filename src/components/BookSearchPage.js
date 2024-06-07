import React, { useEffect, useState } from "react";
import axios from "axios";
import './BookSearch.css';

const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
          setSearchResults(response.data.docs);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [searchQuery]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf') || '[]');
    setBookshelf(storedBookshelf);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const isBookInBookshelf = (book) => {
    return bookshelf.find((sbook) => sbook.key === book.key);
  };

  const handleAddToBookshelf = (book) => {
    if (!isBookInBookshelf(book)) {
      const updatedBookshelf = [...bookshelf, book];
      setBookshelf(updatedBookshelf);
      localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    }
  };

  const handleSortByTitle = () => {
    setSearchResults([...searchResults].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const handleSortByAuthor = () => {
    setSearchResults([...searchResults].sort((a, b) => a.author_name[0].localeCompare(b.author_name[0])));
  };

  return (
    <div>
      <div className='nav'>
        <h1 className='project-name'>MY BOOKSHELF</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search for a book.."
          className='input-search'
        />
        <button onClick={() => window.location.href = '/bookshelf'} className='search-button'>View Bookshelf</button>
      </div>

      {loading ? (
        <p>Searching...</p>
      ) : (
        <div className='results'>
          <div className="actions">
            <button onClick={handleSortByTitle}>Sort by Title</button>
            <button onClick={handleSortByAuthor}>Sort by Author</button>
          </div>
          {searchResults.map((book) => (
            <div key={book.key} className='card'>
              <h2>{book.title}</h2>
              {book.author_name && <p><strong>Author: </strong>{book.author_name[0]}</p>}
              <p><strong>Edition Count: </strong>{book.edition_count}</p>
              <button
                onClick={() => handleAddToBookshelf(book)}
                className={isBookInBookshelf(book) ? 'already-in-bookshelf' : 'add-to-bookshelf'}
              >
                {isBookInBookshelf(book) ? 'Already in the Bookshelf' : 'Add to Bookshelf'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearchPage;
