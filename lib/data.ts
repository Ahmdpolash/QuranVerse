import namesJson from "@/allahs-name.json";

export interface AllahName {
  id: number;
  arbi: string;
  bangla: string;
  meaning: string;
  faz: string;
}

export const namesData: AllahName[] = namesJson.allah;

export function getAudioUrl(name: AllahName) {
  // Generate high quality Arabic pronunciation dynamically using Google TTS gtx client to prevent CORS / 403
  return `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=ar&q=${encodeURIComponent(name.arbi)}`;
}
