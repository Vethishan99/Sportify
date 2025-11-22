import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ErrorMessage,
  Icon,
  Input,
  LoadingSpinner,
} from "../../src/components";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { clearError, login } from "../../src/redux/slices/authSlice";
import { loginSchema } from "../../src/utils/validation";

export default function LoginScreen() {
  const { colors, tokens } = useTheme();
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

  const showDemoCredentials = () => {
    Alert.alert("Demo Access", "Username: emilys\nPassword: emilyspass", [
      { text: "Got it" },
    ]);
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
        {/* Header with icon */}
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.primary + "15" },
            ]}
          >
            <Icon name="zap" size={48} color={colors.primary} />
          </View>
          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: tokens.fontSizes.display },
            ]}
          >
            Sportify
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary, fontSize: tokens.fontSizes.md },
            ]}
          >
            Your ultimate match tracker
          </Text>
        </View>

        {/* Demo Badge */}
        <TouchableOpacity
          style={[
            styles.demoBadge,
            { backgroundColor: colors.secondary + "15" },
          ]}
          onPress={showDemoCredentials}
        >
          <Icon name="key" size={16} color={colors.secondary} />
          <Text style={[styles.demoText, { color: colors.secondary }]}>
            Get Demo Credentials
          </Text>
        </TouchableOpacity>

        {error && <ErrorMessage message={error} />}

        <View style={styles.form}>
          {/* Username Input */}
          <Input
            label="Username"
            leftIcon="user"
            value={formData.username}
            onChangeText={(value) => handleChange("username", value)}
            placeholder="Enter username"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.username}
          />

          {/* Password Input */}
          <Input
            label="Password"
            leftIcon="lock"
            rightIcon={showPassword ? "eye-off" : "eye"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            error={errors.password}
          />

          {/* Login Button with Gradient */}
          <TouchableOpacity
            style={[styles.loginButton, { shadowColor: colors.primary }]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={tokens.gradients.subtlePrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                StyleSheet.absoluteFill,
                { borderRadius: tokens.radius.lg },
              ]}
            />
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
              <Text
                style={[
                  styles.loginButtonText,
                  { fontSize: tokens.fontSizes.lg },
                ]}
              >
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text
              style={[
                styles.registerText,
                { color: colors.textSecondary, fontSize: tokens.fontSizes.md },
              ]}
            >
              New to Sportify?
            </Text>
            <Link href="/auth/register" asChild>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.registerLink,
                    { color: colors.primary, fontSize: tokens.fontSizes.md },
                  ]}
                >
                  Create Account
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
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 40 },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontWeight: "900", marginBottom: 8 },
  subtitle: { textAlign: "center", fontWeight: "500" },
  demoBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignSelf: "center",
    marginBottom: 32,
    gap: 8,
  },
  demoText: { fontSize: 13, fontWeight: "700" },
  form: { width: "100%" },
  loginButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    overflow: "hidden",
  },
  loginButtonText: { color: "#FFFFFF", fontWeight: "800" },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 6,
  },
  registerText: { fontWeight: "500" },
  registerLink: { fontWeight: "800" },
});
