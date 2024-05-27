import puppeteer from "puppeteer-extra"
import pluginStealth from "puppeteer-extra-plugin-stealth"
import { Browser, executablePath } from "puppeteer"

import cookies from "./chatgpt.com.cookies.json"
import localstorage from "./localstorage"
import { loginOnPage } from "./login"

puppeteer.use(pluginStealth())

export const createBrowser = () => {
  return puppeteer.launch({
    headless: false,
    devtools: true,
    executablePath: executablePath(),
  })
}

export const createChatPage = async (browser: Browser) => {
  const page = await browser.newPage()

  await page.setViewport({ width: 1280, height: 720 })

  // Add Headers
  await page.setExtraHTTPHeaders({
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "upgrade-insecure-requests": "1",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,en;q=0.8",
  })

  // Limit requests
  await page.setRequestInterception(true)
  page.on("request", async (request) => {
    if (request.resourceType() == "image") {
      await request.abort()
    } else {
      await request.continue()
    }
  })

  await page.evaluateOnNewDocument((localstorage) => {
    Object.keys(localstorage).forEach((key) => {
      localStorage.setItem(key, localstorage[key])
    })
  }, localstorage)

  for (const cookie of cookies) {
    await page.setCookie({
      ...cookie,
      sameSite: cookie.sameSite as unknown as "Lax",
    })
  }

  return page
}
