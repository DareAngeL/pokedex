/// <reference types="react-scripts" />

declare module '*.svg?react' {
    import { FunctionComponent, SVGProps } from 'react';
    const content: FunctionComponent<SVGProps<SVGSVGElement>>;
    export default content;
  }