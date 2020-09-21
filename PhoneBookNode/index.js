const express = require("express");
var multer = require("multer");
const { createStore } = require("redux");
const Contacts = require("./mock/contacts");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./userPics");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const app = express();
const port = 3001;
var cors = require("cors");
app.use(cors());
app.use(express.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "userPics")));

const initialState = Contacts;

function counter(state = initialState, action) {
  switch (action.type) {
    case "ADD_DATA":
      let data = state;
      data.push(action.payload);
      return state;
    default:
      return state;
  }
}

let store = createStore(counter);

app.get("/api/data", (req, res) => {
  const data = store.getState();

  res.send(data);
});

app.post("/api/add", upload.single("picture"), (req, res) => {
  const data = {
    name: req.body.firstname,
    phone: req.body.Phone,
    address: req.body.Adrees,
    bio: req.body.subject,
    gender: req.body.gender,
    pic: req.file.originalname,
  };

  store.dispatch({ type: "ADD_DATA", payload: data });

  res.send("Sucess");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
