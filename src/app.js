const express = require("express");
const dotenv = require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const colors = require("colors");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

//MONGOOSE
mongoose.connect(process.env.DB_URI, () => {
  console.log("Database Connected".cyan.underline);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App Running at Port: ${PORT}`);
});
