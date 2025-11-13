import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  errorText: {
    color: "red",
    fontSize: typography.fontSizes.xs,
  },
  flexOne: {
    flex: 1,
  },
  emailText: {
    color: colors.textSecondary,
    textAlign: "center",
    paddingTop: spacing.md,
  }
});

