import ContainerNode from './ContainerNode';
import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';
import { useSetRecoilState } from 'recoil';
import { selectedContainerState } from '../recoil/atom/Container';

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const initialElements = [
  {
    id: '3', data: {
      name: 'frontend suck',
      id: 'ffffff0001',
      fullID: 'b790e671d48ee5c24c53e5741d0f84d6db02603686be3ef58be8cd28bd1571aa',
      status: 'Up 1 weeks',
      healthyStatus: 'unhealthy',
      cpu: 13,
      memory: 1024,
      totalMemory: 4096,
      processCount: 10,
    }, position: { x: 100, y: 300 }, type: 'container'
  },
  {
    id: '4', data: {
      name: 'frontend suck',
      id: 'ffffff0002',
      fullID: 'b790e671d48ee5c24c53e5741d0f84d6db02603686be3ef58be8cd28bd1571aa',
      status: 'Up 1 weeks',
      healthyStatus: 'healthy',
      cpu: 13,
      memory: 1024,
      totalMemory: 4096,
      processCount: 7,
    }, position: { x: 400, y: 300 }, type: 'container'
  },
  {
    id: '5', data: {
      name: 'why testing a fucking long name_maybe_docker_compose_will_have_lol_add_more_text_testing_title_over_flow just_a_lot_longer_word_test_test_test_test',
      id: 'ffffff0003',
      fullID: 'b790e671d48ee5c24c53e5741d0f84d6db02603686be3ef58be8cd28bd1571aa',
      status: 'Up 2 days',
      healthyStatus: 'starting',
      cpu: 1,
      memory: 512,
      totalMemory: 1024,
      processCount: 2,
    }, position: { x: 700, y: 300 }, type: 'container'
  },
];

const nodeTypes = {
  container: ContainerNode,
}

const FlowBaord = (props) => {
  const [elements, setElements] = useState(initialElements);
  const setSelectedContainer = useSetRecoilState(selectedContainerState);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onSelectionChange = (e) => setSelectedContainer(e?.filter(e=> e.type === 'container')?.[0]);

  useEffect(() => {
    setInterval(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === '4') {
            el.data = {
              ...el.data,
              cpu: Math.floor(Math.random() * 100),
              memory: Math.floor(Math.random() * 4096),
              processCount: Math.floor(Math.random() * 10),
            };
          }
          return el;
        })
      );
    }, 5000);
  }, [setElements]);


  return (
    <ReactFlow id="App"
      elements={elements}
      // elements={props.containers}
      nodeTypes={nodeTypes}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      // onElementClick={(event, ele) => console.log(ele)}
      onSelectionChange={onSelectionChange}

    // snapToGrid={true}
    // snapGrid={[15, 15]}
    >
      <Controls style={{ left: '220px', bottom: '51px' }} />
      <MiniMap style={{ left: '10px', bottom: '10px' }} />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}

export default FlowBaord;
