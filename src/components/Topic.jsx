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

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "380px",
    margin: "auto",
    borderRadius: 0,

    "& .MuiCardContent-root": {
      padding: "0 0 16px 0",
    },

    "& .MuiTypography-body1": {
      marginLeft: "auto",
      marginRight: "10px",
      background: "#8FB339",
      padding: "0 10px",
      borderRadius: "15px",
    },
  },
});

const Topic = ({ content, background }) => {
  const classes = useStyles();
  content = content || "Chủ đề này vẫn chưa có từ vựng. Hãy thêm vào nhé!";

  return (
    <Card className={classes.root} style={{ background: `${background}25` }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{
              background: `${background}`,
              width: "100%",
              padding: "12px 16px 5px 16px",
              color: "#FFFAE3",
            }}
          >
            Communication
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ padding: "0px 16px", opacity: ".7", minHeight: "50px" }}
          >
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Tooltip title="Chỉnh sửa" arrow>
            <EditIcon />
          </Tooltip>
        </Button>

        <Button size="small" color="primary">
          <Tooltip title="Xóa" arrow>
            <DeleteIcon />
          </Tooltip>
        </Button>
        <Typography component="p">25/50</Typography>
      </CardActions>
    </Card>
  );
};

export default Topic;
