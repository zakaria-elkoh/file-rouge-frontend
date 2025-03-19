import { localStorageItems } from "../../common/constansts";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import useSocketContext from "../../socket/socketContext";
import { authReset } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../store/store";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { socket } = useSocketContext();

  const logoutHandler = () => {
    queryClient.clear();
    navigate("/login");
    localStorage.removeItem(localStorageItems.token);
    dispatch(authReset());
    socket.disconnect();
  };

  return logoutHandler;
};

export default useLogout;
