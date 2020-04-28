module.exports =
  {
    html_header: htmlHeader,
    html_footer: htmlFooter,
    create_html: createHtml
  }

function htmlHeader (title) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>${title}</title>

    <link type="text/css" rel="stylesheet" href="css/style.css"/>

    <script type="text/javascript" src="js/example.js"></script>
    </head>
    <body>`
}

function htmlFooter () {
  return '</body></html>'
}

function createHtml (html, title) {
  return htmlHeader(title) + html + htmlFooter()
}
