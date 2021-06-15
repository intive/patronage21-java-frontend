import { MAX_IMAGE_SIZE } from "../config/Constants";

export const ERROR = "error";
export const SUCCESS = "success";
export const INFO = "info";
export const GENERAL_ERROR_MSG = "Wystąpił błąd";
export const APP_ERROR_MSG = "Wystąpił błąd aplikacji";
export const USER_NOT_FOUND_MSG = "Nie znaleziono użytkownika";
export const NO_CONNECTION_MSG = "Aplikacja nie mogła połączyć się z usługą";
export const INCORRECT_DATA_MSG = "Nieprawidłowe dane";
export const DATA_NOT_CHANGED_MSG = "Dane nie zostały zmienione";
export const DATA_UPDATED_MSG = "Dane zostały pomyślnie zaktualizowane";
export const IMAGE_UPDATED_MSG = "Zdjęcie zostało pomyślnie zaktualizowane";
export const USER_DEACTIVATED_MSG = "Użytkownik został pomyślnie dezaktywowany";
export const SERVER_ERROR_MSG = "Błąd po stronie serwera";
export const INVALID_IMAGE_FORMAT_MSG = "Nieprawidłowy format zdjęcia";
export const IMAGE_SIZE_EXCEEDED_MSG = `Zdjęcie przekracza maksymalny dozwolony rozmiar ${MAX_IMAGE_SIZE} bajtów`;
