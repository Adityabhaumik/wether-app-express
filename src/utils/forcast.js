const request = require('request')
const forcast=(latitude ,longitude, callback )=>
    {
        const url = 'http://api.weatherstack.com/current?access_key=92c2da8d24bb7097b0f9fa6595eaebcb&query='+latitude+','+longitude

        request({url:url,json:true},(error,response)=>{

            if(error){
                callback('Unable to connect to location services!', undefined)
            }
            else if(response.body.error){
                callback('Unable to find  location services!', undefined)
            }
            else{
                callback(undefined,response.body.current)
            }
            
            })
    }
    module.exports=forcast