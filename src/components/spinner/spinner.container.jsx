/* eslint-disable react/prop-types */
// LoadingSpinner component
import { useTranslation } from "react-i18next";

const LoadingSpinner = ({ loading }) => {
  const { t } = useTranslation();
  if (!loading) {
    return null;
  }

  return (
    <div className="spinner_container">
      <div className="spinner">{t("main.loading")}</div>
    </div>
  );
};

export default LoadingSpinner;
