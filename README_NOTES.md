# Xavier's Notes
## Project solution

For my solution I started with the API. I created 2 different endpoints with different functionality:
- `/todos`: This endpoint has the `GET`, `POST`, and `PUT` actions for getting the list of items, adding an item, and updating an item that includes editing the name and marking as complete/uncomplete.
- `/sort`: This endpoint just sorts the list of the items

For the front-end I started with building out the API calls for each of the different endpoints and their functionality. I then moved onto saving a new item to the list of todos. Then I moved onto sorting, which uses a up/down arrow on each item to reorder the item in the list. It also takes into account the items at the beginning or end of the list so they can't be moved **outside** the list array accidentally. I then went onto marking an item as complete. The user can mark the item as uncomplete also. Finally I finished off with editing an item. The user can click the item name and it will turn the field into an editable field with save/cancel buttons. Also the sort and checked buttons are disabled during editing.

## What else I would do 🤔

I would probably flesh out the API more first if I had more time. I would include clearer, more concise errors and handle more edge cases on each of the endpoints functionality. As for the UI I would also try and handle more edge cases and display the appropriate errors such as duplicates or bad input. I would also like to display some loading component while the UI loads for the first time or when adding/editing an item. All in all it was a fun application to build!