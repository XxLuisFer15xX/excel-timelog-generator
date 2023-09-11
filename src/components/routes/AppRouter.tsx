import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Components
import {
  ComponentsAlert,
  ComponentsButton,
  ComponentsDialog,
  ComponentsInputs1,
  ComponentsInputs2,
  ComponentsInputs3,
  ComponentsInputs4,
  ComponentsLoader,
  ComponentsTable,
  ComponentsText,
  Home,
} from '@pages'
import { Error404 } from '@pages'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/componentsAlert" element={<ComponentsAlert />} />
        <Route path="/componentsButton" element={<ComponentsButton />} />
        <Route path="/componentsDialog" element={<ComponentsDialog />} />
        <Route path="/componentsInputs1" element={<ComponentsInputs1 />} />
        <Route path="/componentsInputs2" element={<ComponentsInputs2 />} />
        <Route path="/componentsInputs3" element={<ComponentsInputs3 />} />
        <Route path="/componentsInputs4" element={<ComponentsInputs4 />} />
        <Route path="/componentsLoader" element={<ComponentsLoader />} />
        <Route path="/componentsTable" element={<ComponentsTable />} />
        <Route path="/componentsText" element={<ComponentsText />} />
        <Route path="/page-error" element={<Error404 />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/page-error" replace />} />
      </Routes>
    </Router>
  )
}
