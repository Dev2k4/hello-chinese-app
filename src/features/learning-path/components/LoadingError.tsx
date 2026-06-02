import { Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../../constants/theme";
import { Card, FadeIn } from "../../../components/common";

interface LoadingErrorProps {
  loading: boolean;
  error: boolean | string | null;
}

export default function LoadingError({ loading, error }: LoadingErrorProps) {
  if (!loading && !error) return null;

  return (
    <FadeIn delay={60}>
      <Card style={styles.noticeCard}>
        <Text style={styles.noticeText}>
          {loading ? "Đang tải nội dung..." : "Không thể tải dữ liệu."}
        </Text>
      </Card>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  noticeCard: { padding: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },
});
