/**
 * ページ遷移
 */
const co = require('co')
const Phantom = require('phantom')
const util = require('./util')
let phantom = null

co(function * () {
  phantom = yield Phantom.create()
  let page = yield phantom.createPage()
  util.pipeConsole(page)
  let status = yield page.open('https://github.com/amir20/phantomjs-node')
  util.checkSuccess(status)
  let nextUrl = yield page.evaluate(function () {
    var authorSpan = document.getElementsByClassName('author')
    var authorA = authorSpan[0].children[0]
    var url = authorA.href
    return url
  })

  // open next page.
  console.log(nextUrl)
  status = yield page.open(nextUrl)
  util.checkSuccess(status)
  yield page.evaluate(function () {
    console.log(document.title)
  })
}).catch(err => console.error(err))
  .then(() => {
    console.log('Phantom exit')
    phantom.exit()
  })
