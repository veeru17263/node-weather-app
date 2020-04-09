const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// define paths for express config
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../template/views')
const partialspath = path.join(__dirname,'../template/partials')

//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Veeru'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Veeru'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Veeru',
        helptext: 'this is helpful text'
    })
})

app.get('/weather',(req,res) => {
    
    if(!req.query.address)
    {
        return res.send({
            error: 'You have to provide address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

         forecast(latitude,longitude, (error, forecastdata) => {

           if(error){
               return res.send({
                   error
               })
           }

           res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
           })
        //    console.log(location)
        //    console.log('Data: ', forecastdata)
         })
 })
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'haryana',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Veeru',
        errormessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Veeru',
        errormessage: 'Page not found'
    })
})

app.listen(3000,() => {
    console.log('server it set up and running')
})