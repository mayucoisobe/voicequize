import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
// import 'regenerator-runtime';
import useStore from '../store';
import axios from 'axios';
// import { db } from '@/db';

export function VoiceRecorder({ isListening }) {
  const { voice } = useStore();
  const setVoice = useStore((state) => state.setVoice);
  // const [name, setName] = useState('');
  // const [status, setStatus] = useState('');
  // const [voice, setVoice] = useState('');

  // async function addVoice() {
  //   try {
  //     // Add the new voice!
  //     const id = await db.voices.add({
  //       name,
  //       voice,
  //     });

  //     setStatus(`Voice ${name} successfully added. Got id ${id}`);
  //     setName('');
  //   } catch (error) {
  //     setStatus(`Failed to add ${name}: ${error}`);
  //   }
  // }

  // 音声取得
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });

  // Blob URL → Blobに変換
  useEffect(() => {
    if (mediaBlobUrl) {
      axios
        .get(mediaBlobUrl, {
          responseType: 'blob',
        })
        .then(({ data }) => {
          setVoice(data); // Blobデータをstateへセット
          console.log(data); // Blobデータ
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [mediaBlobUrl]);

  // console.log('url', mediaBlobUrl); //Blob URL
  // console.log(voice); //Blobデータ

  useEffect(() => {
    isListening ? startRecording() : stopRecording();
  }, [isListening]);

  return (
    <>
      {/* <div>
        <div style={{ height: '38px' }}>
          <audio src={mediaBlobUrl} controls></audio>
        </div>
      </div> */}
      {/* <p style={{ marginTop: '50px' }}>{status}</p> */}
      {/* Name:
      <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} /> */}
      {/* <button onClick={addVoice}>Add</button> */}
    </>
  );
}
