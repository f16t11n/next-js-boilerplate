// 500 Internal Server Error Page
'use client';

import React from 'react';
import { BaseErrorPage } from '../BaseErrorPage';
import { errorConfig } from '../../../../config/errors';
import { ErrorPageProps } from '../BaseErrorPage/types';

type InternalErrorProps = Partial<ErrorPageProps>;

export const InternalError: React.FC<InternalErrorProps> = (props) => {
  const config = errorConfig.internalError;
  
  return (
    <BaseErrorPage
      title={props.title || config.title}
      description={props.description || config.description}
      action={props.action || config.action}
      icon={props.icon || config.icon}
      className={props.className}
    />
  );
};