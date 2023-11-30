import * as React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { Outlet } from 'react-router-dom'
import AppHeader from './appHeader'
import NavBar from './navBar'

const drawerWidth = 256

function MainPanel() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <NavBar
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AppHeader />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default MainPanel
