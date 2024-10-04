const { createProxyMiddleware } = require("http-proxy-middleware");
if (process.env.NODE_ENV === "production") {
	module.exports = function (app) {
		app.use(
			["/api", "/auth/google"],

			createProxyMiddleware({
				target: "https://localhost",
			})
		);
	};
} else {
	module.exports = function (app) {
		app.use(
			["/api", "/auth/google"],
			createProxyMiddleware({
				target: "http://localhost:5000",
			})
		);
	};
}
