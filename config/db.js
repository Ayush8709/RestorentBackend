import mongoose from "mongoose";

const connactDb = async ()=>{
    try {
      await mongoose.connect(process.env.URL)
      console.log("Connacted to DataBase");
    } catch (error) {
        console.log("DataBase Not Connacted");
    }
}


export default connactDb;