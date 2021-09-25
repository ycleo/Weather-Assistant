const request = require('request')

const weather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_API_TOKEN + '&query=' + lat + ',' + long + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service...', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, "Weather conditon: " + body.current.weather_descriptions[0] +
                ". The current temperature is " + body.current.temperature +
                " degrees. The feelslike temperature is " + body.current.feelslike  + 
                " degrees. The humidity is " + body.current.humidity + "%.")
        }
    })

}

module.exports = weather