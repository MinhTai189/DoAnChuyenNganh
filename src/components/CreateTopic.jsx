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

const CreateTopic = (props) => {
  const {
    title,
    backgroundP,
    isOpen,
    setIsOpen,
    handleCreateTopic,
    isEdit,
  } = props;
  const [topic, setTopic] = useState("");
  const [background, setBackground] = useState("transparent");

  const createTopic = () => {
    if (background === "transparent" || topic === "") {
      setIsOpen(true);
      alert("Tiêu đề và màu nền là trường bắt buộc!");
    } else {
      handleCreateTopic(topic, background);
      setInitialValue();
    }
  };

  const setInitialValue = () => {
    setTopic(title ? title : "");
    setBackground(backgroundP ? backgroundP : "transparent");
  };

  useEffect(() => {
    if (isEdit) {
      setTopic(title);
      setBackground(backgroundP);
    }
  }, [title, backgroundP]);

  return (
    <CustomDialog
      open={isOpen}
      handleClose={setIsOpen}
      title={"Tạo chủ đề"}
      content={
        <CustomDialogContent
          topic={topic}
          setTopic={setTopic}
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
const CustomDialogContent = ({ topic, setTopic, setBackground }) => {
  const classes = useStyles();

  const onChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <>
      <div className={classes.row}>
        <div className="label">Tên chủ đề:</div>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          value={topic}
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
