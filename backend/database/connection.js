import mongoose from "mongoose";

export const connection = async () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOB_PORTAL"

    }).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(`Database connection error: ${err}`);
    });
}
