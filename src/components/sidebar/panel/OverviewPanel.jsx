import { Icon, Card } from "semantic-ui-react";
import UsageCard from "../../UsageCard";

const OverviewPanel = () => (
  <div className="infosidebar">
    <UsageCard
      total={100}
      title="CPU Usage"
      labelSuffix="%"
      data={[
        { id: "4c01db0b339c", name: "frondend suck", value: 30 },
        { id: "d7886598dbe2", name: "test", value: 17 },
        { id: "e90b8831a4b8", name: "why", value: 31 },
      ]}
    />
    <UsageCard
      total={8192}
      title="Memory Usage"
      labelSuffix=" MiB / 8192 MiB"
      data={[
        { id: "4c01db0b339c", name: "frondend suck", value: 1024 },
        { id: "d7886598dbe2", name: "test", value: 4096 },
        { id: "e90b8831a4b8", name: "why", value: 254 },
        { id: "0a058871a4b8", name: "why", value: 254 },
      ]}
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
          <Card.Header>5</Card.Header>
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

export default OverviewPanel;
