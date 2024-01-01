/* eslint-disable react/prop-types */
// LoadingSpinner component
const LoadingSpinner = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className="spinner_container">
      <div className="spinner">Updating Task</div>
    </div>
  );
};

export default LoadingSpinner;
