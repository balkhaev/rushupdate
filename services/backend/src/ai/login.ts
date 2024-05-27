import { Page } from "puppeteer"

export async function loginOnPage(page: Page) {
  // Ожидание и заполнение формы авторизации
  await page.waitForSelector(`[data-testid="login-button"]`) // Подождите, пока форма авторизации загрузится

  page.click(`[data-testid="login-button"]`)

  await page.waitForSelector(`.email-input`) // Подождите, пока форма авторизации загрузится
  await page.type(".email-input", "papapevo2@gmail.com") // Введите ваше имя пользователя

  page.click(`.continue-btn`)
  await page.waitForSelector(`#password`)

  await page.type("#password", "dAF3#rdfwA21") // Введите ваш пароль
  await page.click(`[type="submit"]`) // Нажмите на кнопку входа

  // Ожидание перехода на страницу чата
  await page.waitForNavigation()
}
