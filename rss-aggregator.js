const corsAnywhereAppend = 'https://cors-anywhere.herokuapp.com/'
const jpcomRssUrl = corsAnywhereAppend + 'https://www.jaclynpaul.com/feed/'
const adhdhsRssUrl = corsAnywhereAppend + 'https://adhdhomestead.net/feed/'
const podcastRssUrl = corsAnywhereAppend + 'https://www.patreon.com/rss/ADHDhomestead?auth=cJKustSVnDs8moTqoCiRMLPgBI-4XukX'

const targetDiv = document.getElementById('list')

async function getFeedData(url = '') {
  const response = await fetch(url, {
    mode: 'cors'
  })
  let textContent = await response.text()
  return new window.DOMParser().parseFromString(textContent, "text/xml")
}

function createFeedListHtml(data = '') {
  const items = Array.from(data.querySelectorAll("item")).slice(0, 5)
  let listCount = 0
  let html = '<ul>'
  items.forEach(element => {
    html += `
    <li><a href="${element.querySelector("link").innerHTML}">
    ${element.querySelector("title").innerHTML}
    </a></li>
    `
    listCount += 1
  })
  html += '</ul>'
  console.log(listCount + " items listed")
  return html
}

async function getHtmlForPostList(feedUrl = '') {
  const data = await getFeedData(feedUrl)
  return createFeedListHtml(data)
}

function getHtmlForListTitle(title = '') {
  let html = `
    <p>Recent posts at ${title}:</p>
  `
  return html
}

async function addPostListToPage(title = '', feedUrl = '') {
  let html = ''
  html += getHtmlForListTitle(title)
  html += await getHtmlForPostList(feedUrl)
  targetDiv.insertAdjacentHTML('afterBegin', html)
}

addPostListToPage('my personal/writing blog', jpcomRssUrl)
addPostListToPage('The ADHD Homestead', adhdhsRssUrl)
