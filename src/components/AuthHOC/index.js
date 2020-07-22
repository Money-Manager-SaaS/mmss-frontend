import React, { useEffect } from 'react';

import { connect } from 'react-redux';

export default (OriginalComponent) => {
  function AuthGuard(props) {
    useEffect(() => {
      if (!props.refreshToken) {
        props.history.push('/login');
      }
    }, [props.refreshToken, props.history]);

    return <OriginalComponent {...props} />;
  }

  return connect((state) => ({ refreshToken: state.user.refreshToken }))(AuthGuard);
};
