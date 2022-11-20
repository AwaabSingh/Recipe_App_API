const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
const { connectDB } = require('./config/db')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

//options object for swaggerjs
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "recipe Api",
      version: "1.0.0",
      description: "An api for printing recipes App"
    },
    servers: [
      {
        //update to production url
        url: 'https://recipe-app-42aq.onrender.com'
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options)
 

const app = express()

//setting up swagger doc
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs))




dotenv.config();
app.use(express.json());
app.use(cors())

app.use(errorHandler)
app.use(notFound)



// Routes imports
const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoute')


// Routes configurations
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/recipe', recipeRoutes)

// Db connectio 
connectDB()
// morgan logging configuration
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 8000

app.listen(PORT , () => {
     console.log(`Server running on port ${PORT}`)
})


