/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://kimi-kiki-blog.vercel.app',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [{ userAgent: '*', allow: '/' }],
    },
    sitemapSize: 7000,
};

export default config;