import { useTranslation, Trans } from "react-i18next";

const TitleContainer = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="title-container">
      <div className="title">{t("main.title")}</div>
    </div>
  );
};

export default TitleContainer;
