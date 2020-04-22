import { Spin } from 'antd';
import React from 'react';

const GlobalLoading = (props) => {
  return props.loading ? (
    <div
      style={{
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        opacity: 0.6,
        position: 'fixed',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin size="large" style={{ color: '#494e8f', marginBottom: '10px' }} />
      <div>Loading...</div>
    </div>
  ) : null;
};
export default GlobalLoading;
