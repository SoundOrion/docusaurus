import React from 'react';
import type {Props} from '@theme/Root';
import BackToTop from '@site/src/components/BackToTop';

export default function Root({children}: Props) {
  return (
    <>
      {children}
      <BackToTop />
    </>
  );
}
