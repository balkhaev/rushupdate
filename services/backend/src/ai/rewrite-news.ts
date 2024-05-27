import { askGpt } from "../lib/ai"

const contentPromt = [
  "Зарирайти следующую новость на русском, сильно!",
  "Если знаешь актуальные или релеватные сведенья, дополни ими новость.",
  "Текст должен быть отформатирован в Markdown",
  "Всегда используй наилучший вариант, не спрашивай меня",
].join(" ")

const titlePromt = [
  "Сгенерируй тайтл для следующей новости на русском",
  "Заголовок должен отражать содержание статьи.",
  "Всегда используй наилучший вариант, не спрашивай меня",
].join(" ")

const descriptionPromt = [
  "Сгенерируй краткое описание для следующей новости на русском",
  "Всегда используй наилучший вариант, не спрашивай меня",
].join(" ")

export async function rewriteNews(text: string) {
  console.log("generating description...")
  const description = await askGpt(`${descriptionPromt} - ${text}`)
  console.log("generating content...")
  const content = await askGpt(`${contentPromt} - ${text}`)
  console.log("generating title...")
  const title = await askGpt(`${titlePromt} - ${text}`)

  return {
    title,
    content,
    description,
  }
}
