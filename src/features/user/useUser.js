import { useDispatch, useSelector } from "react-redux";
import { curUser, loginUser, logoutUser } from "./userSlice";
function useUser() {
  const dispatch = useDispatch();
  const user = useSelector(curUser);

  const saveLoginInfo = (payload) => dispatch(loginUser(payload));
  const logout = () => dispatch(logoutUser());

  return {
    user,
    saveLoginInfo,
    logout,
  }
}

export default useUser;