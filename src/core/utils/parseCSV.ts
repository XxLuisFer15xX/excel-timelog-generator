// Codifica los caracteres especiales a utf8
const convert_to_utf8 = (code = '') => {
  return decodeURIComponent(escape(code))
}

// Convierte las líneas de un CSV en un Array
const CSVtoArray = (text: string) => {
  let re_valid =
    /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/
  let re_value =
    /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g
  if (!re_valid.test(text)) return null
  let a = []
  text.replace(re_value, (_m0, m1, m2, m3) => {
    if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"))
    else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'))
    else if (m3 !== undefined) a.push(m3)
    return ''
  })
  if (/,\s*$/.test(text)) a.push('')
  return a
}

// Divide el CSV en línea y luego las formatea
export const parseCSV = (text: string): any[][] => {
  let lines = text.replace(/\r/g, '').split('\n')
  let parsedLines: any[][] = []
  lines.forEach(line => {
    let line_converted = convert_to_utf8(line)
    line_converted = line_converted.replaceAll(`""`, '')
    let values = CSVtoArray(line_converted)
    if (values) parsedLines.push(values)
  })
  return parsedLines
}
