const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
    captchaSiteKey: process.env.NEXT_CAPTCHA_SITE_KEY,
    captchaSecretKey: process.env.NEXT_CAPTCHA_SECRET_KEY,
    NEXT_AWS_ACCESS_KEY: process.env.NEXT_AWS_ACCESS_KEY,
    NEXT_AWS_SECRET_KEY: process.env.NEXT_AWS_SECRET_KEY,
  },
};
