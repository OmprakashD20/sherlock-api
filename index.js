require("dotenv-flow").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Sherlock API",
  });
});

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
