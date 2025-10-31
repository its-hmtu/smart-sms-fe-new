import axiosClient from "@/api/axiosClient"
import API_PATH from "@/configs/API_PATH"

class UserService {
  static async login(body) {
    const response = await axiosClient.post(API_PATH.LOGIN, body);

    return response.data;
  }
}

export default UserService;