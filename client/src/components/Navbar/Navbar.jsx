import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
     
      <Divider />
      <List>
      <Link to="/"  style={{textDecoration: "none",textAlign: "center"}}>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={"Principal"} />
            </ListItemButton>
          </ListItem>
      </Link>
      <Link to="/acerca" style={{textDecoration: "none"}} >
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={"Nosotros"} />
            </ListItemButton>
          </ListItem>
      </Link>
      <Link to="/galeria" style={{textDecoration: "none"}} >
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={"Galeria"}  />
            </ListItemButton>
          </ListItem>
      </Link>
      <Link to="/contacto" style={{textDecoration: "none"}}>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={"Contacto"} />
            </ListItemButton>
          </ListItem>
      </Link>
   

        
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor: "white"}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
       
        <Box   color="inherit"
            aria-label="open drawer"
            edge="end"
            sx={{ mr: 2, display: { sm: 'none',   } }}>
          <Link to="/" >
          <img src={require("../../assets/img/logo-removebg.png")} alt=""  className="logo"/>
        </Link>
          </Box>
        
        
          <Typography
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          <Link to="/" >
          <img src={require("../../assets/img/logo-removebg.png")} alt=""  className="logo"/>
        </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, paddingRight: "200px" }}>
          
              <Link to='/'  >
              <Button  sx={{ color: '#000' }}>
                 Principal
              </Button>

              </Link>
              <Link to='/acerca'  >

              <Button   sx={{ color: '#000' }}>
              Nosotros
              </Button>
              </Link>
              <Link to='/galeria'  >

              <Button  sx={{ color: '#000' }}>
              Galeria
              </Button>
              </Link>
              <Link to='/contacto'  >

              <Button  sx={{ color: '#000' }}>
             Contacto

              </Button>
              </Link>

             
          </Box>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: "black", justifyContent: "end" }}
            >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    
      <nav>
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
   
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
