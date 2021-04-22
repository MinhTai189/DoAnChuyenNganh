import { Typography } from "@material-ui/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { makeStyles } from "@material-ui/styles";
import Topic from "./Topic";
import Tools from "../components/Tools";
import CreateTopic from "../components/CreateTopic";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { useEffect, useState } from "react";
import { firebaseStore, increment } from "../firebase";
import { selectUser } from "../features/user/UserSlice";
import { useSelector } from "react-redux";
import { findTopic } from "../functions/find";
import { sortTopic } from "../functions/sort";
import Print from "./Print";
import Test from "./Test";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "auto",
    background: theme.palette?.background?.default,
  },
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    margin: "0 auto",
    width: "100%",
    maxWidth: 1100,
    minHeight: "calc(100vh - 55px)",
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
  },
  wrapperInform: {
    textAlign: "center",
    paddingTop: "50px",

    "& .MuiTypography-root": {
      color: theme.palette.text.primary,
    },

    [theme.breakpoints.down("sm")]: {
      "& .MuiTypography-h4": {
        fontSize: 25,
      },
    },
  },
  icon: {
    height: "55px",
    width: "55px",
    marginTop: theme.spacing(1.5),
    cursor: "pointer",
    opacity: ".8",
    transition: "all .3s",

    "&:hover": {
      opacity: "1",
      transform: "scale(1.05)",
      transition: "all .3s",
    },
  },
  notFound: {
    color: theme.palette.text.primary,
    textAlign: "center",
    position: "absolute",
    fontSize: 18,
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const TopicList = () => {
  const classes = useStyles();
  const [countTopic, setCountTopic] = useState(0);
  const [isOpenCreateTopic, setIsOpenCreateTopic] = useState(false);
  const [dataFinding, setDataFinding] = useState("");

  const [valueSort, setValueSort] = useState(null);
  const [dataPrint, setDataPrint] = useState(null);
  const [openTest, setOpenTest] = useState(false);

  const [dataTest, setDataTest] = useState();
  const user = useSelector(selectUser);
  const db = firebaseStore.collection("accounts").doc(user.email);

  const now = Date.now();

  // hàm xử lý thêm chủ đề vào firestore
  const handleCreateTopic = (topic, background) => {
    const intialData = {
      topic,
      background,
      vocabs: [],
      dateCreated: now,
      countVocab: 0,
    };

    db.collection("topicsList")
      .doc()
      .set(intialData)
      .then(() =>
        // tăng biến countTopic lên 1 sau khi thêm topic thành công
        db.update({
          countTopic: increment,
        })
      )
      .catch((err) => alert("Xảy ra lỗi trong quá trình tạo chủ đề!\n" + err));
  };

  // xử lý mở, truyền dữ liệu cho chức năng kiểm tra
  const handleTest = (type) => {
    const arrayDataTest = user.topicsList.reduce((arr, cur) => {
      arr = [...arr, ...cur.vocabs];
      return arr;
    }, []);

    let temp;
    if (type === "type1") {
      temp = arrayDataTest.sort((e1, e2) => {
        if (e1.scoreWrong < e2.scoreWrong) return 1;
        if (e1.scoreWrong > e2.scoreWrong) return -1;
        return 0;
      });
    } else {
      temp = arrayDataTest.sort(() => Math.random() - 0.5); // trộn phần từ của mảng
    }

    if (temp.length >= 10) {
      setDataTest(temp);
      setOpenTest(true);
    } else {
      alert("Bạn phải có ít nhất 10 từ vựng để thực hiện kiểm tra!");
    }
  };

  // gán giá trị countTopic khi load trang
  useEffect(() => {
    setCountTopic(user?.data?.countTopic);
  }, [user]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {countTopic === 0 ? (
          <div className={classes.wrapperInform}>
            <Typography variant="h4">
              Oops!...Bạn chưa có chủ đề nào cả.
            </Typography>

            <Typography>
              Hãy tạo cho mình một chủ đề bằng cách nhấn vào nút bên dưới
            </Typography>

            <AddCircleRoundedIcon
              className={classes.icon}
              color="primary"
              onClick={() => setIsOpenCreateTopic(true)}
            />
          </div>
        ) : (
          <>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter={"20px"}>
                {user &&
                user.topicsList &&
                findTopic(user.topicsList, "topic", dataFinding).length > 0 ? (
                  sortTopic(
                    findTopic(user.topicsList, "topic", dataFinding).filter(
                      (topic) => topic.id !== "forgetful"
                    ),
                    valueSort
                  ).map((topic) => (
                    <Topic
                      key={topic.id}
                      id={topic.id}
                      title={topic.topic}
                      content={topic.vocabs}
                      background={topic.background}
                      setDataPrint={setDataPrint}
                    />
                  ))
                ) : (
                  <Typography variant="h6" className={classes.notFound}>
                    Không tìm thấy dữ liệu...!
                  </Typography>
                )}
              </Masonry>
            </ResponsiveMasonry>

            <Tools
              setIsOpen={setIsOpenCreateTopic}
              dataFinding={dataFinding}
              setDataFinding={setDataFinding}
              setValueSort={setValueSort}
              handleTest={handleTest}
              isTopic={true}
            />
          </>
        )}
        <CreateTopic
          isOpen={isOpenCreateTopic}
          setIsOpen={setIsOpenCreateTopic}
          handleCreateTopic={handleCreateTopic}
        />
      </div>
      {dataPrint && <Print dataPrint={dataPrint} setDataPrint={setDataPrint} />}
      {openTest && <Test setOpenTest={setOpenTest} dataTest={dataTest} />}
    </div>
  );
};

export default TopicList;
