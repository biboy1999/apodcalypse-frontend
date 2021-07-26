import { selector } from 'recoil';
import { Container } from 'semantic-ui-react';
import { containerListState } from '../atom/Container';

const containerFlowState = selector({
    key: 'containerFlowState',
    get: ({ get }) => {
        const containerList = get(containerListState);

        return containerList.map((container) => {
            return {
                id: container.Id.substring(0, 12),
                data: {
                    id: container.Id.substring(0, 12),
                    fullID: Container.Id,
                    name: container.Names.join(','),
                    status: container.Status,
                    healthyStatus: 'Unknown',
                    cpu: 50,
                    memory: 1024,
                    totalMemory: 4096,
                    processCount: 0,
                },
                position: { x: 100, y: 300 },
                type: 'container'
            }
        });
    },
});


export { containerFlowState };
// const initialElements = [
//     {
//       id: '3', data: {
//         name: 'frontend suck',
//         id: 'ffffff0001',
//         status: 'Up 1 weeks',
//         healthyStatus: 'unhealthy',
//         cpu: 13,
//         memory: 1024,
//         totalMemory: 4096,
//         processCount: 10,
//       }, position: { x: 100, y: 300 }, type: 'container'
//     }
//]