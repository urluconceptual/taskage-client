import { STYLESHEET_LIGHT } from "./consts";

export const LIGHT_THEME = {
  components: {
    Layout: {
      headerBg: STYLESHEET_LIGHT.headerBg,
      fontFamily: STYLESHEET_LIGHT.logoFontFamily,
    },
    Menu: {
      colorBgContainer: STYLESHEET_LIGHT.headerBg,
      colorText: STYLESHEET_LIGHT.headerTextColor,
      horizontalItemHoverColor: STYLESHEET_LIGHT.headerTextColor,
      horizontalItemSelectedColor: STYLESHEET_LIGHT.headerTextColor,
    },
    Table: {
      borderColor: STYLESHEET_LIGHT.colorTextTransparent,
      headerSplitColor: STYLESHEET_LIGHT.colorTextTransparent,
      headerBg: STYLESHEET_LIGHT.colorSecondaryTransparent,
    },
    Input: {
      colorBorder: STYLESHEET_LIGHT.colorTextTransparent,
      hoverBorderColor: STYLESHEET_LIGHT.colorText,
      activeBorderColor: STYLESHEET_LIGHT.colorText,
    },
    InputNumber: {
      colorBorder: STYLESHEET_LIGHT.colorTextTransparent,
      hoverBorderColor: STYLESHEET_LIGHT.colorText,
      activeBorderColor: STYLESHEET_LIGHT.colorText,
    },
    Select: {
      colorBorder: STYLESHEET_LIGHT.colorTextTransparent,
    },
    Card: {
      colorBorderSecondary: STYLESHEET_LIGHT.colorBorder,
    },
  },
  token: {
    colorPrimary: STYLESHEET_LIGHT.colorPrimary,
    colorError: STYLESHEET_LIGHT.colorErrorText,
    fontFamily: STYLESHEET_LIGHT.fontFamily,
    colorText: STYLESHEET_LIGHT.colorText,
    colorBgBase: STYLESHEET_LIGHT.backgroundColor,
  },
};

export const FORM_ITEM_STYLE = {
  width: "145%",
  maxWidth: "145%",
};

export enum TeamDrawerMode {
  VIEW = "view",
  EDIT = "edit",
  ADD = "add",
}

export enum TeamDrawerButton {
  VIEW = "view",
  ADD = "add",
}

export enum UserDrawerMode {
  EDIT = "edit",
  ADD = "add",
}

export enum UserDrawerButton {
  EDIT = "edit",
  ADD = "add",
}

export enum TaskDrawerMode {
  VIEW = "view",
  EDIT = "edit",
  ADD = "add",
}

export enum TaskDrawerButton {
  VIEW = "view",
  EDIT = "edit",
  ADD = "add",
}

export const formatDate = (date: string | undefined) => {
  if (!date) return "";
  const dateObj = new Date(date);
  var day = ("0" + dateObj.getDate()).slice(-2);
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  var year = dateObj.getFullYear();

  return day + "/" + month + "/" + year;
};
