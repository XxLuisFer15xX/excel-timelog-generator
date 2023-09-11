import { useState } from 'react'

// Components
import { ButtonCustom, SelectCustom, TextCustom, TextInputCustom } from '@atoms'
import { ANALYSTS, MONTHS, YEARS } from '@common/constants'
import { exportWorksheet, parseCSV } from '@core/utils'

export const Home = () => {
  const [month, setMonth] = useState('Septiembre')
  const [year, setYear] = useState('2023')
  const [firstName, setFirstName] = useState('Luis')
  const [firstLastName, setFirstLastName] = useState('Solano')
  const [analyst, setAnalyst] = useState('Aaron Elvir')
  const [environment, setEnvironment] = useState('GRYCO')
  const [internal, setInternal] = useState('Mantenimiento')
  const [file, setFile] = useState<File | null>(null)

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setFile(event.target.files[0])
  }

  const handleExport = () => {
    if (!file) return
    let reader = new FileReader()
    reader.onload = e => {
      let lineResult = e.target?.result?.toString()
      if (!lineResult) return
      let lines = parseCSV(lineResult)
      let newLines = []
      let newLineHeader = []
      newLineHeader[0] = 'Project'
      newLineHeader[1] = 'Issue Type'
      newLineHeader[2] = 'Key'
      newLineHeader[3] = 'Summary'
      newLineHeader[4] = 'Analista'
      newLineHeader[5] = 'Enviroment'
      newLineHeader[6] = 'Interno'
      newLineHeader[7] = 'Date Started'
      newLineHeader[8] = 'Display Name'
      newLineHeader[9] = 'Time Spent (h)'
      newLineHeader[10] = 'Work Description'
      newLines.push(newLineHeader)
      for (let i = 1; i < lines.length; i++) {
        if (lines[i]?.length) {
          let newLine = []
          newLine[0] = lines[i][8]
          newLine[1] = lines[i][6]
          newLine[2] = lines[i][3]
          newLine[3] = lines[i][9]
          newLine[4] = analyst
          newLine[5] = environment
          newLine[6] = internal
          newLine[7] = lines[i][4]
          newLine[8] = lines[i][1]
          newLine[9] = lines[i][0] / 60
          newLine[10] = lines[i][7]
          newLines.push(newLine)
        }
      }
      const timelog = []
      for (let i = 1; i < newLines.length; i++) {
        let obj = {}
        for (let j = 0; j < newLines[0].length; j++) {
          obj = {
            ...obj,
            ...{ [newLines[0][j]]: newLines[i][j] },
          }
        }
        timelog.push(obj)
      }
      let fileName = `${month}_${year}_${firstName}_${firstLastName}`
      exportWorksheet(timelog, fileName)
    }
    reader.readAsBinaryString(file)
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-slate-600">
      <div className="flex flex-col px-6 py-8 rounded-xl bg-white">
        <TextCustom
          text="Exportar timelog CSV al formato Excel"
          className="self-center text-2xl font-bold text-general"
        />
        <div className="flex flex-col my-4 relative">
          <div className="flex flex-col my-2">
            <TextCustom
              text="Ingrese el nombre de su archivo Excel"
              className="text-lg font-semibold mb-2"
            />
            <div className="flex gap-2 flex-row xs:flex-row">
              <SelectCustom
                name="Mes"
                options={MONTHS}
                value={month}
                setValue={setMonth}
                required
                className="w-full mb-2"
              />
              <SelectCustom
                name="Mes"
                options={YEARS}
                value={year}
                setValue={setYear}
                required
                className="w-full mb-2"
              />
            </div>
            <div className="flex gap-2 flex-row xs:flex-row">
              <TextInputCustom
                name="Primer Nombre"
                value={firstName}
                setValue={setFirstName}
                className="w-full mb-2"
                required
                typesValidation="onlyLettersExtend"
              />
              <TextInputCustom
                name="Primer Apellido"
                value={firstLastName}
                setValue={setFirstLastName}
                required
                className="w-full mb-2"
                typesValidation="onlyLettersExtend"
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <TextCustom
              text="Ingrese las variables de su TimeLog"
              className="text-lg font-semibold mb-2"
            />
            <div className="flex gap-2 flex-row xs:flex-row">
              <SelectCustom
                name="Analista"
                options={ANALYSTS}
                value={analyst}
                setValue={setAnalyst}
                required
                className="w-full mb-2"
              />
            </div>
            <div className="flex gap-2 flex-row xs:flex-row">
              <TextInputCustom
                name="Enviroment"
                value={environment}
                setValue={setEnvironment}
                className="w-full mb-2"
                required
                typesValidation="onlyLettersExtend"
              />
              <TextInputCustom
                name="Interno"
                value={internal}
                setValue={setInternal}
                required
                className="w-full mb-2"
                typesValidation="onlyLettersExtend"
              />
            </div>
          </div>
          <div className="flex flex-row mb-6">
            <ButtonCustom
              text="Cargar CSV"
              className="mr-2"
              typeColor="primary"
              component="label"
              variant={file ? 'contained' : 'outlined'}
            >
              <input type="file" hidden onChange={handleUploadFile} />
            </ButtonCustom>
            <div className="flex flex-col justify-end">
              {file?.name ? (
                <TextCustom
                  text={file.name}
                  className="font-bold text-success"
                />
              ) : (
                <TextCustom
                  text="Cargue su CSV."
                  className="text-sm text-danger italic"
                />
              )}
            </div>
          </div>
          <ButtonCustom
            text="Exportar TimeLog a Excel"
            onClick={handleExport}
            className="w-full mt-2"
            typeColor="primary"
            disabled={file ? false : true}
          />
        </div>
      </div>
    </div>
  )
}
