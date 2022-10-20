/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Box, TextField, Button, Avatar, Container, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Stack, Alert, AlertTitle, Autocomplete,
} from '@mui/material';
import axios from 'axios';
// ===================================================>

// ==== DEFINE CONTENT ====

// table headers
const TABLE_HEAD = [
  {
    id: 'avatar', label: 'Avatar', minWidth: 100, align: 'center',
  },
  {
    id: 'login-name', label: 'Login Name', minWidth: 100,
  },
  {
    id: 'user-id', label: 'User ID', minWidth: 100,
  },
  {
    id: 'github-page', label: 'Github Page', minWidth: 200,
  },
];

// options for locations
const locations = () => [
  { label: 'Singapore' },
  { label: 'Malaysia' },
  { label: 'Australia' },
];

export default function SearchUser() {
  // ======== STATES =========
  const [searchParams, setsearchParams] = useState({});
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ======== HELPER FUNCTIONS =========

  /**
 * @desc set state to conditionally render alert message
 * @param {Object} error from backend
 * */
  const generateAlert = (error) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  /**
 * @desc AJAX call to call backend for search for user
 * @param {Object} name main search term, required
 * @param {Object} location where user's location is set term, optional
 * */
  const callSearch = () => {
    axios
      .post('/searchUser', { searchParams })
      .then((response) => {
        if (response.data === 'error') {
          // if backend response returns an error
          generateAlert();
        } else { setUsers([...response.data]); }
      })
      .catch((error) => {
        // AJAX call itself meets an error
        generateAlert(error);
      });
  };

  // handle when user changes search name param
  const handleNameChange = (event) => {
    const newSearchParams = { ...searchParams };
    newSearchParams.name = event.target.value;
    setsearchParams(newSearchParams);
  };

  // handle when user changes location param
  const handleLocationChange = (event, newValue) => {
    const newSearchParams = { ...searchParams };
    newSearchParams.location = newValue.label;
    setsearchParams(newSearchParams);
  };

  // handle when user changes page in table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle when user changes numberof rows in table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // ======== RENDERING =========
  return (
    <>
      {/* ======  Search Terms / Parameters ========  */}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        required
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="search-name"
            label="Name"
            variant="standard"
            onChange={handleNameChange}
          />
          <br />
          <br />
          <Autocomplete
            disablePortal
            id="search-location"
            options={locations()}
            sx={{ width: 200 }}
            onChange={handleLocationChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Location (optional)" />}
          />
          <br />
          <Button variant="contained" onClick={callSearch}>Search</Button>
        </div>

        {/* ======  Error Messaging ========  */}
      </Box>
      {alert === true ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="outlined">
            <AlertTitle>Error - Something has gone wrong, please try again</AlertTitle>
          </Alert>
        </Stack>
      ) : <></>}

      {/* ======  Table displaying search results ========  */}
      <Box sx={{ my: 2 }}>
        <Container>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 520 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow key="header-row">
                    {TABLE_HEAD.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={users.indexOf(row)}>
                        <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Box sx={{ margin: 1 }}>
                            <Avatar alt={row.name} src={row.avatar_url} />
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          {row.login}
                        </TableCell>
                        <TableCell align="left">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">
                          {row.html_url}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
