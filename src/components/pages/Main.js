import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Sidebar } from 'semantic-ui-react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { containerListState } from '../../recoil/atom/Container';
import { containerFlowState } from '../../recoil/selector/ContainerFlow'

import Infobar from '../Infobar/Infobar';
import FlowBaord from '../FlowBoard';

const Main = () => {

    // const [containers, setContainers] = useState(containerStatus);
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const setContainerList = useSetRecoilState(containerListState);
    const containerFlow = useRecoilValue(containerFlowState);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = io('http://localhost:8081')
        ws.current.on('connect', () => {
            console.log(ws.current.id);
        });
        ws.current.on('monitor', (data) => {
            console.log(data);
            setContainerList(data);
        });

        return () => {
            ws.current.disconnect();
        };
    }, [setContainerList]);

    return (
        <Sidebar.Pushable id='App'>
            <Sidebar
                animation='overlay'
                direction='right'
                visible={sideBarVisible}
                className='with-toolbar'
                style={{ overflow: 'hidden' }}
            >
                <Infobar
                    // containers={containerFlow}
                    onButtonClick={() => setSideBarVisible(!sideBarVisible)}
                    sideBarVisible={sideBarVisible}
                />
            </Sidebar>
            <Sidebar.Pusher>
                <FlowBaord
                    containers={containerFlow}
                />
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
}

export default Main;
