import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
//import Logo from './Logo';
import config from 'config';
import { activeItem } from 'store/reducers/menu';
import logo from 'assets/images/icons/logo.png';
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={{ ...sx, width: 22, fontWeight: 'bold' }}
    >
      {/* <Logo /> */}{' '}
      <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
