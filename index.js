require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// DB connection
//mongoose.set("useNewUrlParser", true);
//mongoose.set("useFindAndModify", false);
//mongoose.set("useCreateIndex", true);
//mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser: true},{useFindAndModify: false},{useCreateIndex: true},{useUnifiedTopology: true});
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("there is error in ", err);
});

//import route middlewares
const authRoutes = require("./routes/auth.routes");
const invoiceRoutes = require("./routes/invoice.routes");
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes middlewares
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use(express.static("./client/build"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"));
});

//server listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`this server is running on port ${port}`);
});