// https://stackoverflow.com/a/49458964
export const prettyXml = (xml: string, tab = '\t') => {
  let formatted = ''
  let indent = ''

  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) {
      indent = indent.substring(tab.length)
    } // decrease indent by one 'tab'
    formatted += indent + '<' + node + '>\r\n'
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab
  })

  return formatted.substring(1, formatted.length - 3)
}
