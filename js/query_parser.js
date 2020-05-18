var urlParams;
(window.onpopstate = function () {
  var match
  var pl = /\+/g // Regex for replacing addition symbol with a space
  var search = /([^&=]+)=?([^&]*)/g
  var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')) }
  var query = window.location.search.substring(1)

  urlParams = {}
  while (match = search.exec(query)) { urlParams[decode(match[1])] = decode(match[2]) }
})()
