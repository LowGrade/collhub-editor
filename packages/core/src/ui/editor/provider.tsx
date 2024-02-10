'use client';

import { createContext } from 'react';

export const CollhubContext = createContext<{
  completionApi: string;
}>({
  completionApi: '/api/generate',
});
