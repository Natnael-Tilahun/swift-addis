module.exports = {
    siteUrl: process.env.SITE_URL || 'https://swiftaddisdetailing.com/', // Replace with your domain
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: "/" }, // Allow all pages
        { userAgent: "*", disallow: "/admin" }, // Block specific paths
      ],
    },
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
  };