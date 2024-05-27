import { createBrowser, createChatPage } from ".."

const promt = ["Найди в интернете изображение сопровождающие новость"].join(" ")

export const rewriteText = async (text: string) => {
  const browser = await createBrowser()
  const page = await createChatPage(browser)

  await page.goto("https://chatgpt.com/c/cb5fbf3c-1fba-49c3-9c0f-2966c6d7ce90")

  // loginOnPage(page)

  await page.waitForSelector("#prompt-textarea")
  await page.type("#prompt-textarea", `${promt} - ${text}`)

  await page.click(`[data-testid="fruitjuice-send-button"]`)

  await page.waitForSelector('[data-testid="fruitjuice-stop-button"]')
  await page.waitForFunction(
    'document.querySelector(`[data-testid="fruitjuice-stop-button"]`) == null'
  )

  const data = await page.evaluate(
    () =>
      document.querySelector(
        '[data-testid*="conversation-turn-"]:last-of-type .!whitespace-pre.hljs.language-json'
      )?.textContent
  )

  await browser.close()

  if (!data) {
    throw new Error("wheres data")
  }

  return JSON.parse(data)
}
