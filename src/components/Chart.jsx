import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Chart = ({ width, height, data }) => {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    // biến đổi mảng đối tượng thành kiểu dữ liệu của chart ({name: value, minutes: value})
    const temp = data.reduce((arr, cur, index) => {
      const name = index > 5 ? "CN" : `T${index + 2}`;
      let minutes = 0;

      if (typeof cur !== "number") minutes = cur.minutes;
      arr.push({ name, minutes });
      return arr;
    }, []);

    setDataChart(temp);
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
