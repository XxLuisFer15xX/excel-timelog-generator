import { useState } from 'react'
import { DashboardLayoutProps } from '@types'

// Components
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import { HeaderMenu, SideMenu } from '@organisms'

// Const
import { DRAWER_WIDTH } from '@common/constants'

// Styles
import { colors } from '@styles'

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = () => {
    setMobileOpen(false)
  }

  return (
    <Box className="flex h-screen">
      <CssBaseline />
      <HeaderMenu
        drawerWidth={DRAWER_WIDTH}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          variant="temporary"
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              background: colors.general,
              width: DRAWER_WIDTH,
            },
          }}
        >
          <SideMenu onChange={handleNavigation} />
        </Drawer>
        <Drawer
          open
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              background: colors.general,
              width: DRAWER_WIDTH,
            },
          }}
        >
          <SideMenu onChange={handleNavigation} />
        </Drawer>
      </Box>
      <Box
        component="main"
        className="flex flex-col h-full"
        sx={{ p: 3, width: `calc(100%)` }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default DashboardLayout
