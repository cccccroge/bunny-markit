const commentSection = document.querySelector(".comment-body")

if (commentSection) {
  // parse words
  const text = commentSection.textContent
  const wordRegex = /[^\s]+/g
  const words = text.matchAll(wordRegex)
  const wordCount = [...words].length

  // calculate reading time
  const readWordsPerMinutes = 50;
  const readingTime = Math.round(wordCount / readWordsPerMinutes)

  // creating UI
  const badge = document.createElement("p")
  badge.textContent = `⏱️ ${readingTime} min read`
  
  commentSection.prepend(badge)
}
