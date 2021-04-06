import { Grid, Typography } from "@material-ui/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { makeStyles } from "@material-ui/styles";
import Topic from "./Topic";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import Bar from "./Bar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    margin: "0 auto",
    width: "100%",
    maxWidth: 1100,
    minHeight: "calc(100vh - 55px)",
  },
  wrapperInform: {
    textAlign: "center",
    paddingTop: "50px",
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
}));

const TopicList = ({ setIsOpenCreateTopic }) => {
  const classes = useStyles();
  const content = `Lizards are a widespread group of squamate reptiles, with over 6,000
  species, ranging across all continents except Antarctica`;

  return (
    <div className={classes.root}>
      {/* <div className={classes.wrapperInform}>
        <Typography variant="h4">Oops!...Bạn chưa có chủ đề nào cả.</Typography>

        <Typography>
          Hãy tạo cho mình một chủ đề bằng cách nhấn vào nút bên dưới
        </Typography>

        <AddCircleRoundedIcon
          className={classes.icon}
          color="primary"
          onClick={() => setIsOpenCreateTopic(true)}
        />
      </div> */}
      {/* Không có topic sẽ hiển thị */}

      {/* <Bar />  thanh công cụ của trang topic */}

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter={"20px"}>
          <Topic content={content + content} background={"#f44336"} />
          <Topic content={content + content + content} background={"#607d8b"} />
          <Topic content={""} background={"#cddc39"} />
          <Topic content={content + content} background={"#673ab7"} />
          <Topic content={content} background={"#e91e63"} />
          <Topic content={content} background={"#03a9f4"} />
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default TopicList;
