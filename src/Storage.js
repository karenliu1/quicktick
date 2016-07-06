import { AsyncStorage } from 'react-native';

const SESSIONS_KEY = 'checkins';

function getUniqueId(sessions) {
  if (sessions.length === 0) {
    return 1;
  }
  return Math.max(...sessions.map((s) => s.id)) + 1;
}

function parseSession(session) {
  return {
    ...session,
    startTime: new Date(session.startTime),
    endTime: new Date(session.endTime),
  };
}

export default class Storage {
  static async getSessions() {
    let sessions;
    try {
      sessions = await AsyncStorage.getItem(SESSIONS_KEY);
    } catch (error) {
      throw new Error('Could not get sessions:', error);
    }

    return sessions ? JSON.parse(sessions).map(parseSession) : [];
  }

  static async createSession(startTime, endTime) {
    const sessions = await Storage.getSessions();
    const session = {
      id: getUniqueId(sessions),
      startTime,
      endTime,
    };

    const newSessions = [
      ...sessions,
      session
    ];

    try {
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
    } catch (error) {
      throw new Error('Could not save sessions:', error);
    }

    return session;
  }


  static async editSession(session) {
    const sessions = await Storage.getSessions();
    const sessionIndex = sessions.findIndex((s) => s.id === session.id);

    if (sessionIndex < 0) {
      throw new Error(`Could not find session ${session.id}`);
    }

    const newSessions = [
      ...sessions.slice(0, sessionIndex),
      session,
      ...sessions.slice(sessionIndex + 1),
    ];

    try {
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
    } catch (error) {
      throw new Error(`Could not save session ${session.id}:`, error);
    }
  }

  static async deleteSession(session) {
    const sessions = await Storage.getSessions();
    const sessionIndex = sessions.findIndex((s) => s.id === session.id);

    if (sessionIndex < 0) {
      throw new Error(`Could not find session ${session.id}`);
    }

    const newSessions = [
      ...sessions.slice(0, sessionIndex),
      ...sessions.slice(sessionIndex + 1),
    ];

    try {
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
    } catch (error) {
      throw new Error(`Could not save session ${session.id}:`, error);
    }
  }
}
