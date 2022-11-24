const mongoose =  require("mongoose")


exports.connectDB = async () => {
     try {
      // await mongoose.connect(process.env.MONGO_URI)
      await mongoose.connect('mongodb://localhost:27017/hng_recipe')

       console.log(`MongoDB Connected`)
      
     } catch (error) {
        console.log(error)

     }
}