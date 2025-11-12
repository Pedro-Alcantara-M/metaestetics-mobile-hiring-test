import { colors, spacing, typography } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: typography.fontSizes.sm,
    marginTop: spacing.xs,
  },
  title: {
    marginBottom: spacing.lg,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  flexOne: {
    flex: 1,
  },
  profilePage: {
    flex: 1,
  },
  profileSubtitle: {
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  imageProfileContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xxxl,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginHorizontal: "auto",
  },
  photoPlaceholder: {
    backgroundColor: colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewLabel: {
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  reviewValue: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoContainer: {
    paddingVertical: spacing.xl,
  },
  imageReviewontainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
});
