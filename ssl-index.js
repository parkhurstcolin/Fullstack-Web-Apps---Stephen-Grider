const fs = require("fs");
const http = require("http");
const https = require("https");

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
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

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

//Declare location for server certificates
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const httpsOptions = {
		cert: fs.readFileSync(keys.cert),
		ca: fs.readFileSync(keys.ca),
		key: fs.readFileSync(keys.key),
	};

	const hostname = "emaily.xyz";
	const path = require("path");

	//Create server for http
	const httpServer = http.createServer(app);
	const httpsServer = https.createServer(httpsOptions, app);

	//Redirect from http to https
	//	app.set((req, res, next) => {
	//		next();
	//	});

	app.get("*", (req, res) => {
		//	if (req.protocol === "http") {
		//		res.redirect(301, `https://${req.headers.host}${req.url}`);
		//	}
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});

	//Listening on ports 80 & 443
	//httpServer.listen(80, hostname);
	//httpsServer.listen(443, hostname);
}
	//Dev environment
	const PORT = process.env.PORT || 5000;
	app.listen(PORT);

