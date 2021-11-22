import React from 'react';
import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

const Layout = ({ children, title, description, keywords }: LayoutProps) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <div className="wrapper">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
