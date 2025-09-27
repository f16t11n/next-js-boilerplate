'use client';
import React, { useEffect, useState } from 'react';

const ConfigPage = () => {
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch('/api/config').then(res => res.json()).then(setConfig);
  }, []);
  return (
    <main>
      <h1>Active Configuration</h1>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </main>
  );
};

export default ConfigPage;
