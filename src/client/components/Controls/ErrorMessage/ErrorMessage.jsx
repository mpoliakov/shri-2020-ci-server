import './ErrorMessage.scss';
import React from 'react';

const ErrorMessage = ({message}) => (
  <pre className="ErrorMessage">{message}</pre>
);

export default React.memo(ErrorMessage);
