import { useState } from 'react';
import './tooltip.css';

export default function Tooltip({ children, text, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className='tooltip-wrapper'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}>
      {children}

      <span className={`tooltip ${position} ${visible ? 'show' : ''}`}>
        {text}
        <span className='tooltip-arrow' />
      </span>
    </span>
  );
}
