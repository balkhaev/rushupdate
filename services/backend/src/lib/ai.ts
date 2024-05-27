import ollama from "ollama"

export async function askGpt(...messages: string[]) {
  const response = await ollama.chat({
    model: "llama3",
    messages: messages.map((message) => ({ role: "user", content: message })),
  })

  return response.message.content
}
