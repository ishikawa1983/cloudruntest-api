const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require("fs");
const readline = require("readline");
const {PubSub} = require('@google-cloud/pubsub');
const fetch = require('node-fetch');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('date-utils');

const admin = require('firebase-admin');
const REGION = 'asia-northeast1';
const serviceId = 'intrepid-nova-295906';
var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://" + serviceId + ".firebaseio.com",
    storageBucket: serviceId + ".appspot.com"
});

// データベースの参照を作成
const fireStore = admin.firestore();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fireStore.collection('users').add({
    name : 'yuichi',
    age : 37,
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
