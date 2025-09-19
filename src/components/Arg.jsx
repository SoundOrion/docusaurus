import React from 'react';

const normalize = (v) => (typeof v === 'string' ? v.trim() : v);

export default function Arg({ name, badge, badgeType = 'info', param, children }) {
  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card__body">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <code>{name}</code>
          <span className={`badge badge--${badgeType}`}>{badge}</span>
        </h3>

        <div style={{ marginTop: '0.5rem' }}>
          <strong>パラメータ:</strong>
          <div className="arg-preline">{normalize(param)}</div>
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <strong>説明:</strong>
          <div className="arg-preline">{normalize(children)}</div>
        </div>
      </div>
    </div>
  );
}