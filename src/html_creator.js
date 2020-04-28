module.exports =
  {
    html_header: htmlHeader,
    html_footer: htmlFooter,
    create_html: createHtml
  }

function htmlHeader (title, js = [], additional = '') {
  let result = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link type="text/css" rel="stylesheet" href="css/style.css"/>\n\n`

  js.forEach(function (scriptfile) {
    result += `    <script type="text/javascript" src="js/${scriptfile}.js"></script>\n`
  })

  result += additional

  result += `</head>
<body>\n`
  return result
}

function htmlFooter () {
  return '\n</body></html>'
}

function createHtml (html, title, js = []) {
  return htmlHeader(title, js) + html + htmlFooter()
}
