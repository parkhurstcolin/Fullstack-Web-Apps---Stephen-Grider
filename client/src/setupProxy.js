const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	if (process.env.NODE_ENV === "production") {
		app.use(
			["/api", "/auth/google"],

			createProxyMiddleware({
				target: "https://localhost",
			})
		);
	} else {
		app.use(
			["/api", "/auth/google"],

			createProxyMiddleware({
				target: "http://localhost:5000",
			})
		);
	}
};
