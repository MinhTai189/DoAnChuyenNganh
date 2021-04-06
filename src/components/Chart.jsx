import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Chart = ({ width, height }) => {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    setDataChart([
      { name: "T2", minutes: 65 },
      { name: "T3", minutes: 10 },
      { name: "T4", minutes: 0 },
      { name: "T5", minutes: 130 },
      { name: "T6", minutes: 100 },
      { name: "T7", minutes: 3 },
      { name: "CN", minutes: 161 },
    ]);
  }, []);

  return (
    <LineChart
      width={width}
      height={height}
      data={dataChart}
      margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
    >
      <Line type="monotone" dataKey="minutes" stroke="#8fb339" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
