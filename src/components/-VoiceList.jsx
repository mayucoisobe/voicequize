import Image from 'next/image';
import { db } from '@/db';
import { useLiveQuery } from 'dexie-react-hooks';

export function VoiceList() {
  const voices = useLiveQuery(async () => {
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

  return (
    <ul>
      {voices?.map((voice) => (
        <li key={voice.id}>
          <Image src={`/images/questions/${voice.img}.jpg`} width={250} height={250} alt="車画像" />
          <audio controls src={voice.blobUrl}></audio>
        </li>
      ))}
    </ul>
  );
}
