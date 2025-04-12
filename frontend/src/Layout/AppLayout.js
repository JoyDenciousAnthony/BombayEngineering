import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery, Drawer } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { Menu, ChevronLeft, Brightness4, Brightness7 } from '@mui/icons-material'; // <-- Added these imports
import { AppProvider } from '@toolpad/core/AppProvider';
import { PageContainer } from '@toolpad/core/PageContainer';
import AddUserForm from '../Compoment/AddUserForm';
import WorkForm from '../Compoment/WorkForm';

const NAVIGATION = [
  // { title: 'Dashboard', icon: <DashboardIcon />, segment: 'dashboard' },
  { title: 'Dashboard', icon: <DashboardIcon />, segment: '' },
  { title: 'Orders', icon: <ShoppingCartIcon />, segment: 'orders' },
  { title: 'Reports', icon: <BarChartIcon />, segment: 'reports' },
  { title: 'Sales', icon: <DescriptionIcon />, segment: 'sales' },
  { title: 'Traffic', icon: <DescriptionIcon />, segment: 'traffic' },
  { title: 'Integrations', icon: <LayersIcon />, segment: 'integrations' },
];

function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      background: {
        default: mode === 'light' ? '#f4f4f4' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
    },
  });
}

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => ({
    pathname,
    navigate: (path) => setPathname(path),
  }), [pathname]);
  return router;
}

function DashboardContent({ segment }) {
  switch (segment) {
    case 'dashboard':
      return <Typography variant="h6">Reports Section</Typography>;
    case 'orders':
      return <WorkForm></WorkForm>;
    case 'reports':
      return <div>Reports Section</div>;
    case 'sales':
      return <Typography variant="h6">Sales Section</Typography>;
    case 'traffic':
      return <Typography variant="h6">Traffic Data</Typography>;
    case 'integrations':
      return <Typography variant="h6">Integrations Settings</Typography>;
    default:
      return <AddUserForm></AddUserForm>;
  }
}

export default function AppLayot(props) {
  const { window } = props;
  const [selectedSegment, setSelectedSegment] = React.useState('dashboard');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const theme = React.useMemo(() => getTheme(mode), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  const handleNavigation = (segment) => {
    setSelectedSegment(segment);
    router.navigate(segment);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppProvider navigation={NAVIGATION} router={router} theme={theme} window={demoWindow}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          {/* Top AppBar */}
          <AppBar position="fixed" sx={{ zIndex: 1300 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" noWrap>
                Bombay Halwa Dashboard
              </Typography>
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Sidebar Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              width: drawerOpen ? 240 : 64,
              flexShrink: 0,
              whiteSpace: 'nowrap',
              [`& .MuiDrawer-paper`]: {
                width: drawerOpen ? 240 : 64,
                boxSizing: 'border-box',
                overflowX: 'hidden',
                transition: (theme) =>
                  theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.standard,
                  }),
              },
            }}
          >
            <Toolbar />
            <IconButton color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              {drawerOpen ? <ChevronLeft /> : <Menu />}
            </IconButton>
            <List>
              {NAVIGATION.map((item) => (
                <ListItem button key={item.title} onClick={() => handleNavigation(item.segment)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {drawerOpen && <ListItemText primary={item.title} />}
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <PageContainer>
              <DashboardContent segment={selectedSegment} />
            </PageContainer>
          </Box>
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}
