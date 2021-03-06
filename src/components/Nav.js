import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'
import { SocialIcon } from 'react-social-icons';


import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/">Listed</NavLink>
            <NavLink to="/artists/">Artists</NavLink>
            <NavLink to="/productions/">Productions</NavLink>
            <NavLink to="/news/">News</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
         
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            style={{color:'white'}}
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
        <div className="smedialinks">
        <div style={{opacity:'0.7', float:'right', marginBottom:'30px', marginRight:'69px', marginTop:'-44px'}}>
      <span style={{margin:'5px'}}>
      <SocialIcon url="https://www.facebook.com/listedbookings"  style={{ height: 25, width: 25 }} />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="https://www.instagram.com/areulisted"  style={{ height: 25, width: 25 }} />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon  url="https://twitter.com/areulisted"  style={{ height: 25, width: 25, }} />
      </span>
      </div>
      </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)


