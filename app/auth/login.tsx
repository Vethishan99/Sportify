import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ErrorMessage, LoadingSpinner } from "../../src/components";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { clearError, login } from "../../src/redux/slices/authSlice";
import { loginSchema } from "../../src/utils/validation";

export default function LoginScreen() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleLogin = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    dispatch(clearError());
    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      router.replace("/(tabs)");
    }
  };

  // Demo credentials info
  const showDemoCredentials = () => {
    Alert.alert(
      "Demo Credentials",
      "You can use these demo credentials to login:\n\nUsername: emilys\nPassword: emilyspass\n\n(Powered by DummyJSON)",
      [{ text: "OK" }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Feather name="activity" size={64} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome to Sportify
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Login to view matches and track your favorites
          </Text>
        </View>

        {/* Demo Credentials Button */}
        <TouchableOpacity
          style={[styles.demoBadge, { backgroundColor: colors.secondary }]}
          onPress={showDemoCredentials}
        >
          <Feather name="info" size={16} color="#FFFFFF" />
          <Text style={styles.demoText}>Tap for demo credentials</Text>
        </TouchableOpacity>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Form */}
        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Username</Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.username ? colors.error : colors.border,
                },
              ]}
            >
              <Feather
                name="user"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={formData.username}
                onChangeText={(value) => handleChange("username", value)}
                placeholder="Enter your username"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.username && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.username}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.password ? colors.error : colors.border,
                },
              ]}
            >
              <Feather
                name="lock"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text
              style={[styles.registerText, { color: colors.textSecondary }]}
            >
              Don&apos;t have an account?{" "}
            </Text>
            <Link href="/auth/register" asChild>
              <TouchableOpacity>
                <Text style={[styles.registerLink, { color: colors.primary }]}>
                  Register here
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  demoBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 24,
    gap: 8,
  },
  demoText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 50,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
