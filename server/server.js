const express = require("express");
const router = require("./routes/index");
const verifyToken = require("./middleware/verifyToken");
const connectDb = require("./db");

const app = express();

app.use(express.json());
app.use(router);

//global error

app.use((err, req, res, next) => {
  console.log(err);

  const message = err.message ? err.message : " server error occured";

  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});

//database connection
connectDb(
  "mongodb+srv://tanvirimruet:7ScNL1deeA4BpMX4@cluster0.6b6su1i.mongodb.net/"
)
  .then(() => {
    console.log("Database connected successfully");

    app.listen("8080", () => {
      console.log("App is running at port 8080");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

//private route
app.get("/private", verifyToken, async (req, res) => {
  console.log("i am user", req.user);
  return res.status(200).json({ message: "I am a private route" });
});
