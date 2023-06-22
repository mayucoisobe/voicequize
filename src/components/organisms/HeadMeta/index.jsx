import Head from 'next/head';

export const HeadMeta = ({ title, description, url, type }) => {
  return (
    <Head>
      {/* Global Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content="https://voicequize.vercel.app/ogp-img.png" />
      <meta property="og:site_name" content="Voice de Quize" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mayukoony" />
      <meta name="twitter:image" content="https://voicequize.vercel.app/ogp-img.png" />
      {/* Canonical */}
      <link rel="canonical" href={url}></link>
    </Head>
  );
};
