# Chatrrr

Chatrrr is a Twitter-like simple app with plenty of 90s charm.
To quickly see it in action, you can visit [this link](https://ecstatic-noyce-4ef3d3.netlify.app/).

## Installation

### Prerequisities

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Express](https://expressjs.com/) using the following command:

```sh
  npm install express --save
```

3. Install [webpack](https://webpack.js.org/guides/getting-started/) using the following command:

```sh
  npm install webpack webpack-cli --save-dev
```

4. Clone this repo:

```sh
git clone https://github.com/angelcj/chatrrr.git
```

### Run the application

Change into the root directory of the app, initialise npm and run the command:

```sh
  cd chatrrr
  npm init -y
  npm run webpackBuild
```

To run the app:

```sh
  npm run previewDist
```

Preview the app on `http://localhost:4000/`

### Run the application in dev mode

Run the app:

```sh
  npm run dev
```

Preview the app on `http://localhost:3000/`
