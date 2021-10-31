import { Icon, Card } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import UsageCard from "../../UsageCard";
import { containerUsageState } from "../../../recoil/Container";

const OverviewPanel = () => {
  const containerUsage = useRecoilValue(containerUsageState);
  const cpuUsage = Object.entries(containerUsage).map(([id, value]) => ({
    id: id.substr(0, 12),
    name: value.name,
    value: value.cpu,
  }));

  const memoryUsage = Object.entries(containerUsage).map(([id, value]) => ({
    id: id.substr(0, 12),
    name: value.name,
    value: value.memory,
  }));

  const totalMemory = 1.94 * 1024;

  return (
    <div className="infosidebar">
      <UsageCard
        total={100}
        title="CPU Usage"
        labelSuffix="%"
        data={cpuUsage}
      />
      <UsageCard
        total={totalMemory}
        title="Memory Usage"
        labelSuffix={` MiB / ${totalMemory} MiB`}
        data={memoryUsage}
      />
      <Card.Group centered className="horizontal">
        <Card style={{ width: "170px", alignItems: "center", minWidth: "0px" }}>
          <div>
            <Icon name="dice d6" size="huge" />
          </div>
          <Card.Content>
            <Card.Header>10</Card.Header>
            <Card.Description>Containers</Card.Description>
          </Card.Content>
        </Card>
        <Card style={{ width: "170px", alignItems: "center", minWidth: "0px" }}>
          <Icon name="window restore" size="huge" />
          <Card.Content>
            <Card.Header>N/A</Card.Header>
            <Card.Description>Images</Card.Description>
          </Card.Content>
        </Card>
        <Card style={{ width: "170px", alignItems: "center", minWidth: "0px" }}>
          <Icon name="sitemap" size="huge" />
          <Card.Content>
            <Card.Header>3</Card.Header>
            <Card.Description>Networks</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default OverviewPanel;
