import { Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../../constants/theme";
import { Card, FadeIn } from "../../../components/common";

interface LoadingNoticeProps {
  loading: boolean;
  error: boolean | string | null;
}

export default function LoadingNotice({
  loading,
  error,
}: LoadingNoticeProps) {
  if (!loading && !error) return null;

  return (
    <FadeIn delay={80}>
      <Card style={styles.noticeCard}>
        <Text style={styles.noticeText}>
          {loading
            ? "Dang tai du lieu hoc tap..."
            : "Khong the tai du lieu. Hay kiem tra content URL."}
        </Text>
      </Card>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  noticeCard: {
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  noticeText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
});
