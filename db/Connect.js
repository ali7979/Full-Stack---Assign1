const mongoose=require("mongoose");
uri="mongodb+srv://zoheb:zoheb7979@zohebdb.z434ks5.mongodb.net/Ass1?retryWrites=true&w=majority";
const Connect=async()=> {
    try {
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("DB Connected");
      } catch (error) {
        console.log(error);
      }
    
};
module.exports =Connect;