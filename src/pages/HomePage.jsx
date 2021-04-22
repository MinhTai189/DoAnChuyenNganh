import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import Nav from "../components/Nav";
import TopicList from "../components/TopicList";
import VocabularyList from "../components/VocabularyList";
import { firebaseStore } from "../firebase";
import {
  selectUser,
  addDataUser,
  addTopicsList,
} from "../features/user/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}));

// hàm tính thời gian online của người dùng
const calOnlinedTime = (start) => {
  const end = Date.now();
  const minutes = (end - start) / 1000 / 60;
  return parseFloat(minutes.toFixed(1));
};

// hàm trả về tuần của ngày trong năm
const getWeek = function (date) {
  const time = new Date(date);
  var onejan = new Date(time.getFullYear(), 0, 1);
  return Math.ceil(((time - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

// hàm so sánh 2 ngày với nhau khi có mili giây
const compareDate = (time1, time2) => {
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const HomePage = () => {
  const classes = useStyles();
  const [start, setStart] = useState();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const db = firebaseStore.collection("accounts").doc(user.email);

  useBeforeunload((event) => {
    addOnlinedTime(start);
    event.preventDefault();
  });

  // hàm thêm thời gian online vào firestore
  // sẽ thêm khi người dùng thoát trang web
  const addOnlinedTime = async (start = Date.now()) => {
    const minutes = calOnlinedTime(start);
    const dateStart = new Date(start).getDay();
    const index = dateStart - 1 >= 0 ? dateStart - 1 : 6;
    const value = {
      date: start,
      minutes,
    };

    const response = await db.get();
    const fetchData = response.data();
    let onlinedTime = fetchData.onlinedTime;
    const reverse = [...onlinedTime];
    let findNotZero = reverse
      .reverse()
      .find((element) => typeof element !== "number");

    // nếu findNotZero có từ một phần tử khác 0, sẽ kiểm tra phần tử có cùng tuần với phần từ cần thêm vào mảng hay không
    // nếu findNotZero không có phần từ khác 0, push thẳng trực tiếp vào mảng
    if (findNotZero) {
      // nếu ngày được lưu trong firestore cùng tuần với ngày hiện tại thì thêm data vào mảng onlinedTime
      if (getWeek(findNotZero.date) === getWeek(start)) {
        // cùng tuần
        if (compareDate(findNotZero.date, start)) {
          findNotZero = {
            ...findNotZero,
            minutes: parseFloat((findNotZero.minutes + minutes).toFixed(1)),
          };
          onlinedTime[index] = { ...findNotZero };
        } else {
          // không cùng ngày thì add vô mảng
          onlinedTime[index] = value;
        }
      } else {
        // không cùng tuần thì sẽ tạo reset mảng về tất cả phần tử là 0
        onlinedTime.fill(0);
        onlinedTime[index] = value;
      }
    } else {
      // mảng chưa được lưu trữ
      onlinedTime[index] = value;
    }

    db.update({
      onlinedTime,
    }).catch((err) =>
      alert("Xảy ra lỗi trong quá trình kết nối với firestore\n", err)
    );
  };

  useEffect(() => {
    // tạo dữ liệu cho người dùng trong csdl
    // nếu tài khoản có trong csdl từ trước sẽ load dữ liệu lên trực tiếp
    // nếu không có sẽ tạo dữ liệu mới
    const handleAccount = db.onSnapshot((snap) => {
      if (snap.data()) {
        const data = snap.data();
        dispatch(addDataUser(data));
      } else {
        db.set({
          countVocab: 0,
          countTopic: 0,
          score: 0,
          onlinedTime: [0, 0, 0, 0, 0, 0, 0],
        });
      }
    });

    // lấy chủ đề từ csdl về
    const fetchTopicsList = db.collection("topicsList").onSnapshot(
      (snap) => {
        const list = [];

        snap.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        dispatch(addTopicsList(list));
      },
      (err) => alert("Lỗi trong quá trình tải chủ đề từ firestore!\n" + err)
    );

    return () => {
      handleAccount();
      fetchTopicsList();
    };
  }, []);

  useEffect(() => {
    setStart(Date.now());

    return () => {
      addOnlinedTime(start);
    };
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <Nav />

        <Switch>
          <Route exact path="/">
            <TopicList />
          </Route>

          <Route path="/topic/:id">
            <VocabularyList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomePage;
