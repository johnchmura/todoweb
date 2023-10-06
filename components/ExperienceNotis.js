import React, { useState, useEffect } from 'react';

export default function ExperienceNotis({ x, y, points }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        backgroundColor: 'black',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '14px',
        zIndex: 9999,
      }}
    >
      +{points} XP
    </div>
  ) : null;
}


