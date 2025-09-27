'use client';
import React from 'react';

const SecurePage = () => (
  <main>
    <h1>Security Middleware & Headers</h1>
    <ul>
      <li>Helmet (HTTP headers)</li>
      <li>Rate Limiting</li>
      <li>CSRF Protection</li>
      <li>CORS Handling</li>
      <li>Input Validation (Zod)</li>
      <li>Secure Cookies & JWT</li>
      <li>Content Security Policy (CSP)</li>
    </ul>
    <p>See <code>/api/secure</code> for active config.</p>
  </main>
);

export default SecurePage;
