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
    term.current.terminal.clear();
    contianerSocket.emit("listen_logs", selectedContainer.data.id, {
      tail: 200,
    });
    contianerSocket.on("logs", (line) => {
      term.current.terminal.writeln(line);
    });

    return () => {
      contianerSocket.emit("stop_listen_logs", selectedContainer.data.id);
      contianerSocket.removeAllListeners("logs");
    };
  }, [selectedContainer]);

  useEffect(() => {
    fitAddon.fit();
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
        />
      </div>
    </>
  );
};

export default LogsPanel;
