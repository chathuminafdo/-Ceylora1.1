import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

import { radius, useAppTheme } from "@/context/theme";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function Button({
  label,
  variant = "primary",
  disabled,
  style,
  ...pressableProps
}: ButtonProps) {
  const { colors } = useAppTheme();

  const backgroundColor = disabled
    ? colors.border
    : variant === "primary"
      ? colors.accent
      : variant === "secondary"
        ? colors.accentSoft
        : "transparent";

  const textColor = disabled
    ? colors.subtext
    : variant === "primary"
      ? colors.accentText
      : colors.accent;

  return (
    <Pressable
      disabled={disabled}
      style={(state) => [
        styles.base,
        { backgroundColor, opacity: state.pressed ? 0.85 : 1 },
        typeof style === "function" ? style(state) : style,
      ]}
      {...pressableProps}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
});
