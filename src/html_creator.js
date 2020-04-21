module.exports =
  {
    html_header: html_header,
    html_footer: html_footer,
    create_html: create_html
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

function create_html (html, title) {
  return html_header(title) + html + html_footer()
}
