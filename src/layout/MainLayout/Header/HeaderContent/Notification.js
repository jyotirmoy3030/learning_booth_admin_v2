import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';
// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
const styles = {
  notificationContainer: "relative",
  notificationIcon: "flex justify-center items-center gap-1 p-3 rounded-full border border-solid border-[#dcdddf] relative",
  badge: "absolute -top-1 -right-1 h-[18px] w-[18px] flex justify-center items-center bg-[#FFC727] p-1 rounded-full text-black text-xs font-bold", // Yellow Badge
  dropdownContainer: "absolute right-0 mt-2 w-[280px] bg-white shadow-lg border border-[#dcdddf] rounded-lg",
  dropdownHeader: "flex justify-between items-center px-4 py-3 border-b border-[#dcdddf]",
  dropdownContent: "p-4 flex flex-col gap-3",
  dropdownItem: "flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md",
};
// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300">
      {/* Bell Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-black"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s4-2 4-4H8c0 2 4 4 4 4Z" />
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" />
      </svg>

      {/* Red Badge */}
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
        <span className="text-white text-xs font-bold">4</span>
      </div>
    </div>
  );
};

export default Notification;
