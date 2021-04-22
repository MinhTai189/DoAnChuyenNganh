import { makeStyles, TextField } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import CustomDialog from "./CustomDialog";

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

const CreateVocabulary = (props) => {
  const {
    isOpen,
    setIsOpen,
    handleCreateVocab,
    isMutiple = true,
    isEdit = false,
    enE,
    viE,
  } = props;
  const [en, setEn] = useState("");
  const [vi, setVi] = useState("");
  const enInput = useRef();

  // truyền dữ liệu để xử lý tạo từ vựng
  const createVocab = () => {
    if (en === "" || vi === "")
      alert(
        "Từ vựng và dịch nghĩa là 2 trường bắt buộc. Hãy nhập đầy đủ thông tin!"
      );
    else {
      handleCreateVocab(en, vi);
      setInitialValue();
      enInput.current.focus();
    }
  };

  const setInitialValue = () => {
    setEn(enE ? enE : "");
    setVi(viE ? viE : "");
  };

  useEffect(() => {
    if (isEdit) {
      setEn(enE);
      setVi(viE);
    }
  }, [enE, viE]);

  return (
    <CustomDialog
      open={isOpen}
      handleClose={setIsOpen}
      title={"Tạo từ vựng"}
      content={
        <CustomDialogContent
          en={en}
          setEn={setEn}
          vi={vi}
          setVi={setVi}
          enInput={enInput}
        />
      }
      cancel={"Hủy"}
      agree={"Tạo"}
      eventAgree={createVocab}
      eventCancel={setInitialValue}
      colorTitle={"transparent"}
      isMutiple={isMutiple}
    />
  );
};

export default CreateVocabulary;

// tạo phần nội dung của component CustomDialog
const CustomDialogContent = ({ en, setEn, vi, setVi, enInput }) => {
  const classes = useStyles();

  const onChangeEn = (e) => {
    setEn(e.target.value);
  };

  const onChangeVi = (e) => {
    setVi(e.target.value);
  };

  return (
    <>
      <div className={classes.row}>
        <div className="label">Từ vựng:</div>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          value={en}
          inputRef={enInput}
          onChange={onChangeEn}
        />
      </div>
      <div className={classes.row}>
        <div className="label">Dịch nghĩa:</div>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          value={vi}
          onChange={onChangeVi}
        />
      </div>
    </>
  );
};
