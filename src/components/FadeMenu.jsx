import * as React from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import genreParam from '../data/genreParam.json'
import { useState } from 'react';
import { SearchGender } from '../utils/SearchMovie';

export default function FadeMenu({ genreSelection }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (selectedGenre) => {
    console.log(selectedGenre.id)
    const id = selectedGenre.id
    setAnchorEl(null);
    genreSelection(id)
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Search By Genre
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {genreParam.genres.map((genre) => (
          <MenuItem key={genre.id} onClick={() => handleClose(genre)}>{genre.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}