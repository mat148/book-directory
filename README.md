# Book directory
## The plan so far
- Search good reads via their API
- Show a list of your books - GET
- Save books to your "library" - POST
- Update books "tags?" - PUT
- Delete books - DELETE

## Decisions
- ~~I'm not going to deal with a database at the moment.~~
- Users "Library" will be saved via Redis and will be deleted within 24 hours.
- Secrets will be saved via a .env file since this the goodreads API is free and won't cause harm to me if something happens.
- As per Goodreads Tos I'll need to display the GoodReads logo/name where ever the data is used.
- Hosting will be on Heroku
- Need to explore creating the background image with the [canvas module](https://flaviocopes.com/canvas-node-generate-image/)
- Explore recomending books based on users book selection
    - Will need to filter out Goodreads tags to find the most relevant ones.

##To-Do
- ~~Setup project~~
- ~~Homepage && Search page route~~
- ~~Search input~~
- Build API search query
- Display search results on search page
- Add Goodreads logo to search results page
- Research Redis
- Save user selection to Redis - POST
- Book library page and route
- Show book list - GET
- Add a tag to a book, update Redis - PUT
- Delete book, update Redis - DELETE
- Create background image with Canvas module
- Migrate to Heroku

## License
[MIT](https://choosealicense.com/licenses/mit/)