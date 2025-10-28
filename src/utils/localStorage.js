class LocalStorageUtil {
  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}

class UserInfoStorage extends LocalStorageUtil {
  static USER_INFO_KEY = 'user';
  static saveUserInfo(userInfo) {
    this.setItem(this.USER_INFO_KEY, userInfo);
  }

  static getUserInfo() {
    return this.getItem(this.USER_INFO_KEY);
  }

  static removeUserInfo() {
    this.removeItem(this.USER_INFO_KEY);
  }
}

export { UserInfoStorage, LocalStorageUtil };