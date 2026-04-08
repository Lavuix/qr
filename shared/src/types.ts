export type QRType = "url" | "text" | "wifi";

export type DotType =
  | "square"
  | "dots"
  | "rounded"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";

export type CornerSquareType = "square" | "dot" | "extra-rounded";

export type CornerDotType = "square" | "dot";

export type ErrorCorrection = "L" | "M" | "Q" | "H";

export type WiFiEncryption = "WPA" | "WEP" | "None";

export interface QRContentURL {
  type: "url";
  url: string;
}

export interface QRContentText {
  type: "text";
  text: string;
}

export interface QRContentWiFi {
  type: "wifi";
  ssid: string;
  password: string;
  encryption: WiFiEncryption;
  hidden: boolean;
}

export type QRContent = QRContentURL | QRContentText | QRContentWiFi;

export interface QROptions {
  size: number;
  margin: number;
  errorCorrection: ErrorCorrection;
}

export interface QRCustomization {
  foregroundColor: string;
  backgroundColor: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  logoDataUrl: string | null;
  logoSize: number; // 0.1–0.5, доля от размера QR
}

export interface QRConfig {
  content: QRContent;
  options: QROptions;
  customization: QRCustomization;
}

export interface QRGenerateRequest {
  config: QRConfig;
}

export interface QRGenerateResponse {
  svg: string;
}

export interface DynamicQRRecord {
  id: string;
  targetUrl: string;
  config: QRConfig;
  createdAt: number;
  clicks: number;
}
