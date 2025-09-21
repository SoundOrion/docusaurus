import React from 'react';
import authorsYml from '@site/blog/authors.yml';
import AuthorCard, { Author } from './AuthorCard';

type AuthorsMap = Record<string, Author>;

export default function SupportAuthors({ ids }: { ids: string[] }) {
  const authors = authorsYml as AuthorsMap;
  return (
    <div className="row">
      {ids.map((id) => {
        const a = authors[id];
        if (!a) return null;
        return (
          <div className="col col--4" key={id}>
            <AuthorCard a={a} />
          </div>
        );
      })}
    </div>
  );
}
