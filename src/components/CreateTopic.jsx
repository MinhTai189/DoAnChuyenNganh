import CustomDialog from "./CustomDialog";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),

    "& .label": {
      flex: "110px",
      fontSize: 15,
    },
  },
  textField: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
    },
  },
}));

const CreateTopic = ({ isOpenCreateTopic, setIsOpenCreateTopic }) => {
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("transparent");

  const createTopic = () => {
    if (background == "transparent" || title == "") {
      setIsOpenCreateTopic(true);
      alert("Tiêu đề và màu nền là trường bắt buộc!");
    } else {
      console.log("title: ", title, " background: ", background);
      setInitialValue();
    }
  };

  const setInitialValue = () => {
    setTitle("");
    setBackground("transparent");
  };

  return (
    <CustomDialog
      open={isOpenCreateTopic}
      close={setIsOpenCreateTopic}
      title={"Tạo chủ đề"}
      content={
        <CustomDialogContent
          title={title}
          setTitle={setTitle}
          setBackground={setBackground}
        />
      }
      cancel={"Hủy"}
      agree={"Tạo"}
      eventAgree={createTopic}
      eventCancel={setInitialValue}
      colorTitle={background}
    />
  );
};

export default CreateTopic;

// tạo phần nội dung của component CustomDialog
const CustomDialogContent = ({ title, setTitle, setBackground }) => {
  const classes = useStyles();

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div className={classes.row}>
        <div className="label">Tên chủ đề:</div>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          value={title}
          onChange={onChange}
        />
      </div>
      <div className={classes.row}>
        <div className="label">Màu nền:</div>
        <ColorPicker setBackground={setBackground} />
      </div>
    </>
  );
};
