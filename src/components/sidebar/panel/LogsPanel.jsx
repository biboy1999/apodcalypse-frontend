import { useRef, useEffect } from "react";
import { FitAddon } from "xterm-addon-fit";
import { XTerm } from "xterm-for-react";
import { useRecoilValue } from "recoil";
import { containersSocket } from "../../../recoil/Socketio";
import { selectedContainerState } from "../../../recoil/Container";

const LogsPanel = () => {
  const term = useRef(null);
  const fitAddon = new FitAddon();

  const contianerSocket = useRecoilValue(containersSocket);

  const selectedContainer = useRecoilValue(selectedContainerState);

  useEffect(() => {
    contianerSocket.emit("listen_logs", selectedContainer.data.id, {
      tail: 200,
    });
    contianerSocket.on("logs", (character) => {
      term.current.terminal.write(character);
    });

    return () => {
      contianerSocket.emit("stop_listen_logs", selectedContainer.data.id);
      contianerSocket.removeAllListeners("logs");
      term.current.terminal.clear();
    };
  }, [selectedContainer]);

  // useEffect(() => {
  //   const logTimer = setInterval(() => {
  //     contianerSocket.volatile.emit(
  //       "logs",
  //       selectedContainer.data.id,
  //       { tail: 200 },
  //       (ack) => {
  //         console.log(new TextDecoder().decode(ack));
  //       },
  //     );
  //   }, 5000);

  //   return () => {
  //     clearInterval(logTimer);
  //   };
  // }, [selectedContainer]);

  useEffect(() => {
    fitAddon.fit();
    // ws.current.emit('resize', {"cols": term.current.terminal.cols, "rows": term.current.terminal.rows})
  });
  return (
    <>
      <div className="flex-box">
        <XTerm
          className="flex-tab"
          options={{ convertEol: true }}
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

export default LogsPanel;
