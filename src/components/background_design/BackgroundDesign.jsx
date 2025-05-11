import React from 'react';
import './back.css';

const BackgroundDesign = ({ character_image, custom_size }) => {
  const imgStyle = {
    width: custom_size ? custom_size : 'auto',
    height: 'auto',
  };

  return (
    <>
      <img
        src={character_image}
        alt="Bottom Right Image"
        style={imgStyle}
        className="character_img"
      />
      <div className="bottom-bg"></div>
    </>
  );
};

export default BackgroundDesign;
