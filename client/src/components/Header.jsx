import { Button, Navbar, NavbarCollapse, TextInput } from 'flowbite-react';
import { Link, useLocation} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

import React from 'react'

export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl
        font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-yellow-400
            via-red-400 to-green-500 rounded-lg text-white'>Muhammad's</span>
            Blog
        </Link>

        <form>
            <TextInput 
                type = 'text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className = 'hidden lg:inline'
            />
        </form>

        <Button className='w-12 h-10 rounded-3xl lg:hidden' color='gray' >
            <AiOutlineSearch />
        </Button>

        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 rounded-3xl hidden sm:inline' color = 'gray'>
                <FaMoon />
            </Button>

            <Link to='/sign-in'>
                <Button gradientDuoTone='tealToLime' outline>
                    Sign In
                </Button>
            </Link>
        </div>
        
        <Navbar.Toggle/>
        <Navbar.Collapse>
                <Navbar.Link active = {path === '/'} as = {"div"}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active = {path === '/about'} as = {"div"} >
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active = {path === '/projects'} as = {"div"}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>

    </Navbar>
  )
}
