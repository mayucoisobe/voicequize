import { create } from 'zustand';

const useStore = create((set) => ({
  localData: [],
  setLocalData: (data) => set({ localData: data }),

  point: 10,
  decreasePoint: () => set((state) => ({ point: state.point - 1 })),
  resetPoint: () => set({ point: 10 }),

  starCount: 0,
  setInitialStarCount: (initialValue) => set({ starCount: initialValue }),
  increaseStar: () => set((state) => ({ starCount: state.starCount + state.point })),

  cardCount: 0,
  setInitialCardCount: (initialValue) => set({ cardCount: initialValue }),
  increaseCard: () => set((state) => ({ cardCount: state.cardCount + 1 })),

  resetCount: () => set({ starCount: 0, cardCount: 0 }),

  // GridBox.jsx クリックしたブロックのindexを管理
  indexList: [],
  setIndexList: (data) => set({ indexList: data }),
  resetSetIndexList: () => set({ indexList: [] }),

  // index.jsx クイズリスト管理
  quizlist: [],
  setQuizlist: (data) => set({ quizlist: data }),

  // index.jsx クイズのindex管理
  index: 0,
  setIndex: (data) => set({ index: data }),

  // index.jsx スタートボタンの状態管理
  isStart: false,
  setIsStart: (data) => set({ isStart: data }),

  // WebSpeechAPI 音声認識の状態管理
  getTranscript: '',
  setGetTranscript: (data) => set({ getTranscript: data }),

  // HiraganaAPI ひらがな化データの状態管理
  hiraganaData: '',
  setHiraganaData: (data) => set({ hiraganaData: data }),

  // VoiceRecorder Blobデータの状態管理
  voice: '',
  setVoice: (data) => set({ voice: data }),

  // ミュートの状態管理
  isMuted: true, //初期値はミュート状態
  setIsMuted: (data) => set({ isMuted: data }),
}));

export default useStore;
