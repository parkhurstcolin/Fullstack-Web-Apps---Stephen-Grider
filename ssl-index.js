const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");

const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const httpsOptions = {
	cert: fs.readFileSync("~/certs/xyServer.crt"),
	ca: fs.copyFileSync("~/certs/xyServer.ca-bundle"),
	key: fs.readFileSync("~/certs/xyServer.key"),
};

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

app.use((req, res, next) => {
	if (req.protocol === "http") {
		res.redirect(301, `https://${req.headers.host}${req.url}`);
	}
	next();
});

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

// const sslOptions = https.createServer({}, app);

httpServer.listen(httpPort, hostname);
httpsServer.listen(httpsPort, hostname);
