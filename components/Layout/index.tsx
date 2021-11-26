import React from 'react';
import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  theme?: string;
  changeTheme?: any;
};

const Layout = ({ children, title, description, keywords, theme, changeTheme }: LayoutProps) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <div className="wrapper">
        <Header theme={theme} changeTheme={changeTheme} />
        {children}
      </div>
    </>
  );
};

export default Layout;
