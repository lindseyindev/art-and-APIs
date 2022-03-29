# 🗒️ Let’s look at some art

Your team has been developing an app that allows users to search the Chicago Institute of Art (CIOA)'s API for public domain artwork. You've inherited some code from a teammate – your job is to finish the rest of the tasks your team has agreed on!

To fulfill the remaining acceptance criteria for this project, you will need to make requests to _two_ endpoints provided by the COIA. **We have provided some guidance about using the CIOA API.** See the “Working with the API” section.

## Local development setup

In order to work on the project, you'll need to install its dependencies. `cd` into this folder and run the following command in your terminal:

```bash
npm ci
```

Now, to develop the app locally, run:

```bash
npm start
```

To run your tests, run:

```bash
npm test
```

## Acceptance criteria

Your team has agreed on the following requirements for the app's MVP (minimum viable product). Your teammate has implemented a couple of these criteria already. Start with `./src/components/App.jsx` to familiarize yourself with their work, then build on top of it. You're gonna do great!

- [x] Create a `searchArtworks` for making GET requests to `/search/artworks/`. See `src/utils/api.js`
  - [x] Request a local copy of data in `searchArtworks` to avoid making too many requests to the COIA `/artworks/search/` endpoint
  - [ ] **When the UI is minimally complete**, ensure that `searchArtworks` makes requests to the CIOA `/artworks/search/` endpoint, as described in "Working with the API"
- [x] Create a `SearchForm` component that will allow the user to perform a search. See `src/components/SearchForm.jsx`
- [x ] Fix a known bug: the whole app refreshes when `SearchForm` is submitted
- [ x] Create two views (e.g., `SearchPage` and `ImageDetailsPage`)
- In `SearchPage`, render
  - the `SearchForm` component and
  - a list of results including _the name of the piece_ and _the artist who created the piece_. When a result is clicked, the user should see `ImageDetailsPage`.
- [ x] In `ImageDetailsPage`, render
  - a back button that allows the user to return to their search, and
  - the artwork whose title they just clicked on

## 💻 Working with the API

CIOA maintains two distinct APIs: one for requesting data from its catalog, and one for requesting the images from the catalog. These APIs have some dense documentation; we’ve outlined the things you should know.

**⚠️ Read this section carefully.** You will need data from the catalog in order to request the images you want to show to the user!

### Requesting data from the catalog

You’ll make requests to the `/artworks/search/` endpoint provided by the COIA. You can build a search with a URL like the following:

> `https://api.artic.edu/api/v1/artworks/search?q={USER_QUERY}&query[term][is_public_domain]=true&fields=artist_title,id,date_display,image_id,thumbnail.alt_text,thumbnail.width,thumbnail.height,title`

These URLs are quite long, but you don't need to worry about exactly what each part means. You'll need to replace `{USER_QUERY}` with the thing your user searched for in the catalog. If your user searches for “cats”, your request url becomes:

> `https://api.artic.edu/api/v1/artworks/search?q=cats&query[term][is_public_domain]=true&fields=artist_title,id,date_display,image_id,thumbnail.alt_text,thumbnail.width,thumbnail.height,title`.

Try it our for yourself: [open the “cats” query in your browser](https://api.artic.edu/api/v1/artworks/search?q=cats&query[term][is_public_domain]=true&fields=artist_title,id,date_display,image_id,thumbnail.alt_text,thumbnail.width,thumbnail.height,title).

#### Working with data returned from the catalog

Requests to the `/artworks/seearch/` endpoint return **a JSON object**. This object has _a lot_ of information. You should focus on the `data` property, which is an array of objects. Each object is shaped as follows:

[NB: this would be easier to parse as a table; I just don’t want to bother with the table markup right now]

- `artist_title`: a string indicating the known artist of the piece
- `date_display`: a string indicating the known production date of the piece
- `id`: a number representing the item’s unique id
- `image_id`: a string referencing the id of the full image for this catalog item
- `thumbnail`: an object with the following properties: `alt_text`, `width`, and `height`
- `title`: a string indicating the title of the piece

### 🖼️ Requesting an image

The COIA provides an endpoint dedicated to serving images. You can make requests from it as follows:

```
https://www.artic.edu/iiif/2/{IMAGE_ID}/full/843,/0/default.jpg
```

You should replace `{IMAGE_ID}` with an image ID from the data you retrieve from the `/artworks/search/` endpoint. For instance, you can view Georges Seurat’s _La grande jette_ at the following URL:

```
https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg
```

You can also [open that image in your browser](https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg), if you’d like!
