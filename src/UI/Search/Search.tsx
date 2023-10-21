import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import QueryContext from '@/context/QueryContext/QueryContext';
import ThemeContext from '@/context/ThemeContext/ThemeContext';

export default function SearchBar() {
  
  const queryContext = React.useContext(QueryContext);
  const themeContext = React.useContext(ThemeContext);

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: "50px", border: ".1px solid #eee", margin: "1rem 0",
      background: (themeContext.appThemeMode == "light") ? "#fff" : "#131314" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color:(themeContext.appThemeMode == "light") ? "#131314" : "#fff",
      fontWeight: (themeContext.appThemeMode == "light") ? "" : "300" }}
        inputProps={{ style: { opacity: ".7" }}}
        placeholder="Search"
        onChange={(event) => queryContext.searchQuery(event.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px', color:(themeContext.appThemeMode == "light") ? "#131314" : "#fff" }} 
      aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}