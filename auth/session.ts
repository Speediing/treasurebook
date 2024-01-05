import * as context from 'next/headers';
import React from 'react';
import { auth } from './lucia';

export const getPageSession = React.cache(() => {
  const authRequest = auth.handleRequest('GET', context);
  return authRequest.validate();
});
