import { makeStyles, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import ConfigTest from "./ConfigTest";
import FillTest from "./ContentTest";
import ResultTest from "./ResultTest";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
  },
  cover: {
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
  },
  paper: {
    width: "100%",
    height: "70%",
    minHeight: 550,
    maxWidth: 400,
    background: theme.palette.background.paper,
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: 0,
    boxShadow: theme.shadows[10],

    [theme.breakpoints.down(500)]: {
      maxWidth: "100vw",
      height: "100vh",
      top: 0,
      left: 0,
      transform: "translateX(0)",
    },
  },

  content: {
    height: "100%",
    width: "100%",
  },
}));

const Test = ({ setOpenTest, dataTest }) => {
  const classes = useStyles();
  const [config, setConfig] = useState({
    mode: "fill",
    direc: "en",
    amount: 10,
  });
  const [index, setIndex] = useState(0);

  const [beginTest, setBeginTest] = useState(false);
  const [currentVocab, setCurrentVocab] = useState({});
  const array = [...dataTest];

  const [result, setResult] = useState({
    score: 0,
    wrong: [],
  });

  useEffect(() => {
    if (index < config.amount)
      setCurrentVocab(array.slice(index, index + 1)[0]);
  }, [index]);

  return (
    <div className={classes.root}>
      <div
        className={classes.cover}
        onClick={() => {
          beginTest
            ? window.confirm(
                "Bạn đang thực hiện kiểm tra. Bạn có thực sự muốn thoát?"
              ) && setOpenTest(false)
            : setOpenTest(false);
        }}
      ></div>
      <Paper className={classes.paper}>
        <div className={classes.content}>
          {index < config.amount ? (
            beginTest ? (
              <FillTest
                key={index}
                mode={config.mode}
                amount={config.amount}
                currentVocab={currentVocab}
                index={index}
                setIndex={setIndex}
                result={result}
                setResult={setResult}
                isEn={config.direc === "en" ? true : false}
              />
            ) : (
              <ConfigTest
                config={config}
                setConfig={setConfig}
                setBeginTest={setBeginTest}
                setOpenTest={setOpenTest}
                amount={array.length}
              />
            )
          ) : (
            <ResultTest
              result={result}
              amount={config.amount}
              setOpenTest={setOpenTest}
              dataTest={array.slice(0, config.amount)}
              setBeginTest={setBeginTest}
            />
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Test;
