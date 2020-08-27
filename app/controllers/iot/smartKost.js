const MiscHelper = require("../../../app/helpers/helpers");
const firebaseConfig = require("../../config/firebase");
const firebase = require("firebase");

module.exports = {
  Insert: (req, res) => {
    let suhu = req.body.suhu;
    let kelembapan = req.body.kelembapan;
    let indeksSuhuCelcius = req.body.indeksSuhuCelcius;
    let indeksSuhuFahrenheit = req.body.indeksSuhuFahrenheit;
    let date = new Date();
    let uid = new Date(date).valueOf();

    console.log(new Date());
    console.log("suhu = ", suhu);
    console.log("kelembapan = ", kelembapan);
    console.log("indeks Suhu Celcius= ", indeksSuhuCelcius);
    console.log("indeks Suhu Farenheit= ", indeksSuhuFahrenheit);

    // console.log(firebase);

    ///////
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    let database = firebase.database();

    //Insert Database Realtime
    database.ref("SensorSuhu/").child("Realtime").set({
      suhu: suhu,
      kelembapan: kelembapan,
      indeksSuhuFahrenheit: indeksSuhuFahrenheit,
      indeksSuhuCelcius: indeksSuhuCelcius,
      time: new Date().toString(),
    });

    database.ref("SensorSuhu/Log").child(uid).set({
      suhu: suhu,
      kelembapan: kelembapan,
      indeksSuhuFahrenheit: indeksSuhuFahrenheit,
      indeksSuhuCelcius: indeksSuhuCelcius,
      time: new Date().toString(),
    });

    //GET database
    let ref = database.ref("SensorSuhu/Realtime");
    ref.on(
      "value",
      function (snapshot) {
        console.log(snapshot.val());
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    ////

    MiscHelper.responses(res, {
      suhu: suhu,
      kelembapan: kelembapan,
      indeksSuhuCelcius: indeksSuhuCelcius,
    });
  },
};
