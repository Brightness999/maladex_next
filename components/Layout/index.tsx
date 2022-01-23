import React from 'react';
import Head from 'next/head';

import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  theme?: string;
  page?: string;
  changeTheme?: any;
  changePage?: any;
};

const Layout = ({ children, title, description, keywords, theme, page, changeTheme, changePage }: LayoutProps) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <div className={`wrapper ${theme == 'dark' && 'dark'}`}>
        <Header theme={theme} page={page} changeTheme={changeTheme} changePage={changePage} />
        {children}
      </div>
    </>
  );
};

export default Layout;
