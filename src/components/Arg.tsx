import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

interface ArgProps {
  name: string;
  badge: string;
  badgeColor?: BadgeColor;
  outline?: boolean;
  param?: React.ReactNode;
  children?: React.ReactNode;
  usage?: string | string[];   // ← 複数OK
  tags?: string[];
}

const normalize = (v: React.ReactNode): React.ReactNode =>
  typeof v === 'string' ? v.trim() : v;

export default function Arg({
  name,
  badge,
  badgeColor = 'info',
  outline = false,
  param,
  children,
  usage,
  tags = [],
}: ArgProps) {
  const usageList = Array.isArray(usage) ? usage : (usage ? [usage] : []);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = async (text: string, idx: number) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      // noop
    }
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
          {/* ヘッダーにCopyは出さない（使用例の横に出す） */}
        </div>

        {tags.length > 0 && (
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

{usageList.length > 0 && (
  <div className="arg-usage">
    <span className="arg-label">使用例:</span>
    <div className="arg-usage__content">
      {usageList.map((u, i) => {
        const copied = copiedIndex === i;
        return (
          <div key={i} className="arg-usage__item arg-codefield">
            <code className="arg-codefield__code">{u}</code>
            <button
              type="button"
              className="icon-btn arg-codefield__btn"
              data-copied={copied}
              onClick={() => copy(u, i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && copy(u, i)}
              aria-label={copied ? 'Copied' : 'Copy to clipboard'}
              title={copied ? 'Copied!' : 'Copy'}
            >
              {copied ? <Check aria-hidden className="arg-icon" /> : <Copy aria-hidden className="arg-icon" />}
            </button>
          </div>
        );
      })}
    </div>
  </div>
)}
      </div>
    </div>
  );
}
