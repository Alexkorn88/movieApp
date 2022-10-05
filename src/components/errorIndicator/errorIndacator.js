import React from "react";
import { Alert } from "antd";

const ErrorIndicator = () => {
  return (
    <Alert
      message="Что-то пошло не так"
      description="Проверьте правильность ввода..."
      type="info"
    />
  );
};
export default ErrorIndicator;
