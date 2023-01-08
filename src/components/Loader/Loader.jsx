import { ProgressBar } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{ justifycontent: 'center', margin: 'auto' }}
      wrapperClass="progress-bar-wrapper"
      borderColor="#f1f42ece"
      barColor="#3f51b5"
    />
  );
};
