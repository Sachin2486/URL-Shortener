const express = require('express');
const urlRoute = require('./routes/url')
const {connectToMongoDb} = require('./connect')
const URL = require('./models/url')

const app = express();
const PORT = 8001;

connectToMongoDb('mongodb://localhost:27017/short-url').
then(()=> console.log("MongoDB Is Connected")
);

app.use(express.json())

app.get('/:shortId', async(req,res) => {

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
     {
        shortId
     } ,
     {
        $push: {
            visitHistory:{

                timestamp : Date.now(),
            } 
        },  
     }
    );
    res.redirect(entry.redirectURL);
})

app.use("/url", urlRoute);
app.listen( PORT , () => console.log('Server is Listening'));