export const LOGIN_LINK = "/login";
export const ADMIN_LINK = "/admin";
export const MANAGER_LINK = "/manager";
export const TEAM_VIEW_ADMIN_LINK = `${ADMIN_LINK}/teams`;
export const USER_VIEW_ADMIN_LINK = `${ADMIN_LINK}/users`;
export const DASHBOARD_VIEW_MANAGER_LINK = `${MANAGER_LINK}/dashboard`;

export const UNAUTHORIZED_ACCESS_LINK = "/unauthorized-access";
export const NOT_AUTHENTICATED_LINK = "/not-authenticated";

export const REDIRECT_AFTER_LOGIN = {
  ROLE_ADMIN: USER_VIEW_ADMIN_LINK,
  ROLE_MANAGER: DASHBOARD_VIEW_MANAGER_LINK,
};

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
  colorTextTransparent: "#6D87AD",
  accentColor: "#48BB78",
  colorBorder: "#C2DCE5",
};

export const CORE_BASE_URL = "http://localhost:5001";
export const USERS_API_URL = `${CORE_BASE_URL}/users`;
export const TEAMS_API_URL = `${CORE_BASE_URL}/teams`;
export const JOBTITLES_API_URL = `${CORE_BASE_URL}/jobTitles`;
export const SPRINTS_API_URL = `${CORE_BASE_URL}/sprints`;
export const DICTIONARIES_API_URL = `${CORE_BASE_URL}/dictionary`;
