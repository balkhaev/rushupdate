import { createBrowser, createChatPage } from ".."

const promt = [
  "Сильно зарирайти следующую новость, постарайся изменить как можно больше слов.",
  "Ответ в json, экронируй ковычки.",
  "Заголовок title, краткое описание description, текст новости content с переносом строк, tags массив тегов, category категория новости.",
  "Пишем для новостного сайта, постарайся дополнить новость релеватными сведеньями.",
  "Но не делай выводов, только сухие факты.",
].join(" ")

export const rewriteText = async (text: string) => {
  const browser = await createBrowser()
  const page = await createChatPage(browser)

  await page.goto(
    "https://chatgpt.com/g/g-B3hgivKK9-write-for-me/c/62c25d8b-1ed1-4240-8931-2dc8ad041627"
  )

  // loginOnPage(page)

  await page.waitForSelector("#prompt-textarea")
  await page.type("#prompt-textarea", `${promt} - ${text}`)

  await page.click(`[data-testid="fruitjuice-send-button"]`)

  console.log("getting stop button...")
  await page.waitForSelector('[data-testid="fruitjuice-stop-button"]')
  console.log("getted stop button")
  await page.waitForFunction(
    'document.querySelector(`[data-testid="fruitjuice-stop-button"]`) == null',
    { timeout: 120000 }
  )
  console.log("getted")

  const data = await page.evaluate(() => ({
    content: document.querySelector(
      '[data-testid*="conversation-turn-"]:last-of-type .hljs.language-json'
    )?.textContent,
    isError: document
      .querySelector('[data-testid*="conversation-turn-"]:last-of-type')
      ?.textContent?.includes(
        "Этот контент может нарушать нашу политику использования." // This content may violate our usage policies.
      ),
  }))

  await browser.close()

  if (!data) {
    throw new Error("wheres data")
  }

  return {
    ...data,
    content: JSON.parse(data.content ?? ""),
  }
}
