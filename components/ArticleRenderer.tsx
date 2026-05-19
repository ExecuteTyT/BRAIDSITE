import React from 'react';
import { NavLink } from 'react-router-dom';
import type { ArticleSection, InlineNode } from '../data/blog/types';

const renderInline = (node: InlineNode, i: number): React.ReactNode => {
  if (typeof node === 'string') return node;
  switch (node.type) {
    case 'b':
      return <strong key={i}>{node.text}</strong>;
    case 'em':
      return <em key={i}>{node.text}</em>;
    case 'a':
      if (node.href.startsWith('/')) {
        return <NavLink key={i} to={node.href} className="text-brand-primary hover:underline">{node.text}</NavLink>;
      }
      return <a key={i} href={node.href} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">{node.text}</a>;
  }
};

const renderText = (text: InlineNode[] | string): React.ReactNode => {
  if (typeof text === 'string') return text;
  return text.map((n, i) => renderInline(n, i));
};

const Section: React.FC<{ section: ArticleSection }> = ({ section }) => {
  switch (section.type) {
    case 'lead':
      return <p className="lead">{renderText(section.text)}</p>;
    case 'p':
      return <p>{renderText(section.text)}</p>;
    case 'h2':
      return <h2 id={section.id}>{section.text}</h2>;
    case 'h3':
      return <h3>{section.text}</h3>;
    case 'h4':
      return <h4>{section.text}</h4>;
    case 'ul':
      return (
        <ul>
          {section.items.map((item, i) => (
            <li key={i}>{renderText(item)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {section.items.map((item, i) => (
            <li key={i}>{renderText(item)}</li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <table>
          <thead>
            <tr>
              {section.headers.map((h, i) => <th key={i}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'info': {
      const variantClass = section.variant === 'success' ? 'info-box success' : section.variant === 'warning' ? 'info-box warning' : 'info-box';
      return (
        <div className={variantClass}>
          <h4>{section.title}</h4>
          <p>{section.text}</p>
        </div>
      );
    }
    case 'quote':
      return (
        <blockquote>
          <p>{section.text}</p>
          {section.cite && <cite>— {section.cite}</cite>}
        </blockquote>
      );
  }
};

export const ArticleRenderer: React.FC<{ sections: ArticleSection[] }> = ({ sections }) => {
  return (
    <>
      {sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </>
  );
};
