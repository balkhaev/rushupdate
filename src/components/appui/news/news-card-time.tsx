export default function NewsCardTime({ fromNow }: { fromNow: string }) {
  return <time className="text-gray-500">{fromNow}</time>
}
