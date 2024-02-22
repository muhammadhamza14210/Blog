import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight} from 'react-icons/hi'
import { useState,useEffect } from "react"
import { useLocation,Link } from "react-router-dom"

export default function DashSideBar() {
const location = useLocation()
const [tab,setTab] = useState('');
useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if(tabFromUrl){
    setTab(tabFromUrl)
    }
},[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to="/dashboard?tab=profile">
                <Sidebar.Item active = {tab === 'profile'} icon = {HiUser} label={'User'} labelColor='dark'>Profile</Sidebar.Item>
                </Link>
                <Sidebar.Item icon = {HiArrowSmRight}>LogOut</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
