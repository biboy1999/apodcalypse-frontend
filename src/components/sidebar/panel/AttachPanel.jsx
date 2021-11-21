import { useRef, useEffect } from "react";
import { FitAddon } from "xterm-addon-fit";
import { XTerm } from "xterm-for-react";
// import 'xterm/css/xterm.css'
// import { Terminal } from 'xterm';

const AttachPanel = () => {
  const term = useRef(null);
  const fitAddon = new FitAddon();

  // const ws = useRef(null);

  // useEffect(() => {
  //     ws.current = io('http://localhost:5000/pty')
  //     ws.current.on('pty-output', (data) => {
  //       console.log("new output", data);
  //       term.current.terminal.write(data.output);
  //     });

  //     return () => {
  //         ws.current.disconnect();
  //     };
  // }, []);

  useEffect(() => {
    fitAddon.fit();
    // ws.current.emit('resize', {"cols": term.current.terminal.cols, "rows": term.current.terminal.rows})
  });

  return (
    <>
      <div className="flex-box">
        <XTerm
          className="flex-tab"
          ref={term}
          addons={[fitAddon]}
          onResize={fitAddon.fit()}
          // onKey={(e)=>{
          //   ws.current.emit('pty-input', {'input': e.key});
          // }}
        />
      </div>
    </>
  );
};

export default AttachPanel;
