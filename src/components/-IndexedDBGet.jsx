import { db } from '@/db';
import { useLiveQuery } from 'dexie-react-hooks';

export function IndexedDBGet() {
  const IndexedData = useLiveQuery(async () => {
    //
    // Query Dexie's API
    //
    const voicesData = await db.voices.toArray();
    // Convert blob to URL
    const blobUrls = voicesData.map((data) => {
      if (data.voice) {
        const url = URL.createObjectURL(data.voice);
        return { ...data, blobUrl: url };
      } else {
        return { ...data, blobUrl: '' };
      }
    });

    console.log(blobUrls);
    return blobUrls;
  });
  console.log(IndexedData);
}
