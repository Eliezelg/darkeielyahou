import React from 'react';

export function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2.5a.5.5 0 0 1-.5-.5v-3z" />
      <path d="M16 6.5c-.2 1.3-1.3 2-3 2s-2.8-.7-3-2c-.2-1.5 1.4-3 3-3s3.2 1.5 3 3z" />
    </svg>
  );
}
