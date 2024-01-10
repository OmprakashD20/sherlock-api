require("dotenv-flow").config();

const express = require("express");
const cors = require("cors");

const { handleSuccess } = require("./utils/helper.util");

const app = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());

app.get("/", (req, res) => {
  handleSuccess(res, "Welcome to Sherlock API!!");
});

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
