import { db } from '@/db';

export function ClearIndexedDB() {
  db.transaction('rw', db.tables, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
    console.log('ボイスデータ削除');
  });
  return;
}
