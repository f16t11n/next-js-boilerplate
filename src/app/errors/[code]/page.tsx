// Dynamic Error Code Handler
'use client';

import React from 'react';
import { getErrorConfigByCode, errorConfig } from '../../../../config/errors';
import { BaseErrorPage } from '../../../../components/public/errors/BaseErrorPage';

interface DynamicErrorProps {
  code: number;
}

export default function DynamicError({ code }: DynamicErrorProps) {
  const config = getErrorConfigByCode(code);
  
  return (
    <BaseErrorPage
      title={config.title}
      description={config.description}
      action={config.action}
      icon={config.icon}
    />
  );
}