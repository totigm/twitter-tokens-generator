# Twitter OAuth Keys Generator

This is a Twitter authentication keys generator for [v1.1](https://developer.twitter.com/en/docs/twitter-api/v1) and [v2](https://developer.twitter.com/en/docs/twitter-api/early-access) access apps that use 3-legged OAuth.

With this keys you can use and manage a Twitter account with code using some libraries like [Tweet](), or some apps like [Twitter CryptoBot]()

## 📋 Requirements

- [Node.js](https://nodejs.org/en/)
- [Twitter developer account](https://developer.twitter.com/en)

## Follow the steps

- Once you have your Twitter developer account, **create a new project and app** with it.
  - Make sure your app has **v1.1 and v2 Access**
- Open the app settings, go to "Keys and tokens" and **generate API Consumer Key and Secret Key** and save the keys somewhere safe.
  - If you have already generated the keys before and have lost them, simply click on regenerate keys.
- Inside the app settings go to "Edit authentication settings"
  - Enable "3-legged OAuth"
  - Add a callback url exactly like this `http://localhost:3000/callback`
- Clone this repo to your local.
- Execute `yarn` or `npm i` inside the repo.
- Create a .env file in the root folder of the repository and add the following lines:

```
CONSUMER_KEY=YOUR_CONSUMER_KEY
CONSUMER_SECRET=YOUR_CONSUMER_SECRET
```

- Run `npm start` and wait for your browser to open.
- Then log in with your twitter account that is going to be controlled by the Twitter application, or in case you are already logged in, just authorize the application.
- Once is finished, all the keys and tokens are going to be copied in your clipboard. Just paste them where you need.

