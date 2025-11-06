import axiosClient from "@/api/axiosClient"
import API_PATH from "@/configs/API_PATH"

class UserService {
  static async login(body) {
    const {data} = await axiosClient.post(API_PATH.LOGIN, body);
    return data;
  }
}

export default UserService;