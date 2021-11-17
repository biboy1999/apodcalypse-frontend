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
import { useRecoilValue } from "recoil";
import { chartData } from "../../../temp/initial-elements";
import {
  selectedContainerState,
  containerUsageState,
} from "../../../recoil/Container";

const statuslist = {
  conatinerId: "",
  status: [...Array(50)].map(() => ({
    time: null,
    cpu: 0,
    memory: 0,
  })),
};

const StatusPanel = () => {
  const selectedContainer = useRecoilValue(selectedContainerState);
  const containerUsage = useRecoilValue(containerUsageState);

  console.log(statuslist);
  if (selectedContainer.data.id === statuslist.conatinerId) {
    statuslist.status.shift();
    statuslist.status.push({
      time: null,
      cpu: containerUsage[selectedContainer.data.id].cpu,
      memory: containerUsage[selectedContainer.data.id].memory,
    });
  } else {
    statuslist.conatinerId = selectedContainer.data.id;
    statuslist.status = [...Array(50)].map(() => ({
      time: null,
      cpu: 0,
      memory: 0,
    }));
  }

  return (
    <>
      <div className="flex-box">
        <h1>CPU</h1>
        <ResponsiveContainer maxHeight={300}>
          <LineChart
            data={statuslist.status}
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
            data={statuslist.status}
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
      </div>
    </>
  );
};

export default StatusPanel;
