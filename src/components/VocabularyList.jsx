import {
  IconButton,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import CreateVocabulary from "./CreateVocabulary";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import Tools from "./Tools";
import Vocabulary from "./Vocabulary";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/UserSlice";
import { firebaseStore, fieldValue, increment, decrement } from "../firebase";
import { findVocab } from "../functions/find";
import { sortVocab } from "../functions/sort";
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
    maxWidth: 900,
    minHeight: "calc(100vh - 55px)",
    background: theme.palette?.background?.default,

    "& .MuiSnackbarContent-root": {
      background: theme.palette.primary.main,
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

const VocabularyList = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [data, setData] = useState({});
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [expanded, setExpanded] = useState();
  const [dataFinding, setDataFinding] = useState("");

  const [valueSort, setValueSort] = useState(null);
  const { id } = useParams();
  const [isOpenCreateVocabulary, setIsOpenCreateVocabulary] = useState(false);
  const db = firebaseStore
    .collection("accounts")
    .doc(user.email)
    .collection("topicsList")
    .doc(id);

  const [openTest, setOpenTest] = useState(false);
  const [dataTest, setDataTest] = useState();

  useEffect(() => {
    const topic = user.topicsList
      ? user.topicsList?.filter((topic) => topic.id === id)
      : [];
    setData({ ...topic[0] });
  }, [user, id]);

  // xử lý tạo từ vựng
  const handleCreateVocab = (en, vi) => {
    if (data.countVocab < 50) {
      const id = firebaseStore.collection("accounts").doc().id;
      const vocab = { id, en, vi, dateCreated: Date.now(), scoreWrong: 0 };

      db.update({
        vocabs: fieldValue.arrayUnion(vocab),
      })
        .then(() => {
          handleClick();

          db.update({
            countVocab: increment,
          });

          firebaseStore.collection("accounts").doc(user.email).update({
            countVocab: increment,
          });
        })
        .catch((err) =>
          alert("Xảy ra lỗi trong quá trình thêm từ vựng!\n", err)
        );
    } else {
      alert("Một chủ đề chỉ được chứa tối đa 50 từ vựng!");
    }
  };

  // xử lý xóa từ vựng
  const hanleRemoveVocab = (id) => {
    db.update({
      vocabs: fieldValue.arrayRemove(id),
    })
      .then(() => {
        db.update({
          countVocab: decrement,
        });

        firebaseStore.collection("accounts").doc(user.email).update({
          countVocab: decrement,
        });
      })
      .catch((err) => alert("Xảy ra lỗi trong quá trình xóa từ vựng!\n", err));
  };

  // xử lý sửa từ vựng
  const handleEdit = (id, en, vi) => {
    const vocabsEdited = data.vocabs.map((vocab) => {
      if (vocab.id === id) return { ...vocab, en, vi };
      return vocab;
    });

    db.update({ vocabs: vocabsEdited }).catch((err) =>
      alert("Xảy ra lỗi trong quá trình cập nhập!\n", err)
    );
  };

  // thêm từ vựng vào chủ đề từ vựng hay quên
  const addForgetful = (id) => {
    // nếu scoreWrong lớn hơn 3, từ vựng sẽ được đưa vào thư mục từ vựng hay quên
    // nếu người dùng click vào nút hay quên, sẽ tăng scoreWrong của từ vựng lên 5
    let vocab = {};
    const temp = data.vocabs.reduce((arr, cur) => {
      if (cur.id === id) {
        cur = { ...cur, scoreWrong: 5 };
        vocab = { ...cur };
      }
      arr.push(cur);
      return arr;
    }, []);

    // tăng scoreWrong trong chủ đề
    db.update({
      vocabs: temp,
    }).catch((err) =>
      alert("Không thể thêm từ vựng vào thư mục từ vựng hay quên!\n", err)
    );
  };

  // xử lý mở, truyền dữ liệu cho chức năng kiểm tra
  const handleTest = (type) => {
    const arrayDataTest = user.topicsList.reduce((arr, cur) => {
      if (cur.id === id) arr = [...cur.vocabs];
      return arr;
    }, []);

    let temp = [...arrayDataTest];
    if (type === "type2") {
      temp = [...arrayDataTest.sort(() => Math.random() - 0.5)]; // trộn phần từ của mảng
    }

    if (temp.length >= 10) {
      setDataTest(temp);
      setOpenTest(true);
    } else {
      alert("Bạn phải có ít nhất 10 từ vựng để thực hiện kiểm tra!");
    }
  };

  // mở hộp thoại thông báo thêm từ vựng thành công
  const handleClick = () => {
    setIsOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenSnackbar(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {data && data?.vocabs?.length > 0 ? (
          <>
            {data && findVocab(data.vocabs, "en", "vi", dataFinding) ? (
              sortVocab(
                findVocab(data.vocabs, "en", "vi", dataFinding),
                valueSort
              ).map((vocab) => (
                <Vocabulary
                  key={vocab.id}
                  data={vocab}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  hanleRemoveVocab={hanleRemoveVocab}
                  handleEdit={handleEdit}
                  idTopic={id}
                  addForgetful={addForgetful}
                />
              ))
            ) : (
              <Typography variant="h6" className={classes.notFound}>
                Không tìm thấy dữ liệu...!
              </Typography>
            )}

            <Tools
              setIsOpen={setIsOpenCreateVocabulary}
              dataFinding={dataFinding}
              setDataFinding={setDataFinding}
              setValueSort={setValueSort}
              isVocab={true}
              handleTest={handleTest}
            />
          </>
        ) : (
          <div className={classes.wrapperInform}>
            <Typography variant="h4">
              Oops!...Chủ đề này chưa có từ vựng nào cả.
            </Typography>

            <Typography>
              Hãy tạo từ vựng bằng cách nhấn vào biểu tượng bên dưới
            </Typography>

            <AddCircleRoundedIcon
              className={classes.icon}
              color="primary"
              onClick={() => setIsOpenCreateVocabulary(true)}
            />
          </div>
        )}

        <CreateVocabulary
          isOpen={isOpenCreateVocabulary}
          setIsOpen={setIsOpenCreateVocabulary}
          handleCreateVocab={handleCreateVocab}
        />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={isOpenSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message="Thêm từ vựng thành công"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          style={{ zIndex: 10000 }}
        />
      </div>

      {openTest && <Test setOpenTest={setOpenTest} dataTest={dataTest} />}
    </div>
  );
};

export default VocabularyList;
