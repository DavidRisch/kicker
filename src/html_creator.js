module.exports =
  {
    html_header: htmlHeader,
    html_footer: htmlFooter,
    create_html: createHtml
  }

function htmlHeader (title, js = [], css = [], additional = '') {
  let result = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link type="text/css" rel="stylesheet" href="css/style.css"/>\n\n`

  css.forEach(function (name) {
    result += `    <link rel="stylesheet" href="css/${name}.css">\n`
  })

  result += '\n'

  js.forEach(function (name) {
    result += `    <script type="text/javascript" src="js/${name}.js"></script>\n`
  })

  result += additional

  result += `</head>
<body>\n`
  return result
}

function htmlFooter () {
  return '\n</body></html>'
}

function createHtml (html, title, js = [], css = []) {
  // add defaults
  const defaultJs = ['api_post']
  const defaultCss = []
  // TODO: activate when pages are ready:
  // const defaultCss = ['styles_general']

  return htmlHeader(title, defaultJs.concat(js), defaultCss.concat(css)) + html + htmlFooter()
}
