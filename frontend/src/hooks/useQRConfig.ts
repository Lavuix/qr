import { useReducer } from "react";
import type {
  QRConfig,
  QRType,
  ErrorCorrection,
  WiFiEncryption,
  QRContentWiFi,
  DotType,
  CornerSquareType,
  CornerDotType,
} from "../types";

const DEFAULT_CONFIG: QRConfig = {
  content: { type: "url", url: "" },
  options: {
    size: 300,
    margin: 4,
    errorCorrection: "M",
  },
  customization: {
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    dotType: "square",
    cornerSquareType: "square",
    cornerDotType: "square",
    logoDataUrl: null,
    logoSize: 0.3,
  },
};

type QRAction =
  | { type: "SET_QR_TYPE"; payload: QRType }
  | { type: "SET_URL"; payload: string }
  | { type: "SET_TEXT"; payload: string }
  | { type: "SET_WIFI_FIELD"; field: keyof QRContentWiFi; value: string | boolean | WiFiEncryption }
  | { type: "SET_SIZE"; payload: number }
  | { type: "SET_MARGIN"; payload: number }
  | { type: "SET_ERROR_CORRECTION"; payload: ErrorCorrection }
  | { type: "SET_FG_COLOR"; payload: string }
  | { type: "SET_BG_COLOR"; payload: string }
  | { type: "SET_DOT_TYPE"; payload: DotType }
  | { type: "SET_CORNER_SQUARE_TYPE"; payload: CornerSquareType }
  | { type: "SET_CORNER_DOT_TYPE"; payload: CornerDotType }
  | { type: "SET_LOGO"; payload: string | null }
  | { type: "SET_LOGO_SIZE"; payload: number };

function reducer(state: QRConfig, action: QRAction): QRConfig {
  switch (action.type) {
    case "SET_QR_TYPE": {
      let content = state.content;
      if (action.payload === "url") content = { type: "url", url: "" };
      else if (action.payload === "text") content = { type: "text", text: "" };
      else if (action.payload === "wifi")
        content = { type: "wifi", ssid: "", password: "", encryption: "WPA", hidden: false };
      return { ...state, content };
    }
    case "SET_URL":
      return { ...state, content: { type: "url", url: action.payload } };
    case "SET_TEXT":
      return { ...state, content: { type: "text", text: action.payload } };
    case "SET_WIFI_FIELD": {
      if (state.content.type !== "wifi") return state;
      return {
        ...state,
        content: { ...state.content, [action.field]: action.value },
      };
    }
    case "SET_SIZE":
      return { ...state, options: { ...state.options, size: action.payload } };
    case "SET_MARGIN":
      return { ...state, options: { ...state.options, margin: action.payload } };
    case "SET_ERROR_CORRECTION":
      return { ...state, options: { ...state.options, errorCorrection: action.payload } };
    case "SET_FG_COLOR":
      return { ...state, customization: { ...state.customization, foregroundColor: action.payload } };
    case "SET_BG_COLOR":
      return { ...state, customization: { ...state.customization, backgroundColor: action.payload } };
    case "SET_DOT_TYPE":
      return { ...state, customization: { ...state.customization, dotType: action.payload } };
    case "SET_CORNER_SQUARE_TYPE":
      return { ...state, customization: { ...state.customization, cornerSquareType: action.payload } };
    case "SET_CORNER_DOT_TYPE":
      return { ...state, customization: { ...state.customization, cornerDotType: action.payload } };
    case "SET_LOGO": {
      const hasLogo = action.payload !== null;
      return {
        ...state,
        options: {
          ...state.options,
          errorCorrection: hasLogo ? "H" : state.options.errorCorrection,
        },
        customization: { ...state.customization, logoDataUrl: action.payload },
      };
    }
    case "SET_LOGO_SIZE":
      return { ...state, customization: { ...state.customization, logoSize: action.payload } };
    default:
      return state;
  }
}

export function useQRConfig() {
  const [config, dispatch] = useReducer(reducer, DEFAULT_CONFIG);
  return { config, dispatch };
}

export type { QRAction };
