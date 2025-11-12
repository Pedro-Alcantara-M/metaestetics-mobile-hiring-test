import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
    fontWeight: typography.fontWeights.medium,
  },
  phoneContainer: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  textContainer: {
    backgroundColor: colors.white,
    borderRadius: spacing.sm,
  },
  textInput: {
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
  },
  codeText: {
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
    fontSize: typography.fontSizes.xs,
  },
});

