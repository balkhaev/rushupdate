/** @type {import('next').NextConfig} */
const nextConfig = {
  siteUrl: process.env.SITE_URL || "https://rushupdate.com",
  generateRobotsTxt: true, // (optional)
}

module.exports = nextConfig
