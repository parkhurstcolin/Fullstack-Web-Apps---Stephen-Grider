if (process.env.NODE_ENV === "production") {
	const fs = require("fs");
	const http = require("http");
	const https = require("https");
}

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

//Declare location for server certificates
if (process.env.NODE_ENV === "production") {
	const httpsOptions = {
		cert: fs.readFileSync("./certs/xyServer.crt"),
		ca: fs.readFileSync("./certs/xyCorp-RootCA.crt"),
		key: fs.readFileSync("./certs/xyServer.key"),
	};
	const hostname = "emaily.xyz";
}

const app = express();

//Create server for http
if (process.env.NODE_ENV === "production") {
	const httpServer = http.createServer(app);
	const httpsServer = https.createServer(httpsOptions, app);

	//Redirect from http to https
	app.use((req, res, next) => {
		if (req.protocol === "http") {
			res.redirect(301, `https://${req.headers.host}${req.url}`);
		}
		next();
	});
}

//Length for cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

//Listening on ports 80 & 443
if (process.env.NODE_ENV === "production") {
	httpServer.listen(80, hostname);
	httpsServer.listen(443, hostname);
} else {
	//Dev environment
	const PORT = process.env.PORT || 5000;
	app.listen(PORT);
}
