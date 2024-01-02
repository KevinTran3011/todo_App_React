import { useTranslation } from "react-i18next";

const TitleContainer = () => {
  const { t } = useTranslation();
  return (
    <div className="title-container">
      <div className="title">{t("main.title")}</div>
    </div>
  );
};

export default TitleContainer;
