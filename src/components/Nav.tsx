import React from 'react'
import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h3 className="font-bold">Github Search</h3>

      <span>
        <Link to="/" className="ml-2 underline">
          Home
        </Link>
        <Link to="/favorites" className="ml-2 underline">
          Favorites
        </Link>
      </span>
    </nav>
  )
}
