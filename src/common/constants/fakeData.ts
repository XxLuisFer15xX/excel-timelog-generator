import { SelectableData } from '@types'

export const constGeneros: SelectableData[] = [
  { id: 'F', label: 'Hombre' },
  { id: 'M', label: 'Mujer' },
  { id: 'T', label: 'Otro' },
]

export const constTiposIdentidad: SelectableData[] = [
  { id: 'indentidad', label: 'Identidad Nacional' },
  { id: 'pasaporte', label: 'Pasaporte' },
]

export const constEstadosCiviles: SelectableData[] = [
  { id: 'Solter@', label: 'Solter@' },
  { id: 'Casad@', label: 'Casad@' },
  { id: 'Divorciad@', label: 'Divorciad@' },
  { id: 'Viud@', label: 'Viudo@' },
]
