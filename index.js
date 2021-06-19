const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const LoginWithTwitter = require("login-with-twitter");
const dotenv = require("dotenv");
const open = require("open");
fs = require("fs");

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cookieParser());
app.use(
    session({
        secret: "keyboard cat",
    })
);

const tws = [];

app.get("/twitter", (req, res) => {
    const credentials = {
        consumerKey: req.query.consumerKey,
        consumerSecret: req.query.consumerSecret,
        callbackUrl:
            req.query.callbackUrl ?? "http://localhost:3000/twitter/callback",
    };

    const tw = new LoginWithTwitter(credentials);

    tw.login((err, tokenSecret, url) => {
        if (err) {
            // Handle the error your way
        }

        // Save the OAuth token secret for use in your /twitter/callback route
        req.session.twitter = {
            credentials,
            tokenSecret,
            saveAsDotEnv: req.query.saveAsDotEnv ?? false,
        };

        req.session.tokenSecret = tokenSecret;
        req.session.saveAsDotEnv = req.query.saveAsDotEnv ?? false;
        req.session.credentials = credentials;

        tws.push({
            token: tokenSecret,
            tw,
        });

        // Redirect to the /twitter/callback route, with the OAuth responses as query params
        res.redirect(url);
    });
});

app.get("/twitter/callback", (req, res) => {
    const oAuthParam = {
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier,
    };

    const token = req.session.tokenSecret;
    delete req.session.tokenSecret;
    const twIndex = tws.findIndex((tw) => tw.token === token);

    tws[twIndex].tw.callback(oAuthParam, token, (err, user) => {
        req.session.user = user;

        tws.splice(twIndex, 1);
        if (!user) res.send("rip");
        else {
            const credentials = req.session.credentials;
            delete req.session.credentials;

            const generatedCredentials = {
                CONSUMER_KEY: credentials.consumerKey,
                CONSUMER_SECRET: credentials.consumerSecret,
                ACCESS_TOKEN: user.userToken,
                SECRET_ACCESS_TOKEN: user.userTokenSecret,
            };

            // Redirect to whatever route that can handle your new Twitter login user details!
            res.send(generatedCredentials);
            if (req.session.saveAsDotEnv === "true") {
                let dotenvFile = "";
                Object.entries(generatedCredentials).forEach(([key, value]) => {
                    dotenvFile += `${key}=${value}\n`;
                });

                fs.writeFile(".env", dotenvFile, function (err) {
                    if (err) return console.log(err);
                });

                delete req.session.saveAsDotEnv;
            }
        }
    });
});

app.listen(port, () => {
    console.log("Auth generator listening at http://localhost:" + port);
});
