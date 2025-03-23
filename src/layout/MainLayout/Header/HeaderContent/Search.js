// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
  <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
    <FormControl sx={{ width: { xs: '100%', md: '224px' } }}>
      <div className="relative w-full">
        {/* Search Icon */}
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        name="title"
        className="w-full border border-gray-400 p-2 pl-10 bg-[#e9e9e9] 
                   rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Search"
      />
    </div>
  </FormControl>
  </Box >

);

export default Search;
