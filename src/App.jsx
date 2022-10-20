/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import SearchCategory from './components/SearchCategory.jsx';
import SearchUser from './components/SearchUser.jsx';
import SearchRepos from './components/SearchRepos.jsx';
// ===================================================>

export default function App() {
  // ======== STATES =========
  const [category, setCategory] = useState('');

  // ======== HELPER FUNCTIONS =========

  // setting theme for styling
  const theme = createTheme({
  });

  // ======== RENDERING =========
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: 5, my: 2 }}>
        <SearchCategory setCategory={setCategory} category={category} />
        {category === 'Users' ? <SearchUser /> : <></>}
        {category === 'Repositories' ? <SearchRepos /> : <></>}
      </Box>
    </ThemeProvider>
  );
}
