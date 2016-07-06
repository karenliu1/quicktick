import { AsyncStorage } from 'react-native';

const SESSIONS_KEY = 'checkins';

export default class Storage {
  static async getSessions() {
    let sessions;
    try {
      sessions = await AsyncStorage.getItem(SESSIONS_KEY);
    } catch (error) {
      throw new Error('Could not get sessions:', error);
    }

    return sessions ? JSON.parse(sessions) : [];
  }

  static async createSession(startTime, endTime, notes) {
    const sessions = await Storage.getSessions();

    sessions.push({
      id: sessions.length,
      startTime,
      endTime,
      notes
    });

    try {
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      throw new Error('Could not save sessions:', error);
    }
  }


  static async editSession(sessionId, startTime, endTime, notes) {
    const sessions = await Storage.getSessions();
    const sessionIndex = sessions.findIndex((session) => session.id === sessionId);

    if (sessionIndex < 0) {
      throw new Error(`Could not find session ${sessionId}`);
    }

    sessions[sessionIndex].startTime = startTime;
    sessions[sessionIndex].endTime = endTime;
    sessions[sessionIndex].notes = notes;

    try {
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      throw new Error(`Could not save session ${sessionId}:`, error);
    }
  }
}
