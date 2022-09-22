import React from "react";
import { Alert } from "antd";

const ErrorIndicator = () => {
  return (
    <Alert
      message="Что-то пошло не так"
      description="Пожалуйста будте бдительны =)"
      type="info"
    />
  );
};
export default ErrorIndicator;
