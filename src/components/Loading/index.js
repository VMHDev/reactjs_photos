import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

const Loading = (props) => {
  const { isShow } = props;

  return (
    <LoadingOverlay
      active={isShow}
      spinner
      styles={{
        overlay: (base) => ({
          ...base,
          height: '100vh',
        }),
      }}>
      {props.children}
    </LoadingOverlay>
  );
};

export default Loading;
