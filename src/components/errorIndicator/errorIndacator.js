import React from "react";
import { Alert } from "antd";

const ErrorIndicator = () => {
  return (
    <Alert
      message="Что-то пошло не так"
      description="Мы не смогли ни чего найти"
      type="info"
    />
  );
};
export default ErrorIndicator;
