import { auth } from 'auth/luciafile';
import * as context from 'next/headers';
import React from 'react';
export const getPageSession = React.cache(() => {
  const authRequest = auth.handleRequest('GET', context);
  return authRequest.validate();
});
