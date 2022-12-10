const mongoose = require('mongoose')

 connectDB = async (database)=>{
try {
    await mongoose.connect(database)
    console.log('database connect successfully');
} catch (error) {
    console.log(error);
}
}
module.exports= connectDB