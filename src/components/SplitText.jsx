import React from 'react';

const SplitText = ({ text, className = '' }) => (
  <span aria-label={text} role="text" className={className}>
    {text.split('').map((char, i) => (
      <span key={i} aria-hidden="true">{char}</span>
    ))}
  </span>
);

export default SplitText;