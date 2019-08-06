# Record Collector

### This application allows one to easily grab the estimated price of a vinyl LP and tally up the total value of their record collection.

**Front-end** (/client) uses HTML and Vanilla JavaScript. It details a list of records, along with their associated prices and album art, and the total value of the records that have been added to the list.

**TO DO**:
* Add Styling
* Error handling for invalid responses returned to fetch (currently only seen when there are no Discog search results for the album name that is used as input)
* Form control (ensure text field is not empty before allowing user to 'add' record to their stash)
* Ability to remove records from 'My Stash'
* Move 'Total' to top of 'My Stash' section
* Convert to use Vue or React

**Back-end** (/server) uses Flask to serve a REST API. Docker is also utilizted. A user enters text into the front-end and clicks "Add". At this point the text is sent to the Flask server, which uses the value to construct a search within the Discogs website (https://www.discogs.com/). The album art and price of the first result is scraped using Beautiful Soup and returned back to the front-end, where it is presented to the user.

**TO DO**:
* ~~Bind workspace contents to Docker container for easier development~~
* ~~Configure Flask to automatically restart upon code changes for easier development~~
* Add user accounts so that users can save their collections, see the collections of others in order to initiate trades or    transactions (this of course may need to be broken out into a separate solution)
* Be more intuitive about results that are returned (do not simply return the first result from the Discogs search)
* Add error handling and proper HTTP Response codes