import './ErrorMessage.scss';
import React from 'react';

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => (
  <pre className="ErrorMessage">{message}</pre>
);

export default React.memo(ErrorMessage);
