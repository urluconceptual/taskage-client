export const LOGIN_LINK = "/login";
export const ADMIN_LINK = "/admin";
export const TEAM_VIEW_ADMIN_LINK = `${ADMIN_LINK}/teams`;
export const USER_VIEW_ADMIN_LINK = `${ADMIN_LINK}/users`;

export const UNAUTHORIZED_ACCESS_LINK = "/unauthorized-access";
export const NOT_AUTHENTICATED_LINK = "/not-authenticated";

export const AUTH_ROLES = {
  ADMIN: "ROLE_ADMIN",
  USER: "ROLE_BASIC",
  MANAGER: "ROLE_MANAGER",
};

export const STYLESHEET_LIGHT = {
  headerBg: "#5A67D8",
  headerColor: "#F7FAFC",
  headerTextColor: "#F8FBFC",
  colorPrimary: "#5A67D8",
  colorSecondary: "#ECC94B",
  colorSecondaryTransparent: "#F4F1D8",
  backgroundColor: "#F8FBFC",
  logoFontFamily: "Ubuntu",
  colorErrorText: "#E53E3E",
  fontFamily: "Poppins",
  colorText: "#2D3748",
  colorTextTransparent: "#6d87ad",
  accentColor: "#48BB78",
};

export const CORE_BASE_URL = "http://localhost:8080";
export const USERS_API_URL = `${CORE_BASE_URL}/users`;
export const TEAMS_API_URL = `${CORE_BASE_URL}/teams`;
