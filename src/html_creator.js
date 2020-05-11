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
    let path = `css/${name}.css`

    if (name === 'chosen') {
      path = 'chosen/chosen.css'
    } else if (name === 'jquery-ui') {
      path = 'jquery-ui/jquery-ui.css'
    } else if (name === 'dropzone') {
      path = 'dropzone/dropzone.css'
    }

    result += `    <link rel="stylesheet" href="${path}">\n`
  })

  result += '\n'

  js.forEach(function (name) {
    let path = `js/${name}.js`

    if (name === 'chosen') {
      path = 'chosen/chosen.jquery.min.js'
    } else if (name === 'jquery') {
      path = 'jquery/jquery.min.js'
    } else if (name === 'jquery-ui') {
      path = 'jquery-ui/jquery-ui.min.js'
    } else if (name === 'dropzone') {
      path = 'dropzone/dropzone.js'
    }

    result += `    <script type="text/javascript" src="${path}"></script>\n`
  })

  result += additional

  result += `</head>
<body>\n`
  return result
}

const nav = require('fs').readFileSync('html/nav.html', 'utf8')
function htmlNav () {
  return nav
}

function htmlFooter () {
  return '\n</body></html>'
}

function createHtml (html, title, js = [], css = [], needsNav) {
  // add defaults
  const defaultJs = ['api_post']
  const defaultCss = []
  // TODO: activate when pages are ready:
  // const defaultCss = ['styles_general']

  var nav = ''
  if (needsNav) {
    nav = htmlNav();
    nav = nav.replace('§nav_title§', title)
    defaultJs.push('nav')
    defaultCss.push('groups')
    defaultCss.push('hamburgers')
  }

  return htmlHeader(title, defaultJs.concat(js), defaultCss.concat(css)) + nav + html + htmlFooter()
}
