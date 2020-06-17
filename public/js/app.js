console.log("this is client side java script")

const wetherform = document.querySelector('form')
const userlocation = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


wetherform.addEventListener('submit', (e) =>{
    e.preventDefault()
        fetch('http://api.weatherstack.com/current?access_key=92c2da8d24bb7097b0f9fa6595eaebcb&query='+userlocation.value).then((response) =>{
    response.json().then((data)=>{
        if(!data){
            message1.textContent='Invalid Location'
            connsole.log('error')
        }
        else{
            message1.textContent='Location: '+data.location.region
            message2.textContent='Temparature: '+data.current.temperature+'C'
            
            console.log(data)
        }
       
    })
})
    
   
})