import React, { useState } from 'react';

const normalize = v => (typeof v === 'string' ? v.trim() : v);

export default function Arg({
  name,
  badge,
  badgeColor = 'info',   // primary | secondary | success | info | warning | danger
  outline = false,
  param,
  children,
  usage,                  // 例: "mytool.exe --threads 4"
  tags = [],              // 例: ["I/O","高速","Windows"]
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!usage) return;
    try {
      await navigator.clipboard.writeText(usage);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="card arg-card fancy">
      <div className="card__body">
        <div className="arg-header">
          <h3 className="arg-title">
            <code>{name}</code>
            <span className={`badge badge--${badgeColor} ${outline ? 'badge--outline' : ''}`}>
              {badge}
            </span>
          </h3>
          {usage && (
            <button className="button button--sm button--secondary arg-copy" onClick={copy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        {tags?.length > 0 && (
          <div className="arg-tags">
            {tags.map((t, i) => (
              <span key={i} className="badge badge--secondary badge--outline">{t}</span>
            ))}
          </div>
        )}

        <div className="arg-row">
          <strong>パラメータ:</strong>
          <div className="arg-preline">{normalize(param)}</div>
        </div>

        <div className="arg-row">
          <strong>説明:</strong>
          <div className="arg-preline">{normalize(children)}</div>
        </div>

        {usage && (
          <div className="arg-usage">
            <span>使用例:</span>
            <code>{usage}</code>
          </div>
        )}
      </div>
    </div>
  );
}
