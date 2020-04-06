import React from 'react';

class Logo extends React.Component {
  render() {
    const classes = this.props.className + " justify-content-center";
    const logoStyle = {
      color: 'rgba(175, 47, 47, 0.15)',
      fontSize: '100px',
    };

    return (
      <h1
        className={classes}
        style={logoStyle}
      >
        todos
      </h1>
    );
  }
}

export default Logo;
