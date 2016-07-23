module.exports = {
  checkSuccess (status) {
    if (status !== 'success') {
      throw new Error(`Status: ${status}`)
    }
  },
  pipeConsole (page) {
    page.property('onConsoleMessage', function (msg) {
      console.log(msg)
    })
  }
}
