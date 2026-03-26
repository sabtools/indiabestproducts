import JsonLd from './JsonLd';

interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  url?: string;
}

export default function ArticleSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
}: ArticleSchemaProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'IndiaBestProducts',
      ...(image && {
        logo: {
          '@type': 'ImageObject',
          url: image,
        },
      }),
    },
    ...(image && { image }),
    ...(url && { mainEntityOfPage: { '@type': 'WebPage', '@id': url } }),
  };

  return <JsonLd data={data} />;
}
