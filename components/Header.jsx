import React from 'react';
import { Link } from 'react-router';
import { rhythm, fontSizeToMS } from 'utils/typography'
import { prefixLink } from 'gatsby-helpers'
import Nav from './Nav.jsx'

class Header extends React.Component {

  createNavHeader() {
    const avatar = (
      <Link to={prefixLink('/')}>
        <img
          src="https://cl.ly/392G2Q0c2w3x/BrusselsTogetherHashLogo.png"
          alt="BrusselsTogether logo"
          title="Go to homepage"
          className="nav-header__avatar" />
      </Link>
    );

    const siteTitle = (
      <Link
        to={prefixLink('/')}
        className="nav-header__title">
        {this.props.title}
      </Link>
    );

    return (
      <h1 className="nav-header">
        { avatar }
        { siteTitle }
      </h1>
    );
  }

  render() {
    const navHeader = this.createNavHeader();
    return (
      <div className="nav">
        { navHeader }

        <Nav />

        <div className="nav-social">
          <a href="https://slack.brusselstogether.org" target="_blank" className="nav-social__icon slack" rel="noopener noreferrer"></a>

          <a href="https://facebook.com/groups/BrusselsTogether" target="_blank" className="nav-social__icon facebook" rel="noopener noreferrer"></a>

          <a href="http://twitter.com/brutogether" target="_blank" className="nav-social__icon twitter" rel="noopener noreferrer"></a>

          <a href="https://opencollective.com/brusselstogether" target="_blank" className="nav-social__icon opencollective" rel="noopener noreferrer"></a>

          <a href="http://github.com/brusselstogether" target="_blank" className="nav-social__icon github" rel="noopener noreferrer"></a>

          <a href="mailto:info@brusselstogether.org" className="nav-social__icon email"></a>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired
};

export default Header;
