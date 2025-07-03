'use client';

import { Suspense, lazy } from 'react';

const HeavyClientComponentImpl = lazy(() => import('./heavy-client-component-impl'));

export const HeavyClientComponent = () => {
  if (typeof window === 'undefined') {
    throw new Error('HeavyClientComponent must be rendered on the client side');
  }
  return <Suspense fallback="Loading..."><HeavyClientComponentImpl /></Suspense>;
};

export default HeavyClientComponent;
