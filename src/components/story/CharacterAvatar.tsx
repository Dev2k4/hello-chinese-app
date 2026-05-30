import { View, Text, StyleSheet } from "react-native";
import { Character, getAvatarStyle } from "../../story/characters";

interface CharacterAvatarProps {
  character: Character;
  size?: number;
  emotion?: "normal" | "angry" | "happy" | "sad" | "surprised" | "smug" | "crying" | "shy" | "contempt";
  showGlow?: boolean;
}

const EMOTION_ICONS: Record<string, string> = {
  normal: "",
  angry: "😠",
  happy: "😊",
  sad: "😢",
  surprised: "😲",
  smug: "😏",
  crying: "😭",
  shy: "🥺",
  contempt: "😒",
};

export default function CharacterAvatar({ character, size = 64, emotion, showGlow = true }: CharacterAvatarProps) {
  const style = getAvatarStyle(character);
  const emotionIcon = emotion ? EMOTION_ICONS[emotion] : "";
  const avatarSize = size;
  const innerSize = size * 0.75;

  return (
    <View style={[styles.wrapper, { width: avatarSize + 8, height: avatarSize + 8 }]}>
      {showGlow && (
        <View
          style={[
            styles.glow,
            {
              backgroundColor: character.color + "30",
              width: avatarSize + 8,
              height: avatarSize + 8,
              borderRadius: (avatarSize + 8) / 2,
            },
          ]}
        />
      )}
      <View
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            backgroundColor: style.bodyColor,
            borderColor: character.color,
          },
        ]}
      >
        {/* Body / robe */}
        <View
          style={[
            styles.robe,
            {
              backgroundColor: style.robeColor,
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
            },
          ]}
        />
        {/* Accessory emoji */}
        <Text style={[styles.accessory, { fontSize: size * 0.35 }]}>{style.accessory}</Text>
        {/* Emotion overlay */}
        {emotionIcon && (
          <Text style={[styles.emotion, { fontSize: size * 0.3 }]}>{emotionIcon}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glow: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    position: "relative",
    overflow: "hidden",
  },
  robe: {
    position: "absolute",
    bottom: -5,
    opacity: 0.3,
  },
  accessory: {
    position: "absolute",
    top: -2,
  },
  emotion: {
    position: "absolute",
    bottom: -2,
    right: -4,
  },
});
