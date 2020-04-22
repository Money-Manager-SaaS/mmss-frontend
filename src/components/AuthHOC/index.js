import React, { useEffect } from 'react';

import { connect } from 'react-redux';

export default (OriginalComponent) => {
  function AuthGuard(props) {
    useEffect(() => {
      if (!props.auth) {
        props.history.push('/login');
      }
    }, [props.auth, props.history]);

    return <OriginalComponent {...props} />;
  }

  return connect((state) => ({ auth: state.user.auth }))(AuthGuard);
};
