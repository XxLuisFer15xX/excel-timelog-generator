import { memo, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SideMenuProps } from '@types'

// Hooks
import { AuthContext } from '@hooks/contexts'

// Components
import { Collapse, List } from '@mui/material'
import { DrawerItem } from '@atoms'

// Assets
import { ReactComponent as LogoIcon } from '@assets/icons/LogoIcon.svg'
import { ReactComponent as HomeIcon } from '@assets/icons/HomeIcon.svg'
import ExtensionIcon from '@mui/icons-material/Extension'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import ScienceIcon from '@mui/icons-material/Science'
import SettingsIcon from '@mui/icons-material/Settings'

// Styles
import { colors } from '@styles'

const SideMenu = ({ onChange = () => null }: SideMenuProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { dispatchAuth } = useContext(AuthContext)
  const [showComponents1, setShowComponents1] = useState(false)
  const [showComponents2, setShowComponents2] = useState(false)

  const handleHome = () => {
    navigate('/dashboard/home')
    onChange()
  }

  const handleConfiguration = () => {
    navigate('/dashboard/configuration')
    onChange()
  }

  const handleComponentsText = () => {
    navigate('/dashboard/componentsText')
    onChange()
  }

  const handleComponentsButton = () => {
    navigate('/dashboard/componentsButton')
    onChange()
  }

  const handleComponentsInputs1 = () => {
    navigate('/dashboard/componentsInputs1')
    onChange()
  }

  const handleComponentsInputs2 = () => {
    navigate('/dashboard/componentsInputs2')
    onChange()
  }

  const handleComponentsInputs3 = () => {
    navigate('/dashboard/componentsInputs3')
    onChange()
  }

  const handleComponentsInputs4 = () => {
    navigate('/dashboard/componentsInputs4')
    onChange()
  }

  const handleComponentsAlert = () => {
    navigate('/dashboard/componentsAlert')
    onChange()
  }

  const handleComponentsLoader = () => {
    navigate('/dashboard/componentsLoader')
    onChange()
  }

  const handleComponentsDialog = () => {
    navigate('/dashboard/componentsDialog')
    onChange()
  }

  const handleComponentsTable = () => {
    navigate('/dashboard/componentsTable')
    onChange()
  }

  const handleLogout = () => {
    dispatchAuth({ type: 'logout' })
    onChange()
  }

  return (
    <div className="flex flex-col h-full p-4 bg-general">
      <div className="flex justify-center items-center pt-5 pb-4 text-white">
        <LogoIcon fill={colors.white} className="w-10 h-10" />
      </div>
      <div className="h-full flex flex-col justify-between">
        <List className="flex flex-col gap-1 py-0">
          <DrawerItem
            text={'Dashboard'}
            onClick={handleHome}
            icon={<HomeIcon fill={colors.white} />}
            isSelected={location.pathname === '/dashboard/home'}
          />
          <DrawerItem
            text={'Configuraciones'}
            onClick={handleConfiguration}
            icon={<SettingsIcon className="text-white" />}
            isSelected={location.pathname === '/dashboard/Configuration'}
          />
          <DrawerItem
            text={'Componentes 1'}
            onClick={() => setShowComponents1(!showComponents1)}
            icon={<ScienceIcon className="text-white" />}
            isCollapse
            collapse={showComponents1}
          />
          <Collapse in={showComponents1} timeout="auto" unmountOnExit>
            <List className="flex flex-col gap-1 py-0 ml-2">
              <DrawerItem
                text={'Textos y colores'}
                onClick={handleComponentsText}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={location.pathname === '/dashboard/componentsText'}
              />
              <DrawerItem
                text={'Botones'}
                onClick={handleComponentsButton}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={location.pathname === '/dashboard/componentsButton'}
              />
              <DrawerItem
                text={'Inputs 1'}
                onClick={handleComponentsInputs1}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={
                  location.pathname === '/dashboard/componentsInputs1'
                }
              />
              <DrawerItem
                text={'Inputs 2'}
                onClick={handleComponentsInputs2}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={
                  location.pathname === '/dashboard/componentsInputs2'
                }
              />
              <DrawerItem
                text={'Inputs 3'}
                onClick={handleComponentsInputs3}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={
                  location.pathname === '/dashboard/componentsInputs3'
                }
              />
              <DrawerItem
                text={'Inputs 4'}
                onClick={handleComponentsInputs4}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={
                  location.pathname === '/dashboard/componentsInputs4'
                }
              />
            </List>
          </Collapse>
          <DrawerItem
            text={'Componentes 2'}
            onClick={() => setShowComponents2(!showComponents2)}
            icon={<ScienceIcon className="text-white" />}
            isCollapse
            collapse={showComponents2}
          />
          <Collapse in={showComponents2} timeout="auto" unmountOnExit>
            <List className="flex flex-col gap-1 py-0 ml-2">
              <DrawerItem
                text={'Alerts'}
                onClick={handleComponentsAlert}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={location.pathname === '/dashboard/componentsAlert'}
              />
              <DrawerItem
                text={'Loaders'}
                onClick={handleComponentsLoader}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={location.pathname === '/dashboard/componentsLoader'}
              />
              <DrawerItem
                text={'Ventanas Modales'}
                onClick={handleComponentsDialog}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={location.pathname === '/dashboard/componentsDialog'}
              />
              <DrawerItem
                text={'Tablas'}
                onClick={handleComponentsTable}
                icon={<ExtensionIcon className="text-white" />}
                isSelected={location.pathname === '/dashboard/componentsTable'}
              />
            </List>
          </Collapse>
        </List>
        <List className="flex flex-col gap-1 py-0">
          <DrawerItem
            text={'Cerrar sesión'}
            onClick={handleLogout}
            icon={<PowerSettingsNewIcon className="text-white" />}
          />
        </List>
      </div>
    </div>
  )
}

export default memo(SideMenu)
