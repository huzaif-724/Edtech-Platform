const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/user");
const database = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const courseRoutes = require("./routes/course")
const paymentRoutes = require("./routes/payment");

const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
	  origin: ["http://localhost:3000", "https://smartlearn.netlify.app"],
	  credentials: true,
	})
  );
  

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

database();
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});