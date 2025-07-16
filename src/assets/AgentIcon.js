import React from 'react';

const AgentIcon = ({ size = 20, color = '#A1A1AA', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5 9.84375V11.5312M6.5 9.84375V11.5312M9 4.78125V2.25M9 4.78125C4.85786 4.78125 1.5 7.61445 1.5 11.1094C1.5 14.6043 4.85786 15.75 9 15.75C13.1421 15.75 16.5 14.6043 16.5 11.1094C16.5 7.61445 13.1421 4.78125 9 4.78125Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AgentIcon; 