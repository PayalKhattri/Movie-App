const express=require('express')
const request=require('request')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
//middlewares
//ejs templating language
app.set("view engine","ejs")
app.use('/public',express.static('public'))
//routing

app.get('/dummy',(req,res)=>{
    res.render('dummy')
})

app.get('/',(req,res)=>{
   res.render('home')
})

app.get('/about',(req,res)=>{
    res.send('About Page')
})

app.get('/result',(req,res)=>{
    //res.send(`You searched for ${req.query.movieName}`)
    //const url=`http://www.omdbapi.com/?apikey={process.env.API_KEY}&s=${req.query.movieName}`
    const url=`http://www.omdbapi.com/?apikey=ff73c474&s=${req.query.movieName}`
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            //res.send(data)
            res.render('result',{moviesDump: data})

        }
        else{
            res.send('wrong')
        }
    })
})

app.get('/result/:id',(req,res)=>{
    
    const url=`http://www.omdbapi.com/?apikey=ff73c474&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
          //  res.send(data)
            res.render('detail',{data: data})

        }
        else{
            res.send('wrong')
        }
    })
})


app.get('*',(req,res) =>{
    res.send('404 not found')
})
app.listen(3000,()=>{
    console.log('Server Started')
})