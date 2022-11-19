const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
const { connectDB } = require('./config/db')




const app = express()

dotenv.config();
app.use(express.json());
app.use(cors())

app.use(errorHandler)
app.use(notFound)



// Routes imports
const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/RecipeRoute')


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


