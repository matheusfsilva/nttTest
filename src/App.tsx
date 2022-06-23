import React from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Store from './providers/redux/store';
import Menu from './components/Menu';
import { AppRoutes } from './routes';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Grid container>
          <Grid item xs={0} sm={2}>
            <Menu />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Container sx={{ marginTop: '100px' }}>
              <AppRoutes />
            </Container>
          </Grid>
        </Grid>
      </Router>
    </Provider >
  );
}

export default App;
