import React from 'react';

const normalize = (v) => (typeof v === 'string' ? v.trim() : v);

export default function Arg({
  name,
  badge,
  badgeColor = 'info', // primary | secondary | success | info | warning | danger
  outline = false,
  param,
  children,
}) {
  return (
    <div className="card arg-card" style={{ marginBottom: '1rem' }}>
      <div className="card__body">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <code>{name}</code>
          <span className={`badge badge--${badgeColor} ${outline ? 'badge--outline' : ''}`}>
            {badge}
          </span>
        </h3>

        <div className="arg-row">
          <strong>パラメータ:</strong>
          <div className="arg-preline">{normalize(param)}</div>
        </div>

        <div className="arg-row">
          <strong>説明:</strong>
          <div className="arg-preline">{normalize(children)}</div>
        </div>
      </div>
    </div>
  );
}
