const express =require("express");
const connectDatabase = require("./Database/connectDB")
const Admin=require("./Models/Admin")
const cors=require("cors")
const Enquiry=require("./Models/Enquiry")
const bodyParser = require("body-parser");
connectDatabase()
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/signIn", (req, res) => {
    res.send('SignIn endpoint');
  });

  app.post("/signIn", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const check = await Admin.findOne({ email: email });
      if (check) {
        const check1=await Admin.findOne({password:password});
        if(check1){
        res.json("Exist");
      }
      else{
        res.json("NotExist");
      }
      } else {
        res.json("NotExist");
      }
    } catch (e) {
      res.json("NotExist");
    }
  });


  app.post("/signUp", async (req, res) => {
    const { email, password } = req.body;
  
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const check = await Admin.findOne({ email: email });
      if (check) {
        res.json("Exist");
      } else {
        res.json("NotExist");
        await Admin.insertMany([data]);
      }
    } catch (e) {
      res.json("NotExist");
    }
  });

  app.post("/contact", async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
  
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).send('All fields are required');
    }
  
    const newEnquiry = new Enquiry({
      fname: firstName,
      lname: lastName,
      email: email,
      message: message
    });
  
    try {
      await newEnquiry.save();
      res.status(200).send('Message saved successfully!');
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/enquiries', async (req, res) => {
    try {
      const enquiries = await Enquiry.find();
      res.json(enquiries);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
    

