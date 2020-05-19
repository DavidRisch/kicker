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
    <title>${title}</title>\n\n`

  css.forEach(function (name) {
    let path = `css/${name}.css`

    if (name === 'chosen') {
      path = 'chosen/chosen.css'
    } else if (name === 'jquery-ui') {
      path = 'jquery-ui/jquery-ui.css'
    } else if (name === 'dropzone') {
      path = 'dropzone/dropzone.css'
    } else if (name === 'bootstrap') {
      path = 'bootstrap/css/bootstrap.min.css'
    } else if (name === 'tokenize2') {
      path = 'tokenize2/tokenize2.min.css'
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
    } else if (name === 'tokenize2') {
      path = 'tokenize2/tokenize2.min.js'
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

function createHtml (html, options) {
  // add defaults
  let jsFiles = ['api_post']
  let cssFiles = []
  // TODO: activate when pages are ready:
  // const cssFiles = ['styles_general']

  let nav = ''
  if (options.nav) {
    nav = htmlNav()
    nav = nav.replace('§nav_title§', options.title)
    jsFiles.push('nav')
    cssFiles.push('groups')
    cssFiles.push('hamburgers')
  }

  if (options.js !== undefined) {
    jsFiles = jsFiles.concat(options.js)
  }

  if (options.css !== undefined) {
    cssFiles = cssFiles.concat(options.css)
  }

  return htmlHeader(options.title, jsFiles, cssFiles) +
    nav + html + htmlFooter()
}
