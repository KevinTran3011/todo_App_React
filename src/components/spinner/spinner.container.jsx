import { useState } from "react";

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <div className="spinner_container">
      <div className="spinner">Updating Task</div>
    </div>
  );
};

export default LoadingSpinner;
