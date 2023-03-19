import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { forwardRef, FunctionComponent, InputHTMLAttributes } from 'react';


export interface SearchBarInterface extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
}

export const SearchBarPartial: FunctionComponent<SearchBarInterface> = forwardRef<HTMLInputElement, SearchBarInterface>(({
  ...props
}, ref: React.Ref<HTMLInputElement>) => (
    <Paper
      component="div"
      elevation={8}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        ref={ref}
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ 'aria-label': 'search', ...props }}
      />
    </Paper>
  ));

SearchBarPartial.displayName = 'SearchBar';
