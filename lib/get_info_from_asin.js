/**
 * ASINコードから商品タイトルと公式の価格を取得する
 */

const co = require('co')
const Phantom = require('phantom')
const util = require('./util')
let phantom

/* テスト */
let asin = 'B01I30ECCA'
co(function * () {
  let info = yield getTitleFromAsin(asin)
  console.log(info)
})

function getTitleFromAsin (asin) {
  return co(function * () {
    // Open Page
    let url = `https://www.amazon.co.jp/dp/${asin}/`
    phantom = yield Phantom.create()
    let page = yield phantom.createPage()
    util.pipeConsole(page)
    let status = yield page.open(url)
    util.checkSuccess(status)

    console.log('Opened page.')

    let info = yield page.evaluate(getInfo)
    return info
  }).catch(err => console.error(err))
    .then((res) => {
      console.log('Phantom exit')
      phantom.exit()
      return res
    })
}

// es5 syntax
function getInfo () {
  var titleId = 'productTitle'
  var titleSpan = document.getElementById(titleId)
  var title = titleSpan.innerHTML.trim()

  var priceId = 'priceblock_ourprice'
  var priceSpan = document.getElementById(priceId)
  var priceText = priceSpan.innerHTML
  var price = priceText.slice(1, priceText.length).trim()

  return {
    title: title,
    price: price
  }
}

module.exports = getTitleFromAsin
