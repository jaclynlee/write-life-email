const corsAnywhereAppend = 'https://cors-anywhere.herokuapp.com/'
const jpcomRssUrl = corsAnywhereAppend + 'https://www.jaclynpaul.com/feed/'
const adhdhsRssUrl = 'https://adhdhomestead.net/feed/'

async function getFeedData(url = '') {
  const response = await fetch(url, {
    //mode: 'no-cors'
  })
  return response
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

getFeedData(jpcomRssUrl)
  .then(response => response.text())
  .then(textContent => new window.DOMParser().parseFromString(textContent, "text/xml"))
  .then(data => {
    const html = createFeedListHtml(data)
    console.log(html)
    const targetDiv = document.getElementById('list')
    targetDiv.insertAdjacentHTML('afterBegin', html)
  })
