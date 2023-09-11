import * as XLSX from 'xlsx'

// Exporta un Arreglo de objetos (JSON) a un Excel
export const exportWorksheet = (jsonObject: any, myFile = 'timelog.xlsx') => {
  let myWorkSheet = XLSX.utils.json_to_sheet(jsonObject)
  let myWorkBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, 'myWorkSheet')
  XLSX.writeFile(myWorkBook, `${myFile}.xlsx`)
}
