import React from 'react';

export interface Author {
  name: string;
  title?: string;       // 所属や役職
  image_url?: string;
}

interface Props {
  a: Author;
}

const AuthorCard: React.FC<Props> = ({ a }) => {
  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      {a.image_url && (
        <img
          src={a.image_url}
          alt={a.name}
          width={90}
          height={90}
          style={{ borderRadius: '50%', marginBottom: '0.5rem' }}
        />
      )}
      <div style={{ fontWeight: 600 }}>{a.name}</div>
      {a.title && (
        <div style={{ color: 'var(--ifm-font-color-base)', opacity: 0.9 }}>
          {a.title}
        </div>
      )}
    </div>
  );
};

export default AuthorCard;
