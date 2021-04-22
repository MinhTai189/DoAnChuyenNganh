import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { firebaseStore, fieldValue } from "../firebase";
import { selectUser } from "../features/user/UserSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 10px 20px",
    background: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",

    "& .tilte": {
      fontSize: 22,
      fontWeight: 600,
      marginBottom: 20,
    },

    "& p": {
      fontSize: 15,
      fontWeight: 300,
      color: "#999",
      marginBottom: 10,
    },

    "& p:nth-of-type(2)": {
      alignSelf: "flex-start",
      paddingLeft: 20,
      color: "#333",
    },

    "& .score": {
      fontWeight: 600,
      fontSize: 50,
      marginBottom: 50,
    },

    "& .wrapper": {
      width: "90%",
      minHeight: 150,
      maxHeight: 230,
      border: "1px solid #999",
      padding: "5px 12px",
      listStyleType: "none",
      color: "#555",
      overflowY: "scroll",

      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: 10,
        background: "#F5F5F5",
      },

      "&::-webkit-scrollbar": {
        width: 3,
        background: "#F5F5F5",
      },

      "&::-webkit-scrollbar-thumb": {
        borderRadius: 10,
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        background: theme.palette.primary.main,
      },

      "& li": {
        padding: "3px 0",
        textTransform: "lowercase",
      },
    },

    "& button": {
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

// chuyển điểm số thành các câu tiêu đề
const changeScoreToText = (score, amount) => {
  if (score === amount) return "Tuyệt vời!";
  else if (score < amount && score >= amount - 5)
    return "Bạn đang làm rất tốt. Hãy cố lên!";
  else return "Kết quả lần này không được tốt!";
};

const ResultTest = ({
  result,
  amount,
  setOpenTest,
  dataTest,
  setBeginTest,
}) => {
  const classes = useStyles();
  const title = changeScoreToText(result.score, amount);
  const user = useSelector(selectUser);

  const db = firebaseStore.collection("accounts").doc(user.email);

  useEffect(() => {
    setBeginTest(false);
    const allTopic = user.topicsList;
    const { score, wrong } = result;
    const right = dataTest.filter((element1) => {
      let result = true;

      wrong.forEach((element2) => {
        if (element1.id === element2.id) result = false;
      });

      return result;
    });

    const newWrong = wrong.map((element) => {
      return { ...element, scoreWrong: element.scoreWrong + 1 };
    });

    const newRight = right.map((element) => {
      return {
        ...element,
        scoreWrong: element.scoreWrong - 1 >= 0 ? element.scoreWrong - 1 : 0,
      };
    });

    const temp = [...newRight, ...newWrong];

    // kiểm tra topic nào có từ vựng được sửa lại scoreWrong thì sẽ lưu lại, dành cho cập nhật topicsList
    const dataUpdate = allTopic.reduce((arr, cur) => {
      const idTopic = cur.id;
      let isChange = false;

      const checkArr = cur.vocabs.map((element1) => {
        let result = { ...element1 };
        temp.forEach((element2) => {
          if (element1.id === element2.id) {
            isChange = true;
            result = { ...element2 };
          }
        });
        return result;
      });

      if (isChange)
        arr.push({
          idTopic,
          vocabs: checkArr,
        });

      return arr;
    }, []);

    // thực hiện cập nhật lại danh sách từ vựng của chủ đề
    dataUpdate.forEach((element) => {
      db.collection("topicsList").doc(element.idTopic).update({
        vocabs: element.vocabs,
      });
    });

    // tăng số điểm trong firestore
    db.update({
      score: fieldValue.increment(score),
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className="tilte">{title}</div>
      <p>Số điểm bạn đã đạt được</p>
      <div className="score">{result.score}</div>

      <p>{`Từ vựng bạn đã làm sai: ${result.wrong.length}`}</p>
      <ul className="wrapper">
        {result.wrong.map((item, index) => (
          <li key={index}>{`${item.en}: ${item.vi}`}</li>
        ))}
      </ul>

      <button onClick={() => setOpenTest(false)}>Thoát</button>
    </div>
  );
};

export default ResultTest;
