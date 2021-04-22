import { useEffect, useState, useRef } from "react";
import axios from "../axios";
import Speech from "react-speech";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/UserSlice";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import HighlightIcon from "@material-ui/icons/Highlight";
import CreateVocabulary from "./CreateVocabulary";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(1.5),

    "& .MuiButtonBase-root": {
      cursor: "default !important",
    },

    "& .MuiAccordionSummary-root": {
      borderBottom: "1px solid #999",
    },
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  left: {
    flexBasis: 150,

    "& .MuiTypography-body1": {
      fontWeight: 600,
      textTransform: "capitalize",
    },
  },
  speaker: {
    display: "grid",
    placeItems: "center",
    marginLeft: 8,

    "& span": {
      display: "inline-block",
    },

    "& span button": {
      width: 18,
      height: 18,
      background: `${theme.palette.primary.main}94 !important`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: ".3s ease-out",

      "&:hover": {
        transform: "scale(1.08)",
        transition: ".3s ease-out",
        background: `${theme.palette.primary.main} !important`,
      },

      "& svg": {
        fill: "#000",
        width: 16,
        height: 16,
      },
    },
  },
  middle: {
    flex: 2,
    textTransform: "lowercase",

    "& .MuiTypography-body1": {
      textTransform: "lowercase",
    },
  },
  right: {
    "& div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 28,
      height: 28,
      background: theme.palette.primary.main,
      borderRadius: 100,
      marginLeft: 8,
      cursor: "pointer",
      transition: "0.3s",

      "&:hover": {
        opacity: 0.75,
        boxShadow: theme.shadows[4],
      },

      "& .MuiSvgIcon-root": {
        marginLeft: 0,
        width: 18,
        height: 18,
        fill: `${theme.palette.text.primary} !important`,
      },
    },
  },
}));

const Vocabulary = (props) => {
  const classes = useStyles();
  const {
    data,
    hanleRemoveVocab,
    isAddForgetful = true,
    handleEdit,
    expanded,
    setExpanded,
    idTopic,
    addForgetful,
  } = props;

  const [isOpenCreateVocabulary, setIsOpenCreateVocabulary] = useState(false);
  const [addiContent, setAddiContent] = useState();
  const { id, en, vi, scoreWrong } = data;

  const user = useSelector(selectUser);
  const subContent = useRef();

  const handleChange = () => {
    setExpanded((before) => {
      if (before === id) return null;
      return id;
    });
  };

  // Lấy dữ liệu từ trang tracau.vn
  const getData = async () => {
    const response = await axios.get(`/s/${en}/en`);
    setAddiContent(response.data);
  };

  useEffect(() => {
    addiContent && addSubContent();
  }, [addiContent]);

  useEffect(() => {
    getData();
  }, []);

  // xử lý dữ liệu đã tải về từ trang tracau.vn
  const addSubContent = () => {
    if (addiContent.tratu.length !== 0) {
      let content = addiContent?.tratu[0]?.fields?.fulltext;

      content = content.substring(
        content.search("<table"),
        content.search("</table>") + 8
      );
      subContent.current.innerHTML = content;
    } else subContent.current.innerHTML = "Không tìm thấy dữ liệu";
  };

  // truyền dữ liệu về component VocabularyList để xử lý chức năng xóa
  const onClickRemove = () => {
    hanleRemoveVocab(data);
  };

  // truyền dữ liệu về component VocabularyList để xử lý chức năng sửa
  const tranDataEdit = (en, vi) => {
    handleEdit(id, en, vi);
  };

  // truyền dữ liệu về component VocabularyList để xử lý chức năng thêm từ vựng hay quên
  const tranForgetful = () => {
    addForgetful(id);
  };

  return (
    <>
      <div className={classes.root}>
        <Accordion expanded={expanded === id}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.content}>
              <div className={`${classes.flex} ${classes.left}`}>
                <Typography>{en}</Typography>
                <div className={classes.speaker}>
                  <Speech
                    text={en}
                    lang="EN-US"
                    voice="Google UK English Female"
                  />
                </div>
              </div>

              <Typography className={classes.middle}>{vi}</Typography>

              <div className={`${classes.flex} ${classes.right}`}>
                <div onClick={handleChange}>
                  <Tooltip title="Thông tin thêm">
                    <MoreHorizIcon />
                  </Tooltip>
                </div>

                <div onClick={() => setIsOpenCreateVocabulary(true)}>
                  <Tooltip title="Sửa">
                    <EditIcon />
                  </Tooltip>
                </div>

                <div onClick={onClickRemove}>
                  <Tooltip title="Xóa">
                    <DeleteIcon />
                  </Tooltip>
                </div>

                {isAddForgetful && (
                  <div
                    style={{ background: scoreWrong >= 3 && "#ec2929" }}
                    onClick={tranForgetful}
                  >
                    <Tooltip
                      title={
                        scoreWrong >= 3
                          ? "Đã ở trong mục hay quên"
                          : "Đánh dấu từ vựng hay quên"
                      }
                    >
                      <HighlightIcon />
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div ref={subContent}></div>
          </AccordionDetails>
        </Accordion>
      </div>

      <CreateVocabulary
        isOpen={isOpenCreateVocabulary}
        setIsOpen={setIsOpenCreateVocabulary}
        handleCreateVocab={tranDataEdit}
        isEdit={true}
        enE={en}
        viE={vi}
        isMutiple={false}
      />
    </>
  );
};

export default Vocabulary;
