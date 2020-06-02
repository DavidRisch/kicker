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
    } else if (name === 'chartjs') {
      path = 'chartjs/Chart.min.js'
    }

    result += `    <script type="text/javascript" src="${path}"></script>\n`
  })

  result += additional

  result += `</head>
<body>\n`
  return result
}

const nav = require('fs').readFileSync('html/nav.html', 'utf8')

function htmlNav (req) {
  const group = require('./db/group')

  const user = require('./account_util').get_current_user(req)
  const groups = user.groups
  let groupHtml = ''
  for (const groupId of groups) {
    const grp = group.by_id(groupId.group_id)

    let style = ''
    if (grp.id === require('./account_util').get_group(req)) {
      style = 'font-weight: bold;'
    }
    groupHtml += `
        <button class="group_select_button" onclick="switchGroup(${grp.id})">
            <img src="images/no_group_selected.png" alt="Gruppe"/>
            <span style="${style}">${grp.name}</span>
        </button>
        <hr>`
  }

  return nav.replace('§groupList§', groupHtml)
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
    if (!('req' in options)) {
      throw Error()
    }
    nav = htmlNav(options.req)
    nav = nav.replace('§nav_title§', options.title)
    jsFiles.push('nav')
    cssFiles.push('nav')
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
