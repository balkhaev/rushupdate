import Queue from "bull"
import { parseFeed } from "../lib/parser"

export const parseFeedQueue = new Queue("parse feed")
export const rewriteNewsQueue = new Queue("rewrite news")

parseFeedQueue.process(async function (job) {
  const data = await parseFeed(job.data.url)
})

rewriteNewsQueue.process(function (job, done) {
  job.progress(42)

  done()

  done(new Error("error transcoding"))

  done(null, { framerate: 29.5 /* etc... */ })

  throw new Error("some unexpected error")
})
