const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const fileupload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileupload());

const url = "mongodb://localhost:27017";
const DATABASE = "mentor_connector";
const PORT = 3001;

MongoClient.connect(url, function (err, db) {
  if (err) console.log(err);
  console.log("Database connected!");
  db.close();
});

app.use("/photos", express.static("photos"));
app.use("/cards", express.static("cards"));
app.use("/certificates", express.static("certificates"));

app.post("/mentorregister", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const gender = req.body.gender;
  const age = req.body.age;
  const skill = req.body.skill;
  const photoFile = req.files.photoFile;
  const photoFileName = req.body.photoFileName;
  const cardFile = req.files.cardFile;
  const cardFileName = req.body.cardFileName;
  const certFile = req.files.certFile;
  const certFileName = req.body.certFileName;

  const photopath = __dirname + "/photos/";
  const cardpath = __dirname + "/cards/";
  const certpath = __dirname + "/certificates/";

  photoFile.mv(`${photopath}${photoFileName}`, (err) => {
    if (err) {
      res.send({ message: "File upload failed", code: 200 });
    }
  });

  cardFile.mv(`${cardpath}${cardFileName}`, (err) => {
    if (err) {
      res.send({ message: "File upload failed", code: 200 });
    }
  });

  certFile.mv(`${certpath}${certFileName}`, (err) => {
    if (err) {
      res.send({ message: "File upload failed", code: 200 });
    }
  });

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentor")
      .find({
        $or: [{ email: email }, { phone: phone }],
      })
      .limit(1)
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result.length == 1) {
          res.send("error");
        } else {
          db.collection("mentor").insertOne(
            {
              name: name,
              email: email,
              phone: phone,
              password: password,
              gender: gender,
              age: age,
              skill: skill,
              aadhar_card: cardFileName,
              photo: photoFileName,
              certificate: certFileName,
              status: 0,
            },
            (error, result) => {
              if (error) console.log(error);
              if (result) client.close();
              res.send("success");
            }
          );
        }
      });
  });
});

app.post("/menteeregister", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const gender = req.body.gender;
  const age = req.body.age;
  const classField = req.body.classField;

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentee")
      .find({
        $or: [{ email: email }, { phone: phone }],
      })
      .limit(1)
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result.length == 1) {
          res.send("error");
        } else {
          db.collection("mentee").insertOne(
            {
              name: name,
              email: email,
              phone: phone,
              password: password,
              gender: gender,
              age: age,
              class: classField,
              status: 0,
            },
            (error, result) => {
              if (error) console.log(error);
              if (result) client.close();
              res.send("success");
            }
          );
        }
      });
  });
});

app.get("/allmentor", (req, res) => {
  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentor")
      .find()
      .sort({ name: 1 })
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      });
  });
});

app.get("/allmentee", (req, res) => {
  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentee")
      .find()
      .sort({ name: 1 })
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      });
  });
});

app.post("/changementorstatus", (req, res) => {
  const id = req.body.id;
  const status = parseInt(req.body.status);

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentor").updateOne(
      { _id: ObjectID(id) },
      { $set: { status: status } },
      (error, result) => {
        if (error) console.log(error);
        if (result) client.close();
        res.send("success");
      }
    );
  });
});

app.post("/changementeestatus", (req, res) => {
  const id = req.body.id;
  const status = parseInt(req.body.status);

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentee").updateOne(
      { _id: ObjectID(id) },
      { $set: { status: status } },
      (error, result) => {
        if (error) console.log(error);
        if (result) client.close();
        res.send("success");
      }
    );
  });
});

app.post("/login", (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  const type = parseInt(req.body.type);

  if (type == 1) {
    MongoClient.connect(url, function (err, client) {
      const db = client.db(DATABASE);
      db.collection("mentee")
        .find({ phone: phone, password: password, status: 1 })
        .limit(1)
        .toArray(function (error, result) {
          if (error) console.log(error);
          if (result) client.close();
          res.send(result);
        });
    });
  } else {
    MongoClient.connect(url, function (err, client) {
      const db = client.db(DATABASE);
      db.collection("mentor")
        .find({ phone: phone, password: password, status: 1 })
        .limit(1)
        .toArray(function (error, result) {
          if (error) console.log(error);
          if (result) client.close();
          console.log(result);
          res.send(result);
        });
    });
  }
});

app.post("/searchmentor", (req, res) => {
  const skill = req.body.Company;

  // db.query("SELECT mentor.id,mentor.name,mentor.email,mentor.phone,mentor.gender,mentor.age,mentor.skill,AVG(feedback.rating) as rating FROM mentor LEFT JOIN feedback ON mentor.id = feedback.mentor WHERE mentor.skill = ? GROUP BY feedback.mentor",[skill],
  // (error,result)=>{
  //     if(error){
  //         console.log(error);
  //     }
  //     if(result){
  //         console.log(result);
  //         res.send(result);
  //     }
  // }
  // );

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentor")
      .aggregate([
        {
          $match: {
            skill: skill,
          },
        },
        {
          $lookup: {
            from: "feedback",
            localField: "_id",
            foreignField: "mentor",
            as: "avg_rating",
          },
        },
        {
          $project: {
            name: true,
            email: true,
            gender: true,
            age: true,
            rating: { $avg: "$avg_rating.rating" },
          },
        },
        // {
        //     $unwind: {
        //         path: "$feedbacks",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $group: {
        //         _id: "$feedbacks.mentor",
        //         rating: { $avg: "$feedbacks.rating"}
        //     }
        // },
      ])
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        console.log(result);
        res.send(result);
      });
  });
});

app.post("/dorequest", (req, res) => {
  const mentor = ObjectID(req.body.mentor);
  const mentee = ObjectID(req.body.mentee);
  const status = req.body.status;

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("requests")
      .find({ mentor: mentor, mentee: mentee })
      .limit(1)
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result.length == 0) {
          db.collection("requests").insertOne(
            {
              mentor: mentor,
              mentee: mentee,
              status: status,
            },
            (error, result) => {
              if (error) console.log(error);
              if (result) client.close();
              res.send(result);
            }
          );
        }
      });
  });
});

app.post("/getmyrequests", (req, res) => {
  const mentor = ObjectID(req.body.mentor);

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("requests")
      .aggregate([
        {
          $match: {
            $and: [{ mentor: mentor }, { status: 0 }],
          },
        },
        {
          $lookup: {
            from: "mentee",
            localField: "mentee",
            foreignField: "_id",
            as: "mentee_info",
          },
        },
        {
          $unwind: {
            path: "$mentee_info",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      });
  });
});

app.post("/acceptreq", (req, res) => {
  const id = req.body.id;

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("requests").updateOne(
      { _id: ObjectID(id) },
      { $set: { status: 1 } },
      (error, result) => {
        if (error) console.log(error);
        if (result) client.close();
        res.send("success");
      }
    );
  });
});

app.post("/delreq", (req, res) => {
  const id = req.body.id;

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("requests").deleteOne(
      { _id: ObjectID(id) },
      (error, result) => {
        if (error) console.log(error);
        if (result) client.close();
        res.send("success");
      }
    );
  });
});

app.post("/getmenteelist", (req, res) => {
  const mentor = ObjectID(req.body.mentor);

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("requests")
      .aggregate([
        {
          $match: {
            mentor: mentor,
            status: 1,
          },
        },
        {
          $lookup: {
            from: "mentee",
            localField: "mentee",
            foreignField: "_id",
            as: "mentee_info",
          },
        },
        {
          $unwind: "$mentee_info",
        },
      ])
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      });
  });
});

app.post("/getmentorlist", (req, res) => {
  const mentee = ObjectID(req.body.mentee);

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("requests")
      .aggregate([
        {
          $match: {
            mentee: mentee,
            status: 1,
          },
        },
        {
          $lookup: {
            from: "mentor",
            localField: "mentor",
            foreignField: "_id",
            as: "mentor_info",
          },
        },
        {
          $unwind: "$mentor_info",
        },
      ])
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      });
  });
});

app.post("/addfeedback", (req, res) => {
  const mentor = ObjectID(req.body.mentor);
  const mentee = ObjectID(req.body.mentee);
  const message = req.body.message;
  const rating = req.body.rating;

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("feedback")
      .find({ mentor: mentor, mentee: mentee })
      .limit(1)
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result.length == 0) {
          db.collection("feedback").insertOne(
            {
              mentor: mentor,
              mentee: mentee,
              message: message,
              rating: rating,
            },
            (error, result) => {
              if (error) console.log(error);
              if (result) client.close();
              res.send("success");
            }
          );
        } else {
          db.collection("requests").updateOne(
            { mentor: mentor, mentee: mentee },
            { $set: { message: message, rating: rating } },
            (error, result) => {
              if (error) console.log(error);
              if (result) client.close();
              res.send("success");
            }
          );
        }
      });
  });
});

app.post("/getfeedback", (req, res) => {
  const mentor = ObjectID(req.body.mentor);

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("feedback")
      .aggregate([
        {
          $match: {
            mentor: mentor,
          },
        },
        {
          $lookup: {
            from: "mentee",
            localField: "mentee",
            foreignField: "_id",
            as: "mentee_info",
          },
        },
        {
          $unwind: "$mentee_info",
        },
      ])
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      });
  });
});

app.post("/savementorinfo", (req, res) => {
  const user = req.body.user;
  const age = req.body.age;
  const skill = req.body.skill;
  const certFile = req.files.certFile;
  const certFileName = req.body.certFileName;

  const certpath = __dirname + "/certificates/";

  certFile.mv(`${certpath}${certFileName}`, (err) => {
    if (err) {
      res.send({ message: "File upload failed", code: 200 });
    }
  });

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentor").updateOne(
      { _id: ObjectID(user) },
      { $set: { age: age, skill: skill, certificate: certFileName } },
      (error, result) => {
        if (error) console.log(error);
        if (result) client.close();
        res.send("success");
      }
    );
  });
});

app.post("/savementeeinfo", (req, res) => {
  const user = req.body.user;
  const age = req.body.age;
  const classField = req.body.classField;

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("mentee").updateOne(
      { _id: ObjectID(user) },
      { $set: { age: age, class: classField } },
      (error, result) => {
        if (error) console.log(error);
        if (result) client.close();
        res.send("success");
      }
    );
  });
});

app.post("/getchats", (req, res) => {
  const from_user = req.body.from_user;
  const to_user = req.body.to_user;

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("chat")
      .find({
        $or: [
          {
            $and: [{ from_user: from_user }, { to_user: to_user }],
          },
          {
            $and: [{ to_user: from_user }, { from_user: to_user }],
          },
        ],
      })
      .toArray(function (error, result) {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      });
  });
});

app.post("/sendchat", (req, res) => {
  const from_user = req.body.from_user;
  const to_user = req.body.to_user;
  const chat = req.body.chat;
  const datetime = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

  MongoClient.connect(url, function (err, client) {
    const db = client.db(DATABASE);
    db.collection("chat").insertOne(
      {
        from_user: from_user,
        to_user: to_user,
        chat: chat,
        datetime: datetime,
      },
      (error, result) => {
        if (error) console.log(error);
        if (result) client.close();
        res.send(result);
      }
    );
  });
});

app.listen(PORT, () => {
  console.log("Listening to ", { PORT });
});
