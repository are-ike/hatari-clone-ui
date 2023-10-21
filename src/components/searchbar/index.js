import React from "react";

const SearchBar = ({ query, setQuery, placeholder }) => {
  return (
    <div className="flex gap-2 pl-4 border-none items-center bg-backg rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-4 border-none outline-none bg-backg text-body"
      />
    </div>
  );
};

export default SearchBar;
