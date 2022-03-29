import './SearchForm.css';

import { useState } from 'react';

//- a list of results including _the name of the piece_ and _the artist who created the piece_. When a result is clicked, the user should see `ImageDetailsPage`.

export function SearchForm({ onSearchSubmit }) {
	const [query, setQuery] = useState('');

	function handleInputChange(evt) {
		setQuery(evt.target.value);
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		onSearchSubmit(query);
	}

	return (
		<>
			<form className="Form" role="search" onSubmit={handleFormSubmit}>
				<label className="label" htmlFor="search-field">
					Search for some art
				</label>
				<input
					className="input"
					id="search-field"
					inputMode="search"
					name="query"
					type="text"
					value={query}
					onChange={handleInputChange}
				/>
				<button className="button" type="submit">
					Search
				</button>
			</form>
		</>
	);
}
