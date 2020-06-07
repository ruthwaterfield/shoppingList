const express = require('express')
const bodyParser = require('body-parser')

var app = express()
app.set('port', process.env.PORT || 8080)

// Use the body-parser body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./queries')

// Express routes for the HTTP 'GET' methods
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
app.get('/sectionPotentialItems/:sectionId', db.getPotentialItemsForSection)
app.get('/sectionRequiredItems/:sectionId', db.getRequiredItemsForSection)
app.get('/listItem/:itemId', db.getListItem)


// Express routes for the HTTP 'POST' methods
app.post('/listItem/add', db.addListItem)
app.post('/listItem/edit/:itemId', db.editListItem)

// Set a port for the app to listen on
app.listen(app.settings.port, function () {
    console.log('Server is running on Port 8080. Press CTRL+C to stop server.')
    })
 