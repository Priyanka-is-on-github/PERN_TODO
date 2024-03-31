 const express = require("express");
 const cors = require('cors')
 const app = express();
  

 const router = require("./routes/authroutes")

 const PORT = 3421; 
 //middlewares
  app.use(cors());
  app.use(express.json());

  //Routes
  app.use('/api/v1',router);

  
  
  
  

  app.listen(PORT,()=>{
    console.log("server is running at port number:", PORT);
  })
