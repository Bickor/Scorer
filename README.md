# Scorer

This is a simple react web app that keeps track of who wins in games by how many points.

Currently, the app utilizes firebase realtime database and authentication. I didn't commit a config file that is utilized to hold the firebase project
specific data, which you would need to create in order to run the project on your own computer.

## Cloning

If you wish to clone this repo, simply run: `git clone https://github.com/Bickor/Scorer.git`

## Start

In order to start this repo follow these steps:
1. Clone the repo as explained above.
2. Install Node.js and firebase-tools.
3. Initialize a Firebase project and create a Realtime Database with test rules.
4. Select the webapp icon in the Project Overview section of your firebase project and copy and paste all the config data into your own config.js file 
(stored in the src folder) as shown below

```
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL,
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  }

  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();
```

5. Run `npm start` in the project folder.