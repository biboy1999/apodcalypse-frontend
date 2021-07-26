import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import './App.css';
import Main from './components/pages/Main'


function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);
  return null;
};

const App = () => {
  return (
    <RecoilRoot>
      {/* <DebugObserver /> */}
      <Main />
    </RecoilRoot>
  );
}

export default App;
