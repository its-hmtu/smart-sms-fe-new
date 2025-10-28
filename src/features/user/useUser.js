import { useDispatch, useSelector } from "react-redux";
import { curUser, loginUser, logoutUser } from "./userSlice";
function useUser() {
  const dispatch = useDispatch();
  const user = useSelector(curUser);

  const login = (payload) => dispatch(loginUser(payload));
  const logout = () => dispatch(logoutUser());

  return {
    user,
    login,
    logout,
  }
}

export default useUser;