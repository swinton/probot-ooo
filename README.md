# probot-ooo

**Respond with an auto-responder when you are OOO.**

This is a :construction: :warning: work in progress :warning: :construction: but here's the basic idea...

Set your OOO in an issue comment:

<img width="793" alt="screenshot 2018-01-03 18 47 15" src="https://user-images.githubusercontent.com/27806/34545993-8e21b866-f0b6-11e7-9cc4-750d6f9b2ed5.png">

While are OOO, `probot-ooo` will respond on your behalf with a generic out of office reminder, should anyone mention you.

## Setup

```
# Install dependencies
npm install

# Install database
npm run-script migrate

# Run the bot
npm start

# Simulate an opened issue
npm run-script simulate
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.
