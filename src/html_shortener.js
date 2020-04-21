module.exports =
  {
    html_header: html_header,
    html_footer: html_footer
  }

function html_header (title) {
  res = `<!DOCTYPE html>
  <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>${title}</title>

    <link type="text/css" rel="stylesheet" href="css/style.css"/>

    <script type="text/javascript" src="js/example.js"></script>
    </head>
    <body>`

  return res
}

function html_footer () {
  return `</body></html>`
}
