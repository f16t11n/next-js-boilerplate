// 401 Unauthorized Error Page
'use client';

import React from 'react';
import { BaseErrorPage } from '../BaseErrorPage';
import { errorConfig } from '../../../../config/errors';
import { ErrorPageProps } from '../BaseErrorPage/types';

type UnauthorizedProps = Partial<ErrorPageProps>;

export const Unauthorized: React.FC<UnauthorizedProps> = (props) => {
  const config = errorConfig.unauthorized;
  
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