import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  namespace = 'auth';

  constructor(namespace = 'auth') {
    this.namespace = namespace;

    this.getAccessToken = this.getAccessToken.bind(this);
    this.setAccessToken = this.setAccessToken.bind(this);
    this.removeAccessToken = this.removeAccessToken.bind(this);
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`,
    );

    return accessToken ? accessToken : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      accessToken,
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;