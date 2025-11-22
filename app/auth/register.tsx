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
    // Clear field error when user starts typing
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
        {/* Header */}
        <View style={styles.header}>
          <Feather name="user-plus" size={56} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join Sportify to track your favorite matches
          </Text>
        </View>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>
              Full Name
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.fullName ? colors.error : colors.border,
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
                placeholder="Enter your full name"
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

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.email ? colors.error : colors.border,
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
                placeholder="Enter your email"
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
                name="at-sign"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={formData.username}
                onChangeText={(value) => handleChange("username", value)}
                placeholder="Choose a username"
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
                placeholder="Create a password"
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

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>
              Confirm Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: errors.confirmPassword
                    ? colors.error
                    : colors.border,
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
                value={formData.confirmPassword}
                onChangeText={(value) => handleChange("confirmPassword", value)}
                placeholder="Confirm your password"
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

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: colors.primary }]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?{" "}
            </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.loginLink, { color: colors.primary }]}>
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
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
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
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 16,
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
  registerButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
