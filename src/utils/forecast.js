const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c46aa909cf9a7c00c44f2683f4310571&query=' + latitude + ',' + longitude
    
    request({url,json:true},(error, {body}) => {
        if(error)
        {
            callback('Unable to connect with Weatherstack',undefined)
        }
        else if(body.error)
        {
            callback('Unable to forecast for this coordinates',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + " It is currently " + body.current.temperature + " degrees out " + "There is a " + body.current.precip + "% rain chance")
        }
    })
  }

  module.exports = forecast