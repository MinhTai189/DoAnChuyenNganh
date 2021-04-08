import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import CreateTopic from "../components/CreateTopic";
import Nav from "../components/Nav";
import Tools from "../components/Tools";
import TopicList from "../components/TopicList";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}));

const HomePage = () => {
  const [isOpenCreateTopic, setIsOpenCreateTopic] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Nav />

      <TopicList setIsOpenCreateTopic={setIsOpenCreateTopic} />

      <CreateTopic
        isOpenCreateTopic={isOpenCreateTopic}
        setIsOpenCreateTopic={setIsOpenCreateTopic}
      />

      <Tools setIsOpenCreateTopic={setIsOpenCreateTopic} />
    </div>
  );
};

export default HomePage;
