module.exports =
  {
    html_header: htmlHeader,
    html_footer: htmlFooter,
    create_html: createHtml
  }

function htmlHeader (title, js = [], additional = '') {
  result = `<!DOCTYPE html>
    <html lang="de">
    <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link type="text/css" rel="stylesheet" href="css/style.css"/>`

  js.forEach(function (scriptfile) {
    result += `<script type="text/javascript" src="js/${scriptfile}.js"></script>`
  })

  result += additional

  result += `</head><body>`
  return result
}

function htmlFooter () {
  return '</body></html>'
}

function createHtml (html, title, js = []) {
  return htmlHeader(title, js) + html + htmlFooter()
}
