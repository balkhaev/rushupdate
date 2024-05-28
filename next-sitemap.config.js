/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://rushupdate.com",
  generateRobotsTxt: true, // (optional)
}

export default config
