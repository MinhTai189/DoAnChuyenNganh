import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Speech from "react-speech";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useEffect, useRef, useState } from "react";
import { selectUser } from "../features/user/UserSlice";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  countdown: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  current: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  container: {
    width: "100%",
    paddingTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& .ques": {
      fontWeight: 600,
      textDecoration: "underline",
      fontSize: 19,
      marginBottom: 5,
      textTransform: "capitalize",
    },

    "& .speaker": {
      width: 23,
      height: 23,
      position: "relative",

      "& svg": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: "pointer",
        transition: ".3s",

        "&:hover": {
          fill: theme.palette.primary.main,
          transition: ".3s",
        },
      },

      "& button": {
        opacity: 0,
      },
    },

    "& .ans": {
      marginTop: 40,
      marginBottom: 70,
      width: "100%",
      display: "flex",
      justifyContent: "center",

      "& input": {
        width: "80%",
        height: 50,
        outline: "none",
        borderRadius: 10,
        border: "3px solid " + theme.palette.primary.main,
        padding: "5px 15px",
        color: "#666",
        fontSize: 16,

        "&::placeholder": {
          color: "#888",
        },
      },

      "& .select": {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",

        "& .option": {
          flexBasis: "60%",
          minWidth: "50%",
          background: "#ccc",
          marginBottom: 20,
          cursor: "pointer",
          fontWeight: 400,
          textAlign: "center",
          padding: "13px 0",
          transition: ".4s",
          boxShadow: theme.shadows[4],

          "&:hover": {
            background: theme.palette.primary.main,
          },
        },
      },
    },

    "& .btnConfirm": {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      fontWeight: 500,
      padding: "18px 0",
      fontSize: 17,
      color: theme.palette.text.main,
      background: theme.palette.primary.main,
      border: "none",
      cursor: "pointer",
      boxShadow: theme.shadows[3],
      transition: ".3s",

      "&:hover": {
        background: theme.palette.primary.main + "ac",
        transition: ".3s",
      },
    },
  },
}));

// hàm xóa dấu tiếng Việt, dùng cho chức năng so sánh 2 từ với nhau
const change_alias = (alias) => {
  var str = alias.trim();
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
};

const ContentTest = (props) => {
  const {
    mode,
    amount,
    isEn,
    index,
    setIndex,
    currentVocab,
    result,
    setResult,
  } = props;
  const classes = useStyles();
  const [answer, setAnswer] = useState("");

  const speaker = useRef();
  const user = useSelector(selectUser);
  const [dataQuiz, setDataQuiz] = useState();

  const input = useRef();
  const [indexQuiz, setIndexQuiz] = useState();

  // xử lý sự kiện xác nhận
  const handleConfirm = () => {
    setIndex(index + 1);
    let check = false;

    // kiểm tra hướng từ vự đang kiểm tra, nếu là en -> vi thì thực hiện khối lệnh if đúng, nếu sai thực hiện khối lệnh if sai
    if (answer !== "") {
      if (isEn) {
        check = change_alias(currentVocab.vi).includes(change_alias(answer));
      } else {
        check = currentVocab.en === answer.trim();
      }
    }

    if (check) setResult({ ...result, score: result.score + 1 });
    else setResult({ ...result, wrong: [...result.wrong, currentVocab] });
  };

  useEffect(() => {
    if (mode === "quiz") {
      const allData = user.topicsList.reduce((arr, cur) => {
        arr = [...arr, ...cur.vocabs];
        return arr;
      }, []);

      let temp = allData.filter(
        (element) => element.en.toLowerCase() !== currentVocab.en.toLowerCase()
      );
      temp = temp.sort(() => Math.random() - 0.5); // trộn phần từ của mảng
      temp = [...temp.slice(0, 3), currentVocab].sort(
        () => Math.random() - 0.5
      ); // trộn phần từ mảng, để lấy dữ liệu cho đáp án kiểm tra tra trắc nghiệm

      setDataQuiz(temp);
    } else input.current.focus();
  }, [currentVocab]);

  return (
    <div className={classes.root}>
      <div className={classes.countdown}>
        <CountdownCircleTimer
          isPlaying
          duration={30}
          colors={"#8fb339"}
          size={50}
          strokeWidth={7}
          onComplete={() => {
            handleConfirm();
            return [false, 0];
          }}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>

      <span className={classes.current}>{`${index + 1}/${amount}`}</span>

      <div className={classes.container}>
        <Typography>
          {mode === "fill"
            ? "Điền nghĩa của từ vào chỗ trống"
            : "Chọn một đáp án đúng"}
        </Typography>
        <Typography className="ques">
          {isEn ? currentVocab.en : currentVocab.vi}
        </Typography>

        <div className="speaker">
          <Speech
            text={currentVocab.en}
            lang="EN-US"
            voice="Google UK English Female"
            ref={speaker}
          />
          <VolumeUpIcon onClick={() => speaker.current.play()} />
        </div>

        <div className="ans">
          {mode === "fill" ? (
            <input
              ref={input}
              type="text"
              placeholder="nhập đáp án của bạn..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && handleConfirm();
              }}
            />
          ) : (
            <div className="select">
              {dataQuiz &&
                dataQuiz.map((element, index) => {
                  const answer = isEn ? element.vi : element.en;
                  return (
                    <div
                      key={index}
                      className="option"
                      onClick={() => {
                        setAnswer(answer);
                        setIndexQuiz(index);
                      }}
                      style={{ background: index === indexQuiz && "#8fb339" }}
                    >
                      {answer}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <button className="btnConfirm" onClick={handleConfirm}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ContentTest;
