module.exports = {
	//NodeJS Keys
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	googleRedirectURI: process.env.GOOGLE_REDIRECT_URI,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	sendGridKey: process.env.sendGridKey,

	//Server Keys
	cert: process.env.WEB_CERT,
	ca: process.env.CA_CERT,
	key: process.env.WEB_KEY,

	//REACT Keys
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};

