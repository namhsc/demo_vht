import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load file JSON từ public/locales
  .use(LanguageDetector) // Phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next) // Kết nối với React
  .init({
    fallbackLng: "en", // Mặc định là tiếng Anh nếu không tìm thấy ngôn ngữ
    debug: true, // Bật log debug (tắt khi deploy)
    interpolation: {
      escapeValue: false, // Không cần escape HTML trong nội dung dịch
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Đường dẫn tới file dịch
    },
  });

export default i18n;
