import { AsyncStorage } from 'react-native';

const SESSIONS_KEY = 'checkins';

export default class Storage {
  static async saveSession(startTime, endTime, notes) {
    let sessions;
    try {
      sessions = await AsyncStorage.getItem(SESSIONS_KEY);
    } catch (error) {
      throw new Error('Error getting sessions from storage:', error);
    }

    sessions = sessions ? JSON.parse(sessions) : [];
    sessions.push({startTime, endTime, notes});

    try {
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      throw new Error('Error saving sessions in storage:', error);
    }
  }
}
