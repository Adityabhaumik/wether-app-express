const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const app = express()
const partialsPath=path.join(__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')
const port =  process.env.PORT || 3000
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname,'../public')))
app.get('', (req , res) => {
    res.render('index',{
        titile:'WEATHER APP',
        author:'Aditya Bhaumik'
    })
})
app.get('/about', (req , res) => {
    res.render('about',{
        titile:'WEATHER APP',
        author:'Aditya Bhaumik'
    })
})

app.get('/help', (req , res) => {
    res.render('help',{
        titile:'WEATHER APP',
        author:'Aditya Bhaumik'
    })
})
app.get("/weather",(req,res) => {
    if(!req.query.address){
        res.send('no addressprovided')
    }
    else{
        const add =req.query.address
        geocode(add,(error,{latitude,longitude,location}) =>{
            if(error)
            {
                return res.send(error)
            }
            // console.log('Error',error);
            // console.log('data',data)
            forcast(latitude, longitude, (error , forcastdata)=>{
                if(error){
                    return console.log(error)
                }
               res.send({
                   forcast:forcastdata,
                   location,
                   address:add
               })
            })
        }
        )
    }
 
})
app.get("/help/*",(req , res) => {
    res.render('error',{
        titile: 'Help Article Not Found ',
        author:'Aditya Bhaumik'    
    })
})
app.get("*",(req , res) => {
    res.render('error',{
        titile: 'Error ',
        author:'Aditya Bhaumik'    
    })
})
app.listen(port, () => console.log('Example app listening on port ' + port+'!'))