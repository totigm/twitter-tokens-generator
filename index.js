const express = require("express");
const LoginWithTwitter = require("login-with-twitter");
const open = require("open");
const clipboardy = require("clipboardy");
require("dotenv").config();

const { env } = process;

const app = express();
const port = env.PORT ?? 3000;

const credentials = {
    consumerKey: env.CONSUMER_KEY,
    consumerSecret: env.CONSUMER_SECRET,
    callbackUrl: "http://localhost:3000/twitter/callback",
};

const twitter = new LoginWithTwitter(credentials);

let token;

twitter.login((err, tokenSecret, url) => {
    token = tokenSecret;
    open(url);
});

app.get("/twitter/callback", (req, res) => {
    const oAuthParam = {
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier,
    };

    twitter.callback(oAuthParam, token, (err, user) => {
        if (!user) res.status(404).send("User not found :c");

        const twitterCredentials = {
            CONSUMER_KEY: credentials.consumerKey,
            CONSUMER_SECRET: credentials.consumerSecret,
            ACCESS_TOKEN: user.userToken,
            SECRET_ACCESS_TOKEN: user.userTokenSecret,
        };

        let credentialsString = "";
        Object.entries(twitterCredentials).forEach(([key, value]) => {
            credentialsString += `${key}=${value}\n`;
        });

        clipboardy.writeSync(credentialsString);
        console.log("Your credentials have been copied to your clipboard!");
        res.status(200).send(
            `${JSON.stringify(
                twitterCredentials
            )}<script>alert("Your credentials have been copied to your clipboard! You can close this now.");</script>`
        );
    });
});

app.listen(port, () => {
    console.log("Auth generator listening at http://localhost:" + port);
});
