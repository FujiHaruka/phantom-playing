/**
 * 任意の Amazon 商品ページからトップカスタマーレビューを取得する
 */

const co = require('co')
const Phantom = require('phantom')
const util = require('./util')
let phantom = null

const REVIEW_SECTION_ELEMENT_ID = 'revMHRL'

/* テスト */
// https://www.amazon.co.jp/dp/4062579499/
let id = '4062579499'
co(function * () {
  getAmazonReviews(_amazonUrl(id))
})

function getAmazonReviews (url) {
  return co(function * () {
    // Open Page
    phantom = yield Phantom.create()
    let page = yield phantom.createPage()
    util.pipeConsole(page)
    let status = yield page.open(url)
    util.checkSuccess(status)

    console.log('Opened page.')

    let reviews = yield page.evaluate(_reviews, REVIEW_SECTION_ELEMENT_ID)

    console.log('-- reviews --')
    console.log(reviews)
  }).catch(err => console.error(err))
    .then(() => {
      console.log('Phantom exit')
      phantom.exit()
    })
}

// es5 syntax
function _reviews (id) {
  var reviewSection = document.getElementById(id)
  var children = reviewSection.children
  var reviews = []
  for (var i = 0; i < children.length; i++) {
    var maybeDiv = children[i]
    if (!maybeDiv.hasAttribute('id')) {
      continue
    }
    var div = maybeDiv
    var stars = div.getElementsByClassName('a-icon-alt')[0].innerHTML
    var title = div.getElementsByClassName('a-size-base a-text-bold')[0].innerHTML
    reviews.push({
      stars: stars,
      title: title
    })
  }
  return reviews
}

function _amazonUrl (id) {
  return `https://www.amazon.co.jp/dp/${id}/`
}

module.exports = getAmazonReviews
