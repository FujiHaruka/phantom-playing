/**
 * https://www.npmjs.com/package/phantom
 */
const phantom = require('phantom')

let sitepage = null
let phInstance = null
phantom.create()
  .then(instance => {
    phInstance = instance
    return instance.createPage()
  })
  .then(page => {
    sitepage = page
    return page.open('https://stackoverflow.com/')
  })
  .then(status => {
    console.log(status)
    return sitepage.property('content')
  })
  .then(content => {
    console.dir(content)

    phInstance.exit()
  })
  .catch(error => {
    console.log(error)
    phInstance.exit()
  })
