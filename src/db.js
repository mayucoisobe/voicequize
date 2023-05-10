import Dexie from 'dexie';
// IndexedDB の初期化
export const db = new Dexie('ownDatabase');
db.version(1).stores({
  voices: '++id, voice, img, answer, english', // Primary key and indexed props
});
