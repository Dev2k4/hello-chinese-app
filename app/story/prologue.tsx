import { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, StatusBar } from "react-native";
import { router } from "expo-router";
import { Colors, Spacing, Typography, BorderRadius } from "../../src/constants/theme";
import DialogueBox from "../../src/components/story/DialogueBox";
import { PROLOGUE } from "../../src/story/dialogue";
import { useUserStore } from "../../src/store/useUserStore";

export default function PrologueScreen() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const markPrologueSeen = useUserStore((s) => s.markPrologueSeen);

  const currentScene = PROLOGUE[sceneIndex];
  const bgColor = currentScene?.background ?? "#1A1A2E";

  const handleDialogueComplete = () => {
    if (sceneIndex < PROLOGUE.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowDialogue(false);
        setTimeout(() => {
          setSceneIndex((prev) => prev + 1);
          setShowDialogue(true);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }).start();
        }, 100);
      });
    } else {
      markPrologueSeen();
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar hidden />

      <View style={styles.particlesContainer}>
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.topSection}>
          <Text style={styles.sceneIcon}>
            {sceneIndex < 4 ? "🏔️" : sceneIndex < 6 ? "👤" : sceneIndex < 10 ? "⚡" : "📜"}
          </Text>
        </View>

        <View style={styles.centerSection}>
          {sceneIndex === 0 && (
            <View style={styles.titleBlock}>
              <Text style={styles.titleText}>Hạo Nhiên Tông</Text>
              <Text style={styles.titleSub}>Chốn bồng lai tiên cảnh</Text>
              <View style={styles.titleDivider} />
              <Text style={styles.titleYear}>Niên hiệu: Linh Khư 2026</Text>
            </View>
          )}
        </View>

        {showDialogue && (
          <DialogueBox
            key={sceneIndex}
            lines={currentScene.lines}
            onComplete={handleDialogueComplete}
          />
        )}
      </Animated.View>

      <View style={styles.skipArea}>
        <Text style={styles.skipText} onPress={() => {
          markPrologueSeen();
          router.replace("/(tabs)");
        }}>
          Bỏ qua ▶
        </Text>
      </View>
    </View>
  );
}

function FloatingParticle({ index }: { index: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  const size = 2 + Math.random() * 4;
  const left = Math.random() * 100;
  const duration = 3000 + Math.random() * 4000;

  Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: `${left}%`,
          opacity: anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.8, 0],
          }),
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -200],
              }),
            },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  particle: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  content: {
    flex: 1,
  },
  topSection: {
    alignItems: "center",
    paddingTop: 60,
  },
  sceneIcon: {
    fontSize: 48,
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  titleBlock: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  titleText: {
    fontSize: 42,
    fontWeight: "800",
    color: Colors.secondary,
    letterSpacing: 4,
    textShadowColor: "rgba(212, 168, 67, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  titleSub: {
    ...Typography.h3,
    color: "rgba(255,255,255,0.7)",
  },
  titleDivider: {
    width: 60,
    height: 1,
    backgroundColor: Colors.secondary,
    marginVertical: Spacing.sm,
  },
  titleYear: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.5)",
  },
  skipArea: {
    position: "absolute",
    top: 50,
    right: Spacing.lg,
  },
  skipText: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
  },
});
