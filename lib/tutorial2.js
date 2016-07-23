/**
 * co モジュールで書く。
 */
const co = require('co')
const Phantom = require('phantom')
let phantom = null

co(function * () {
  phantom = yield Phantom.create()
  let page = yield phantom.createPage()
  let status = yield page.open('https://github.com/amir20/phantomjs-node')
  if (status !== 'success') {
    throw new Error(`Status: ${status}`)
  }
  let title = yield page.evaluate(function () {
    return document.title
  })
  console.log(title)
}).catch(err => console.error(err))
  .then(() => {
    console.log('exit')
    phantom.exit()
  })

/*
わかったこと。
page.evaluate の中では、アロー関数が使えない。
phantomjs の文法だけが使える。
*/
