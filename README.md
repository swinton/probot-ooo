# Probot: OOO

> **Respond with an auto-responder when you are _out of office_ (OOO).**

Use the `/ooo` slash command to let everyone know when you will be OOO:

<img width="793" alt="screenshot 2018-01-03 18 47 15" src="https://user-images.githubusercontent.com/27806/34545993-8e21b866-f0b6-11e7-9cc4-750d6f9b2ed5.png">

While are enjoying your OOO, `probot-ooo` will respond on your behalf to anyone who mentions you, with an _out of office reply_:

<img width="802" alt="screen shot 2018-01-05 at 6 16 55 pm" src="https://user-images.githubusercontent.com/27806/34633882-c505d878-f244-11e7-89c2-c367afdb738a.png">

## Usage

1. Install the [**GitHub App**](https://github.com/apps/ooo)
1. Start using the `/ooo` command to set up OOO reminders within your organization

## Setup

```
# Install dependencies
npm install

# Install database
npm run-script migrate

# Run the bot
npm start

# Simulate an OOO request
npm run-script simulate-ooo

# Simulate a mention
npm run-script simulate-mention
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.
