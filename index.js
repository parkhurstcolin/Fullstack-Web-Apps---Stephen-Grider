//Import libraries for SSL
const fs = require("fs");
const http = require("http");
const https = require("https");

//Import Mongoose for Database
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

//Import Passport for Authentication
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

//Length for cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);

//PassportJS Initializaiton
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//API Routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

//SSL Certificates & Production Environment
if (process.env.NODE_ENV === "production") {
	const path = require("path");
	const httpsOptions = {
		cert: fs.readFileSync(keys.cert),
		ca: fs.readFileSync(keys.ca),
		key: fs.readFileSync(keys.key),
	};

	//Serve up ReactAPP
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});

	//Listen for SSL
	const httpsServer = https.createServer(httpsOptions, app);
	httpsServer.listen(443);
}

//Development Environment
const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);
httpServer.listen(PORT);
