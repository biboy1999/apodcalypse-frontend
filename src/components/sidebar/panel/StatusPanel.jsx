import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { chartData } from "../../../temp/initial-elements";

const StatusPanel = () => (
  <>
    <div className="flex-box">
      <h1>CPU</h1>
      <ResponsiveContainer maxHeight={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="cpu"
            stroke="#8884d8"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <h1>Memory</h1>
      <ResponsiveContainer maxHeight={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={[0, 8192]} />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="memory"
            stroke="#8884d8"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <h1>idk more?</h1>
      <ResponsiveContainer maxHeight={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="memory"
            stroke="#8884d8"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </>
);

export default StatusPanel;
