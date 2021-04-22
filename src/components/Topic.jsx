import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CreateTopic from "./CreateTopic";
import { firebaseStore, decrement } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/UserSlice";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "380px",
    margin: "auto",
    borderRadius: 0,
    boxShadow: theme.shadows[1],

    "& .MuiCardContent-root": {
      padding: "0 0 16px 0",
    },

    "& .MuiTypography-body1": {
      marginLeft: "auto",
      marginRight: "10px",
      background: "#8FB339",
      padding: "0 10px",
      borderRadius: "15px",
      minWidth: 40,
      textAlign: "center",
    },

    "& .MuiTypography-h5": {
      color: theme.palette.text.primary,
    },

    "& .MuiButton-root": {
      minWidth: 60,
    },
  },
}));

const Topic = ({
  id,
  title,
  content,
  background,
  isForgetful = false,
  setDataPrint,
}) => {
  const classes = useStyles();
  const [isOpenCreateTopic, setIsOpenCreateTopic] = useState(false);
  const user = useSelector(selectUser);
  const history = useHistory();
  const db = firebaseStore.collection("accounts").doc(user.email);

  const [countVocab, setCountVocab] = useState(0);
  const arrVocab = content ? [...content] : [];
  arrVocab.sort(() => Math.random() - 0.5); // trộn phần từ của mảng

  // xử lý xóa chủ đề
  const hanleRemoveTopic = () => {
    db.collection("topicsList")
      .doc(id)
      .delete()
      .then(() =>
        db.update({
          countTopic: decrement,
        })
      )
      .catch((err) => alert("Xảy ra lỗi trong quá trình xóa dữ liệu\n", err));
  };

  // xử lý chỉnh sửa chủ đề
  const handleEditTopic = (topic, background) => {
    db.collection("topicsList")
      .doc(id)
      .update({
        topic,
        background,
      })
      .catch((err) => alert("Xảy ra lỗi trong quá trình cập nhật\n", err));
  };

  // truyền dữ liệu xử lý in danh sách từ vựng
  const handlePrint = () => {
    setDataPrint(content);
  };

  // chuyển hướng vào trong topic list
  const onClickDirect = () => {
    history.push(`/topic/${id}`);
  };

  useEffect(() => {
    const getCountVocab = async () => {
      const reponse = await db.collection("topicsList").doc(id).get();

      reponse.exists && setCountVocab(reponse.data().countVocab);
    };

    !isForgetful && getCountVocab();
  }, []);

  return (
    <>
      <Card
        className={classes.root}
        style={{
          background: isForgetful ? `${background}75` : `${background}25`,
          boxShadow: isForgetful && "3px 3px 5px rgba(0,0,0,0.5)",
        }}
      >
        <CardActionArea onClick={onClickDirect}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{
                background: `${background}`,
                width: "100%",
                padding: "12px 16px 5px 16px",
                textTransform: "capitalize",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ padding: "0px 16px", opacity: ".7", minHeight: "50px" }}
            >
              {content && content.length > 0 ? (
                <ul style={{ listStyleType: "none" }}>
                  {content.slice(0, 8).map((sub, index) => {
                    return (
                      <li
                        key={index}
                      >{`${sub.en.toLowerCase()}: ${sub.vi.toLowerCase()}`}</li>
                    );
                  })}
                </ul>
              ) : (
                "Chủ đề này chưa có từ vựng. Hãy thêm từ vựng vào nhé!"
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {!isForgetful && (
            <>
              <Button
                size="small"
                color="primary"
                onClick={() => setIsOpenCreateTopic(true)}
              >
                <Tooltip title="Chỉnh sửa" arrow>
                  <EditIcon />
                </Tooltip>
              </Button>

              <Button size="small" color="primary" onClick={hanleRemoveTopic}>
                <Tooltip title="Xóa" arrow>
                  <DeleteIcon />
                </Tooltip>
              </Button>
            </>
          )}

          <Button size="small" color="primary" onClick={handlePrint}>
            <Tooltip title="Xuất danh sách" arrow>
              <ReceiptIcon />
            </Tooltip>
          </Button>

          <Typography
            component="p"
            color={countVocab >= 49 ? "#ec2929" : "initial"}
          >
            {isForgetful
              ? ` ${user.data.forgetful.countVocab} `
              : `${countVocab}/50`}
          </Typography>
        </CardActions>
      </Card>

      <CreateTopic
        isOpen={isOpenCreateTopic}
        setIsOpen={setIsOpenCreateTopic}
        title={title}
        backgroundP={background}
        handleCreateTopic={handleEditTopic}
        isEdit={true}
      />
    </>
  );
};

export default Topic;
