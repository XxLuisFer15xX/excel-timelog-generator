import { useEffect } from 'react'

// components
import { AppRouter } from '@routes'

// const
import { ANALYSTS } from '@common/constants'

// services
import { stGetAnalysts, stSetAnalysts } from '@services/storage'

const App = () => {
  useEffect(() => {
    const { success } = stGetAnalysts()
    if (!success) {
      stSetAnalysts(ANALYSTS)
    }
  }, [])

  return <AppRouter />
}

export default App
