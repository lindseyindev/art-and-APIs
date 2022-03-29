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
	const {
		id = '',
		artist_title = '',
		date_display = '',
		image_id = '',
		title = '',
		thumbnail = {},
	} = specificPainting;
	const { width = 400, height = 400, alt_text = '' } = thumbnail;
	if (specificPainting) {
		console.log(specificPainting);
		return (
			<div>
				<button type="click" onClick={(e) => handleComponentRender(e)}>
					Back to Search
				</button>
				<p>{`Painting ID: ${id}`}</p>
				<p>{`Artist: ${artist_title}`}</p>
				<p>{`Date Display: ${date_display}`}</p>
				<p>{`Image ID: ${image_id}`}</p>
				<p>{`Thumbnail Width: ${width}`}</p>
				<p>{`Thumbnail Height: ${height}`}</p>
				<p> {`Title: ${title}`}</p>
				<img
					alt={alt_text}
					height={imageAspectRatio(width, height)}
					src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
					width="100%"
				/>
			</div>
		);
	}
}
