import { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Colors, Spacing, Typography, BorderRadius } from "../../constants/theme";
import { Character, CHARACTERS } from "../../story/characters";
import { DialogueLine } from "../../story/dialogue";
import CharacterAvatar from "./CharacterAvatar";

interface DialogueBoxProps {
  lines: DialogueLine[];
  onComplete: () => void;
  speed?: number;
}

export default function DialogueBox({ lines, onComplete, speed = 35 }: DialogueBoxProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const charIndexRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const currentLine = lines[currentLineIndex];
  const character: Character | undefined = currentLine ? CHARACTERS[currentLine.characterId] : undefined;

  // Typewriter effect
  useEffect(() => {
    charIndexRef.current = 0;
    setDisplayedText("");
    setIsFinished(false);
    fadeAnim.setValue(0);
    bounceAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();

    const interval = setInterval(() => {
      if (charIndexRef.current < currentLine.text.length) {
        charIndexRef.current += 1;
        setDisplayedText(currentLine.text.slice(0, charIndexRef.current));
      } else {
        clearInterval(interval);
        setIsFinished(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [currentLineIndex]);

  const handlePress = useCallback(() => {
    if (!isFinished) {
      // Show full text immediately
      charIndexRef.current = currentLine.text.length;
      setDisplayedText(currentLine.text);
      setIsFinished(true);
      return;
    }
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  }, [isFinished, currentLineIndex, lines.length, onComplete, currentLine]);

  const bounce = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
      <Animated.View style={[styles.inner, { opacity: fadeAnim, transform: [{ translateY: bounce }] }]}>
        {character && (
          <View style={styles.characterRow}>
            <CharacterAvatar character={character} size={48} emotion={currentLine.emotion} />
            <View style={styles.nameBox}>
              <Text style={styles.characterName}>{character.name}</Text>
              <Text style={styles.characterTitle}>{character.title}</Text>
            </View>
          </View>
        )}

        <View style={styles.dialogueBox}>
          <Text style={styles.dialogueText}>
            {displayedText}
            {!isFinished && <Text style={styles.cursor}>|</Text>}
          </Text>
        </View>

        {isFinished && currentLineIndex < lines.length - 1 && (
          <Text style={styles.tapHint}>Chạm để tiếp →</Text>
        )}
        {isFinished && currentLineIndex === lines.length - 1 && (
          <Text style={styles.tapHint}>Chạm để kết thúc ✓</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    paddingBottom: Spacing.xl,
  },
  characterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  nameBox: {
    flex: 1,
  },
  characterName: {
    ...Typography.h3,
    color: "#FFF",
  },
  characterTitle: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.6)",
    marginTop: 1,
  },
  dialogueBox: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderLeftWidth: 3,
    borderLeftColor: Colors.secondary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    minHeight: 80,
  },
  dialogueText: {
    ...Typography.body,
    color: "#FFF",
    lineHeight: 26,
  },
  cursor: {
    color: Colors.secondary,
    fontWeight: "700",
  },
  tapHint: {
    ...Typography.caption,
    color: Colors.secondary,
    textAlign: "right",
    marginTop: Spacing.sm,
    paddingRight: Spacing.lg,
  },
});
