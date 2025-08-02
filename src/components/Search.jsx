import React, { useEffect, useState } from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  const [results, setResults] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  
  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // 👇 If input is empty, clear previous results
    if (!debouncedTerm.trim()) {
      setResults([]);
      return;
    }

    const fetchMovies = async () => {
      console.log('Searching for:', debouncedTerm);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=f6b9a1a6&s=${debouncedTerm}`
        );
        const data = await res.json();
        console.log('OMDb response:', data);
        setResults(data.Search || []);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchMovies();
  }, [debouncedTerm]);

  return (
    <div className='search'>
      <div>
        <img src='/search.png' alt='Search' />
        <input
          type='text'
          placeholder='Search through thousands of movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className='mt-4 space-y-4'>
        {results.map((movie) => (
          <li key={movie.imdbID} className='flex items-center gap-4'>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.jpg';
              }}
              alt={movie.Title}
              className='w-16 h-24 object-cover rounded-md'
            />
            <div>
              <h3 className='text-white font-semibold'>{movie.Title}</h3>
              <p className='text-sm text-gray-400'>{movie.Year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
