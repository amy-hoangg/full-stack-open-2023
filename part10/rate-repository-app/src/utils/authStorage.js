import AsyncStorage from '@react-native-async-storage/async-storage';
//asyncstorage is a react native module that provides an asyn storage system to store data persistently in the device

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getKey(key) {
    return `${this.namespace}:${key}`;
  }

  getAccessToken() {
    return AsyncStorage.getItem(this.getKey('accessToken'));
  }

  setAccessToken(accessToken) {
    return AsyncStorage.setItem(this.getKey('accessToken'), accessToken);
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(this.getKey('accessToken'));
  }
}

export default AuthStorage;

//the constructor is a special method that gets called when an instance of the class is created. 
//takes an optional parameter namespace which is used to set the namespace for the keys to store data 

