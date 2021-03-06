const mongoose = require("mongoose");
const  DB_LINK = process.env.DB_LINK;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(
    DB_LINK,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((db) => {
    console.log("Connected to db !!!");
  });

let userSchema = new mongoose.Schema({
  name : {
    type:String,
    required:true
  },
  email : {
    type:String ,
    required:true,
    unique:true
  },
  password:{
    type:String,
    minlength:[6 , "Password must be greater than 6 characters"],
    required:true
  } ,
  confirmPassword:{
    type:String,
    minlength:[6 , "Password must be greater than 6 characters"],
    validate : {
      validator: function(){
        return this.password == this.confirmPassword;
      } ,
      message:"Password didn't matched !!"
    }
  },
  role:{
    type:String,
    default:"user"
  },
  pImage:{
    type:String,
    default:"/Images/Avatar07.png"
  },
  phone:{
      type:String,
      required:true
  },
  orgName:{
      type:String,
      required:true
  },
  Designation:{
      type:String,
      required:true
  }
 
})

userSchema.pre("save" , function(){
  this.confirmPassword = undefined;
})

const userModel = mongoose.model("userscollection" , userSchema);
module.exports = userModel;