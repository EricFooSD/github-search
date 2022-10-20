/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// ===================================================>

// ==== DEFINE CONTENT ====
const categories = () => [
  { label: 'Users' },
  { label: 'Repositories' },
];

export default function SearchCategory({ setCategory, category }) {
  // ======== HELPER FUNCTIONS =========

  /**
 * @desc handle change when user changes input for search category
 * */
  const handleInputChange = (event, newValue) => {
    if (newValue !== null && newValue !== category) {
      setCategory(newValue.label);
    } else if (newValue === null) { setCategory(''); }
  };

  // ======== RENDERING =========
  return (
    <Autocomplete
      disablePortal
      id="search-category"
      options={categories()}
      sx={{ width: 300 }}
      value={category}
      onChange={handleInputChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label="Search Category" />}
    />
  );
}
