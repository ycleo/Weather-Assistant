const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// console.log(__dirname)

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Leo Lee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Leo Lee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Feel free to reach out if any problem: leoyclee@gmail.com',
        title: 'Help',
        name: 'Leo Lee'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })  //error: error
        } 

        weather(latitude, longitude, (error, weatherData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                weather: weatherData,
                location, 
                address: req.query.address
            })
            
        })
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Leo Lee',
        target: 'Help article'})
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404', 
        name: 'Leo Lee',
        target: 'Page'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})