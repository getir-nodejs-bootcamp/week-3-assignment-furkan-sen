const index = (req, resp) => {
  resp.render('./home/index.ejs', {
    layout: '../layouts/_layout.ejs'
  })
}

module.exports = {
    index
}