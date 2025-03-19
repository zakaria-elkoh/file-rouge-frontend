import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../services/api";
import { io, Socket } from "socket.io-client";
import { getCurrentUser } from "../store/selectors/appSelectors";

const SocketContext = createContext<{ socket: Socket }>({} as any);

const socket = io(SERVER_URL, { autoConnect: false });

const SocketContextProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (!currentUser) return;

    socket.auth = { ...currentUser };
    socket.connect();
  }, [currentUser]);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected");

      // Emit message to all connected friends
    };
    socket.on("connect", onConnect);
    return () => {
      socket.removeListener("connect", onConnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocketContext = () => useContext(SocketContext);

export { SocketContextProvider };
export default useSocketContext;
