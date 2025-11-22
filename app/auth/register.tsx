import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
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
import { clearError, register } from "../../src/redux/slices/authSlice";
import { registerSchema } from "../../src/utils/validation";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await registerSchema.validate(formData, { abortEarly: false });
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

  const handleRegister = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    dispatch(clearError());
    const result = await dispatch(register(formData));

    if (register.fulfilled.match(result)) {
      router.replace("/(tabs)");
    }
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
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join the community
          </Text>
        </View>

        {error && <ErrorMessage message={error} />}

        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.fullName ? colors.error : "transparent",
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
                value={formData.fullName}
                onChangeText={(value) => handleChange("fullName", value)}
                placeholder="Full Name"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
              />
            </View>
            {errors.fullName && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.fullName}
              </Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.email ? colors.error : "transparent",
                },
              ]}
            >
              <Feather
                name="mail"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                placeholder="Email Address"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.username ? colors.error : "transparent",
                },
              ]}
            >
              <Feather
                name="at-sign"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={formData.username}
                onChangeText={(value) => handleChange("username", value)}
                placeholder="Username"
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

          {/* Password */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.password ? colors.error : "transparent",
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
                placeholder="Password"
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.confirmPassword
                    ? colors.error
                    : "transparent",
                },
              ]}
            >
              <Feather
                name="check-circle"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={formData.confirmPassword}
                onChangeText={(value) => handleChange("confirmPassword", value)}
                placeholder="Confirm Password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              { backgroundColor: colors.primary, shadowColor: colors.primary },
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?
            </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.loginLink, { color: colors.primary }]}>
                  {" "}
                  Login here
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
  scrollContent: { flexGrow: 1, padding: 24, paddingTop: 60 },
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: "900", marginBottom: 8 },
  subtitle: { fontSize: 16 },
  form: { width: "100%" },
  inputContainer: { marginBottom: 16 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, fontWeight: "500" },
  errorText: { fontSize: 12, marginTop: 4, marginLeft: 4 },
  registerButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  registerButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  loginText: { fontSize: 15 },
  loginLink: { fontSize: 15, fontWeight: "700" },
});
