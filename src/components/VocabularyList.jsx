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

  // x??? l?? t???o t??? v???ng
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
          alert("X???y ra l???i trong qu?? tr??nh th??m t??? v???ng!\n", err)
        );
    } else {
      alert("M???t ch??? ????? ch??? ???????c ch???a t???i ??a 50 t??? v???ng!");
    }
  };

  // x??? l?? x??a t??? v???ng
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
      .catch((err) => alert("X???y ra l???i trong qu?? tr??nh x??a t??? v???ng!\n", err));
  };

  // x??? l?? s???a t??? v???ng
  const handleEdit = (id, en, vi) => {
    const vocabsEdited = data.vocabs.map((vocab) => {
      if (vocab.id === id) return { ...vocab, en, vi };
      return vocab;
    });

    db.update({ vocabs: vocabsEdited }).catch((err) =>
      alert("X???y ra l???i trong qu?? tr??nh c???p nh???p!\n", err)
    );
  };

  // th??m t??? v???ng v??o ch??? ????? t??? v???ng hay qu??n
  const addForgetful = (id) => {
    // n???u scoreWrong l???n h??n 3, t??? v???ng s??? ???????c ????a v??o th?? m???c t??? v???ng hay qu??n
    // n???u ng?????i d??ng click v??o n??t hay qu??n, s??? t??ng scoreWrong c???a t??? v???ng l??n 5
    let vocab = {};
    const temp = data.vocabs.reduce((arr, cur) => {
      if (cur.id === id) {
        cur = { ...cur, scoreWrong: 5 };
        vocab = { ...cur };
      }
      arr.push(cur);
      return arr;
    }, []);

    // t??ng scoreWrong trong ch??? ?????
    db.update({
      vocabs: temp,
    }).catch((err) =>
      alert("Kh??ng th??? th??m t??? v???ng v??o th?? m???c t??? v???ng hay qu??n!\n", err)
    );
  };

  // x??? l?? m???, truy???n d??? li???u cho ch???c n??ng ki???m tra
  const handleTest = (type) => {
    const arrayDataTest = user.topicsList.reduce((arr, cur) => {
      if (cur.id === id) arr = [...cur.vocabs];
      return arr;
    }, []);

    let temp = [...arrayDataTest];
    if (type === "type2") {
      temp = [...arrayDataTest.sort(() => Math.random() - 0.5)]; // tr???n ph???n t??? c???a m???ng
    }

    if (temp.length >= 10) {
      setDataTest(temp);
      setOpenTest(true);
    } else {
      alert("B???n ph???i c?? ??t nh???t 10 t??? v???ng ????? th???c hi???n ki???m tra!");
    }
  };

  // m??? h???p tho???i th??ng b??o th??m t??? v???ng th??nh c??ng
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
                Kh??ng t??m th???y d??? li???u...!
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
              Oops!...Ch??? ????? n??y ch??a c?? t??? v???ng n??o c???.
            </Typography>

            <Typography>
              H??y t???o t??? v???ng b???ng c??ch nh???n v??o bi???u t?????ng b??n d?????i
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
          message="Th??m t??? v???ng th??nh c??ng"
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
