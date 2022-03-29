import './ImageDetails.css';

import { useState } from 'react';

/*
] In `ImageDetailsPage`, render
  - a back button that allows the user to return to their search, and
  - the artwork whose title they just clicked on*/

export function ImageDetails({
	handleComponentRender,
	artworkData,
	imageAspectRatio,
	specificPainting,
}) {
	if (specificPainting) {
		console.log(specificPainting);
		return (
			<div>
				<button type="click" onClick={(e) => handleComponentRender(e)}>
					Back to Search
				</button>
				<p>{specificPainting.id}</p>
				<p>{specificPainting.artist_title}</p>
				<p>{specificPainting.date_display}</p>
				<p>{specificPainting.image_id}</p>
				<p>{specificPainting.thumbnail.width}</p>
				<p>{specificPainting.thumbnail.height}</p>
				<p>{specificPainting.title}</p>
				<img
					alt={specificPainting.thumbnail.alt_text}
					height={imageAspectRatio(
						specificPainting.thumbnail.width,
						specificPainting.thumbnail.height
					)}
					src={`https://www.artic.edu/iiif/2/${specificPainting.image_id}/full/843,/0/default.jpg`}
					width="100%"
				/>
			</div>
		);
	}
}
