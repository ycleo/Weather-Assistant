const request = require('request')

const weather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ef03c59669f6ae44110727e011c4e6cf&query=' + lat + ',' + long + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service...', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, "Weather conditon: " + body.current.weather_descriptions[0] +
                ". The current temperature is " + body.current.temperature +
                ". The feelslike temperature is " + body.current.feelslike  + '.')
        }
    })

}

module.exports = weather