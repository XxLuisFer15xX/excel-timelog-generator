import { useState, useEffect } from 'react'
import { SelectableData } from '@types'

// hooks
import { useMessage } from '@hooks/customs'

// components
import {
  ButtonCustom,
  IconButtonCustom,
  SelectCustom,
  TextCustom,
  TextInputCustom,
} from '@atoms'
import { ANALYSTS, MONTHS, YEARS } from '@common/constants'
import { DialogAddAnalysts } from '@organisms'

// core
import { exportWorksheet, parseCSV } from '@core/utils'

// assets
import AddIcon from '@mui/icons-material/Add'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ReportIcon from '@mui/icons-material/Report'
import InfoIcon from '@mui/icons-material/Info'
import PreviewIcon from '@mui/icons-material/Preview'

// services
import {
  stGetAnalysts,
  stRemoveAnalysts,
  stSetAnalysts,
} from '@services/storage'
import { Link, Tooltip } from '@mui/material'

interface FormData {
  month: string | null
  year: string | null
  firstName: string | null
  firstLastName: string | null
  analyst: string | null
  application: string | null
}

export const Home = () => {
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [firstName, setFirstName] = useState('')
  const [firstLastName, setFirstLastName] = useState('')
  const [analyst, setAnalyst] = useState('')
  const [analysts, setAnalysts] = useState<SelectableData[]>([])
  const [application, setApplication] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [showAddAnalysts, setShowAddAnalysts] = useState(false)
  const { messages, setMessages, resetMessages } = useMessage<FormData>({
    month: null,
    year: null,
    firstName: null,
    firstLastName: null,
    analyst: null,
    application: null,
  })

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();
  
    // Get the current month
    let currentMonth = currentDate.getMonth() + 1;
  
    // Get the current year
    let currentYear = currentDate.getFullYear();

    // Get the current day of the month
    const currentDay = currentDate.getDate();

    // If we are in the first 7 days of the month, it will take the previous month by default
    if (currentDay <= 7) {
      if (currentMonth === 1) {
        currentMonth = 12;
        currentYear = currentYear - 1;
      } else {
        currentMonth = currentMonth - 1;
      }
    }

    // Set the default values
    setMonth(currentMonth.toString());
    setYear(currentYear.toString());
  }, []);

  useEffect(() => {
    const { success, data } = stGetAnalysts()
    if (success) {
      setAnalysts(data)
    } else {
      setAnalysts(ANALYSTS)
    }
  }, [showAddAnalysts])

  const handleAddAnalysts = () => {
    setShowAddAnalysts(true)
  }

  const handleResetAnalysts = () => {
    setAnalyst('')
    stRemoveAnalysts()
    stSetAnalysts(ANALYSTS)
    setAnalysts(ANALYSTS)
  }

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setFile(event.target.files[0])
  }

  const formValid = () => {
    let isValid = true
    const msgValid = {} as FormData
    !month ? (msgValid.month = 'Mes no asignado') : (msgValid.month = '')
    !year ? (msgValid.year = 'Año no asignado') : (msgValid.year = '')
    !firstName
      ? (msgValid.firstName = 'Nombre no asignado')
      : (msgValid.firstName = '')
    !firstLastName
      ? (msgValid.firstLastName = 'Apellido no asignado')
      : (msgValid.firstLastName = '')
    !analyst
      ? (msgValid.analyst = 'Analista no asignado')
      : (msgValid.analyst = '')
    !application
      ? (msgValid.application = 'Aplicación no asignada')
      : (msgValid.application = '')
    setMessages(msgValid)
    Object.entries(msgValid).forEach(([_key, value]) => {
      value ? (isValid = false) : null
    })
    return isValid
  }

  const handleExport = () => {
    resetMessages()
    if (formValid()) {
      if (!file) return
      let reader = new FileReader()
      reader.onload = e => {
        let lineResult = e.target?.result?.toString()
        if (!lineResult) return
        let lines = parseCSV(lineResult)
        let newLines = []
        let newLineHeader = []
        let incrementIndex = 0
        newLineHeader[incrementIndex] = 'Project'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Issue Type'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Key'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Summary'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Analyst'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Application'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Date Started'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Display Name'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Time Spent (h)'
        incrementIndex++
        newLineHeader[incrementIndex] = 'Work Description'
        newLines.push(newLineHeader)
        for (let i = 1; i < lines.length; i++) {
          if (lines[i]?.length) {
            let newLine = []
            incrementIndex = 0
            newLine[incrementIndex] = lines[i][8]
            incrementIndex++
            newLine[incrementIndex] = lines[i][6]
            incrementIndex++
            newLine[incrementIndex] = lines[i][3]
            incrementIndex++
            newLine[incrementIndex] = lines[i][9]
            incrementIndex++
            newLine[incrementIndex] = analyst
            incrementIndex++
            newLine[incrementIndex] = application
            incrementIndex++
            newLine[incrementIndex] = lines[i][4]
            incrementIndex++
            newLine[incrementIndex] = lines[i][1]
            incrementIndex++
            newLine[incrementIndex] = lines[i][0] / 60
            incrementIndex++
            newLine[incrementIndex] = lines[i][7]
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
        const monthName = MONTHS.find(m => m.id ===month)?.label
        let fileName = `${monthName}_${year}_${firstName}_${firstLastName}`
        exportWorksheet(timelog, fileName)
      }
      reader.readAsBinaryString(file)
    }
  }

  const handleReportProblem = () => {
    window.location.href = 'mailto:lsolano@goconsultores.com'
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-slate-600">
      <div className="max-w-4xl w-full mx-0 sm:mx-12 md:mx-24 flex flex-col px-6 py-8 rounded-none sm:rounded-xl bg-white">
        <TextCustom
          text="Conversor de Formato TimeLog"
          className="self-center text-2xl font-bold text-general"
        />
        <div className="flex flex-col my-4 relative">
          <div className="flex items-center mb-2">
            <InfoIcon className="text-primary" />
            <TextCustom
              text="El funcionamiento de esta aplicación es para leer los timelogs que genera Azure DevOps en formato CSV y convertirlos a Excel, aplicando el formato estándar."
              className="text-sm ml-2"
            />
            <Link
              variant="body2"
              href="/PreviewTimeLog.png"
              target="_blank"
              className="flex flex-col items-center font-poppins"
              underline="none"
            >
              <Tooltip title="Vista previa de resultados">
                <PreviewIcon />
              </Tooltip>
              Previsualizar
            </Link>
          </div>
          <div className="flex items-center mb-4">
            <Link
              href="/public/Manual de Usuario - Conversor de Formato TimeLog.pdf"
              target="_blank"
              className="text-primary font-bold ml-2 underline"
              underline="hover"
            >
              Click para ver el manual de usuario
            </Link>
          </div>
          <div className="flex flex-col my-2">
            <TextCustom
              text="Ingrese sus datos para generar el archivo Excel"
              className="text-lg font-medium mb-2"
            />
            <div className="flex gap-2 flex-col sm:flex-row">
              <SelectCustom
                name="Mes"
                options={MONTHS}
                value={month}
                setValue={setMonth}
                required
                className="w-full mb-2"
                msgError={messages.month}
              />
              <SelectCustom
                name="Año"
                options={YEARS}
                value={year}
                setValue={setYear}
                required
                className="w-full mb-2"
                msgError={messages.year}
              />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <TextInputCustom
                name="Primer Nombre"
                value={firstName}
                setValue={setFirstName}
                className="w-full mb-2"
                required
                allowSpaces={false}
                maxLength={20}
                typesValidation="onlyLettersExtend"
                msgError={messages.firstName}
              />
              <TextInputCustom
                name="Primer Apellido"
                value={firstLastName}
                setValue={setFirstLastName}
                required
                allowSpaces={false}
                maxLength={20}
                className="w-full mb-2"
                typesValidation="onlyLettersExtend"
                msgError={messages.firstLastName}
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <TextCustom
              text="Ingrese las variables de su TimeLog"
              className="text-lg font-medium mb-2"
            />
            <div className="flex gap-2 flex-row">
              <SelectCustom
                name="Analista"
                options={analysts}
                value={analyst}
                setValue={setAnalyst}
                required
                className="w-full mb-2"
                msgError={messages.analyst}
              />
              <IconButtonCustom
                icon={
                  <Tooltip title="Agregar analista">
                    <AddIcon />
                  </Tooltip>
                }
                onClick={handleAddAnalysts}
                typeColor="primary"
              />
              <IconButtonCustom
                icon={
                  <Tooltip title="Restaurar la lista orginal de analistas">
                    <RestartAltIcon />
                  </Tooltip>
                }
                onClick={handleResetAnalysts}
                typeColor="primary"
              />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <TextInputCustom
                name="Aplicación"
                placeholder="Por ejemplo: GRYCO"
                value={application}
                setValue={setApplication}
                className="w-full mb-2"
                required
                maxLength={50}
                msgError={messages.application}
              />
            </div>
          </div>
          <div className="flex flex-row mb-6 justify-between">
            <div className="flex flex-row">
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
            <div className="flex justify-center items-center">
              <TextCustom
                text="Reportar problema"
                className="text-sm text-center italic"
              />
              <IconButtonCustom
                icon={
                  <Tooltip title="Reportar algún error o sugerir mejora">
                    <ReportIcon />
                  </Tooltip>
                }
                onClick={handleReportProblem}
                typeColor="warning"
              />
            </div>
          </div>
          <ButtonCustom
            text="Exportar TimeLog a Excel"
            onClick={handleExport}
            className="w-full mt-2"
            typeColor="primary"
            disabled={file ? false : true}
          />
          <div className="flex flex-col mt-4">
            <TextCustom
              text="© Derechos reservados - Luis Solano - GO Consultores"
              className="text-sm font-semibold text-center italic"
            />
            <Link
              href="https://www.goconsultores.com/"
              className="self-center mt-2 font-poppins"
              target="_blank"
            >
              GO - Consultores
            </Link>
          </div>
        </div>
      </div>
      <DialogAddAnalysts open={showAddAnalysts} setOpen={setShowAddAnalysts} />
    </div>
  )
}
