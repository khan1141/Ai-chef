import React from 'react'
import logo from "../images/chef_logo.png"

export default function Header() {
  return (
    <header className='header'>
    <img src={logo} alt="logo"/>
      <h1>Chef Claude</h1>
    </header>
  )
}
