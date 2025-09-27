// 404 Not Found Error Page
'use client';

import React from 'react';
import { BaseErrorPage } from '../BaseErrorPage';
import { errorConfig } from '../../../../config/errors';
import { ErrorPageProps } from '../BaseErrorPage/types';

interface NotFoundProps extends Partial<ErrorPageProps> {}

export const NotFound: React.FC<NotFoundProps> = (props) => {
  const config = errorConfig.notFound;
  
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