import { Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../../constants/theme";
import { Card, FadeIn } from "../../../components/common";

interface LoadingNoticeProps {
  loading: boolean;
  error: boolean;
}

export default function LoadingNotice({ loading, error }: LoadingNoticeProps) {
  if (!loading && !error) return null;

  return (
    <FadeIn delay={50}>
      <Card style={styles.noticeCard}>
        <Text style={styles.noticeText}>
          {loading
            ? "Đang tải dữ liệu bài học..."
            : "Không thể tải dữ liệu."}
        </Text>
      </Card>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  noticeCard: { padding: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },
});
