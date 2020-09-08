const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const moment = require("moment");

const apiRouter = express.Router();

app.use(logger("dev", {}));
app.use(bodyParser.json());
app.use("", apiRouter);

apiRouter.post("", function (req, res) {
  const whatDay = req.body.action.params.day;
  const day = getDay(whatDay);
  const dayKR = getDayKR(whatDay);
  const responseBody = {
    version: "2.0",

    data: {
      day: dayKR,
      one: "1교시 : " + timetable[day][0],
      two: "2교시 : " + timetable[day][1],
      three: "3교시 : " + timetable[day][2],
      four: "4교시 : " + timetable[day][3],
      five: "5교시 : " + timetable[day][4],
      six: "6교시 : " + timetable[day][5],
      seven: timetable[day][6],
    },
  };

  res.status(200).send(responseBody);
});

function getDay(whatDay) {
  console.log(whatDay);
  if (whatDay < 0) {
    const day = moment().format("dddd");
    switch (day) {
      case "Monday":
        dayKR = "월";
        return 0;
      case "Tuesday":
        dayKR = "화";
        return 1;
      case "Wednesday":
        dayKR = "수";
        return 2;
      case "Thursday":
        dayKR = "목";
        return 3;
      case "Friday":
        dayKR = "금";
        return 4;
      case "Saturday":
        dayKR = "토";
        return 5;
      case "Sunday":
        dayKR = "일";
        return 6;
    }
  } else return whatDay;
}

function getDayKR(whatDay) {
  const day = moment().format("dddd");
  if (whatDay < 0) {
    switch (day) {
      case "Monday":
        return "월";
      case "Tuesday":
        return "화";
      case "Wednesday":
        return "수";
      case "Thursday":
        return "목";
      case "Friday":
        return "금";
      case "Saturday":
        return "토";
      case "Sunday":
        return "일";
    }
  } else {
    switch (whatDay) {
      case 0:
        return "월";
      case 1:
        return "화";
      case 2:
        return "수";
      case 3:
        return "목";
      case 4:
        return "금";
      case 5:
        return "토";
      case 6:
        return "일";
    }
  }
}
const timetable = [
  ["중국어I", "성직", "응화", "영어", "화I", "정통", "7교시 : 수II"],
  ["공수", "운건", "수II", "응화", "정통", "진로", "7교시 : CA"],
  ["응프", "응프", "진로", "공수", "자구", "화1", ""],
  ["응프", "응프", "화I", "문학", "수II", "공수", "7교시 : HR"],
  ["영어", "화I", "자구", "문학", "중국어I", "성직", "7교시 : 운건"],
];
app.listen(process.env.PORT || 8080, function () {
  console.log("Example skill server listening on port 3000!");
});
