import { useCallback } from "react";
import { Audio } from "expo-av";

export function useAudio() {
  const playSound = useCallback(async (audioUrl: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch {
      console.warn("Failed to play audio:", audioUrl);
    }
  }, []);

  return { playSound };
}
