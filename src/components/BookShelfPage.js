import React, { useEffect, useState } from 'react';
import './BookSearch.css';
const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf') || '[]');
    setBookshelf(storedBookshelf);
  }, []);

  const removeFromBookshelf = (book) => {
    const updatedBookshelf = bookshelf.filter((b) => b.key !== book.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div>
      <h1 className='project-name centered' style={{ marginBottom: '3rem' }}>
        MY <span className='coloured'>BOOKSHELF</span>
      </h1>
      <div className='bookshelf-results'>
        {bookshelf.map((book) => (
          <div key={book.key} className='card'>
            <h2>{book.title}</h2>
            {book.author_name && <p><strong>Author: </strong>{book.author_name[0]}</p>}
            <p><strong>Edition Count: </strong>{book.edition_count}</p>
            <button className="remove-button" onClick={() => removeFromBookshelf(book)}>Remove from Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookshelfPage;
