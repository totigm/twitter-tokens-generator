# Twitter OAuth Tokens Generator

This is a Twitter authentication tokens generator for [v1.1](https://developer.twitter.com/en/docs/twitter-api/v1) and [v2](https://developer.twitter.com/en/docs/twitter-api/early-access) apps that use OAuth.

With this keys you can use and manage a Twitter account with code using some libraries like [Twit](https://www.npmjs.com/package/twit), or some apps like [Twitter Crypto Bot](https://github.com/totigm/twitter-crypto-bot).

## 📋 Requirements

-   [Node.js](https://nodejs.org)
-   [Twitter developer account](https://developer.twitter.com)

## Follow the steps

-   Once you have your Twitter developer account, **create a new project and app** with it.
    -   Make sure your app has **v1.1 and v2 Access**. You can check this by going to ["Projects & Apps > Overview"](https://developer.twitter.com/en/portal/projects-and-apps).
-   Open the app settings, go to the "Keys and tokens" section and generate an API Consumer Key and a Consumer Secret Key. Save them somewhere safe.
    -   If you have already generated the keys before and lost them, simply click on regenerate keys.
-   Inside the app settings go to "Edit authentication settings".
    -   Enable "3-legged OAuth".
    -   Add a callback url exactly like this `http://localhost:3000/twitter/callback`.
-   Clone this repo to your computer.
-   Execute `yarn` or `npm i` inside the repo's directory.
-   Create a file named `.env` in the root folder of the repository and add the following:

```
CONSUMER_KEY=YOUR_CONSUMER_KEY
CONSUMER_SECRET=YOUR_CONSUMER_SECRET
```

-   Run `yarn start` or `npm start` and wait for your browser to open.
-   Log in with your Twitter account that is going to be controlled by your Twitter application, or in case you are already logged in, just authorize it.
-   Once it's finished, every key and token are going to be copied to your clipboard. Just paste them where you need.

## 💖 Support the project

If you like what we do and want to encourage us to continue creating stuff, starring and sharing this project would be really appreciated!

## ✨ Contributing

Contributions are more than welcome!

We think that you might have great ideas to make this project better, so if you do, please create a pull request and/or issue.

## 😃 Authors

-   [Totigm](https://github.com/totigm)
-   [Hernancano98](https://github.com/Hernancano98)

## 📄 License

[MIT](./LICENSE)

<hr />

This project was made with ❤ and JavaScript
