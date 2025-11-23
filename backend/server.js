const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const linkRouter=require('./routes/linkRouter')
const cors=require('cors')
const Links = require('./models/Link')



const app=express()
dotenv.config()

// cors
app.use(cors())

// body parser 
app.use(express.json())


// mongoose connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected To MongoDB')
})
.catch((err)=>{
    console.log('Error Occured')
})



// routes
app.use('/api',linkRouter)

app.get('/healthz', (req, res) => {
    let startTime = new Date();
  const uptime = new Date() - startTime;
  res.json({
    status: 'OK',
    uptime_seconds: Math.floor(uptime / 1000),
    timestamp: new Date().toISOString()
  });
});


app.get('/:code', async (req, res) => {
  const { code } = req.params;

  const link = await Links.findOne({ shortCode: code });
  if (!link) return res.status(404).send('Not Found');

  link.clicks += 1;
  link.lastClicked = new Date();
  await link.save();

  res.redirect(302, link.originalUrl);
});


app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
})