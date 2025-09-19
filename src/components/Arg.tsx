import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

interface ArgProps {
  name: string;
  badge: string;
  badgeColor?: BadgeColor;        // デフォルト: 'info'
  outline?: boolean;              // アウトライン表示
  param?: React.ReactNode;        // 複数行OK（.arg-preline で改行表示）
  children?: React.ReactNode;     // 説明（同上）
  usage?: string | string[];      // 使用例（1つ or 複数）
  tags?: string[];                // 表示タグ
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
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async (): Promise<void> => {
    if (!usage) return;
    const text = typeof usage === 'string' ? usage : usage[0] ?? '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
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
            <span
              className={`badge badge--${badgeColor} ${outline ? 'badge--outline' : ''}`}
            >
              {badge}
            </span>
          </h3>

          {usage && (
            <button
              className="button button--sm button--secondary arg-copy"
              onClick={copy}
              aria-label={copied ? 'Copied' : 'Copy to clipboard'}
              title={copied ? 'Copied!' : 'Copy'}
              type="button"
            >
              {copied ? (
                <Check aria-hidden className="arg-icon" />
              ) : (
                <Copy aria-hidden className="arg-icon" />
              )}
            </button>
          )}
        </div>

        {tags?.length > 0 && (
          <div className="arg-tags">
            {tags.map((t, i) => (
              <span key={i} className="badge badge--secondary badge--outline">
                {t}
              </span>
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
            <code>{typeof usage === 'string' ? usage : usage[0]}</code>
          </div>
        )}
      </div>
    </div>
  );
}
