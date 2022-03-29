import './App.css';

import { searchArtworks } from '../utils/api';
import { SearchForm } from './SearchForm';
import { ImageDetails } from './ImageDetails';
import { useState } from 'react';

/*
- `artist_title`: a string indicating the known artist of the piece
- `date_display`: a string indicating the known production date of the piece
- `id`: a number representing the item’s unique id
- `image_id`: a string referencing the id of the full image for this catalog item
- `thumbnail`: an object with the following properties: `alt_text`, `width`, and `height`
- `title`: a string indicating the title of the piece */

export function App() {
	const [artworkData, setArtworkData] = useState([]);
	const [showSearch, setShowSearch] = useState(true);
	const [specificPainting, setSpecificPainting] = useState({});

	function onSearchSubmit(query) {
		// Search for the users's query, then log the results
		// to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the COIA API! Once we've built out
		// our UI, we need to make real requests to the API!
		// @see: ./src/uitls/api.js
		searchArtworks(query)
			.then((res) => setArtworkData(res.data))
			.catch((err) => console.error(err));
	}

	function handleComponentRender(e, id) {
		e.preventDefault();
		const matchingArtwork = artworkData.find((piece) => piece.id === id);
		setSpecificPainting(matchingArtwork);
		setShowSearch(!showSearch);
	}

	function imageAspectRatio(width, height) {
		const originalAspectRatio = width / height;
		const maxWidth = 400;
		const maxHeight = maxWidth / originalAspectRatio;
		return maxHeight;
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			{showSearch ? (
				<>
					<SearchForm onSearchSubmit={onSearchSubmit} />
					{artworkData ? (
						<div>
							<ul>
								{artworkData.map((item, i) => {
									//console.log(item);
									const {
										id = '',
										artist_title = '',
										date_display = '',
										image_id = '',
										title = '',
										thumbnail = {},
									} = item;
									const {
										width = 400,
										height = 400,
										alt_text = '',
									} = thumbnail;
									return (
										<li key={item.id}>
											<button
												title="image details"
												type="click"
												onClick={(e) => handleComponentRender(e, item.id)}
											>
												<p>{id}</p>
												<p>{artist_title}</p>
												<p>{date_display}</p>
												<p>{image_id}</p>
												<p>{width}</p>
												<p>{height}</p>
												<p>{title}</p>
												<img
													alt={alt_text}
													height={imageAspectRatio(width, height)}
													src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
													width="100%"
												/>
											</button>
										</li>
									);
								})}
							</ul>
						</div>
					) : null}
				</>
			) : (
				<ImageDetails
					artworkData={artworkData}
					handleComponentRender={handleComponentRender}
					imageAspectRatio={imageAspectRatio}
					specificPainting={specificPainting}
				/>
			)}
		</div>
	);
}
