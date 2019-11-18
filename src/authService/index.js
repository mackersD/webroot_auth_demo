import authService from "./authService";
import passwordHelper from "./passwordHelper";
export default {
  registerAsync: authService.registerAsync,
  loginAsync: authService.loginAsync,
  isPasswordStrong: passwordHelper.isPasswordStrong,
  getPasswordRules: passwordHelper.getPasswordRules
};
