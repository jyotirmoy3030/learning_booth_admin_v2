import React from 'react'
import doblearrow from '../../assets/new-dashboard-img/doble-arrow.svg'
import SideDropDown from './SideDropDown'
import './SideBar.css';
import boxed from '../../assets/sideNavImage/boxed.svg'
import comment from '../../assets/sideNavImage/comment.svg'
import setting from '../../assets/sideNavImage/setting.svg'
import unnomi from '../../assets/sideNavImage/unnomi.svg'
import users from '../../assets/sideNavImage/users.svg'
import sidebag from '../../assets/sideNavImage/sidebag.svg'

function Sidebar() {

    const sideNavData = [
        {
            id: 1,
            title: 'Dashboard',
            image: boxed,
            submenu: [
                {
                    id: 1,
                    title: 'Job Roles',
                },
                {
                    id: 2,
                    title: 'Job ',
                }
            ]
        },
        {
            id: 2,
            title: 'Manage Jobs',
            image: sidebag,
            submenu: [
                {
                    id: 1,
                    title: 'Job Roles',
                },
                {
                    id: 2,
                    title: '+ Create Jobs',
                }
            ]
        },
        {
            id: 3,
            title: 'Manage Skill Profiling',
            image: users,
            submenu: [
                {
                    id: 1,
                    title: 'Internal Skill Profiling',
                },
                {
                    id: 2,
                    title: 'External Skill Profiling',
                }
            ]
        },
        {
            id: 3,
            title: 'Results & Reports',
            image: comment,
            submenu: [
                {
                    id: 1,
                    title: 'Internal ',
                },
                {
                    id: 2,
                    title: 'External',
                }
            ]
        }
    ]

    return (
        <div className="bg-[#F7F8FA] px-6 pt-6 fixed top-0 left-0 w-[308px] min-h-screen ">
            <div className='w-full justify-end flex flex-row'>
                <button className='h-[50px] buttonshadow bg-white  w-[100px] rounded-lg flex flex-row items-center justify-center px-3 py-1 gap-1'>
                    <span className='w-3.5 h-3'>
                        <img src={doblearrow} alt="" className='w-full h-full' />
                    </span>
                    <span className='text-[#6B7A99] font-bold text-xs'>Compress</span>
                </button>
            </div>
            <div className='p-3  mt-2.5 rounded-2xl border-[1.68px] border-[#EDEFF2]'>
                <ul className='pl-0 sideNav '>
                    {
                        sideNavData.map((items, idx) => {
                            return (
                                <SideDropDown item={items} idx={idx} />
                            )
                        })
                    }
                    <li className='flex !bg-transparent px-3 !shadow-none flex-row items-center justify-between w-full mb-2'>
                        <div className='flex flex-row items-center justify-start gap-4'>
                            <div className='w-6 h-6 flex-row items-center justify-center'>
                                <img src={unnomi} className='w-4 h-4' alt="" />
                            </div>
                            <span className='text-[#6B7A99] text-xs font-bold '>Courses</span>
                        </div>
                        <div className='flex-row flex items-center gap-2'>
                            <div className='notify-icon !bg-white w-[25.16px] h-[25.16px] rounded-full flex flex-row items-center justify-center'>
                                <span className='text-[10.06px] text-center font-black text-[#6B7A99]'>5</span>
                            </div>
                            <div className={`w-6 h-6 flex flex-row items-center justify-center  `}>
                               
                            </div>
                        </div>
                    </li>
                    <li className='flex !bg-transparent px-3 !shadow-none flex-row items-center justify-between w-full mb-2'>
                        <div className='flex flex-row items-center justify-start gap-4'>
                            <div className='w-6 h-6 flex-row items-center justify-center'>
                                <img src={comment} className='w-4 h-4' alt="" />
                            </div>
                            <span className='text-[#6B7A99] text-xs font-bold '>Feedback & Support</span>
                        </div>
                        <div className='flex-row flex items-center gap-2'>

                            <div className={`w-6 h-6 flex flex-row items-center justify-center `}>

                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9875 16.6243L14.2417 13.3701L10.9875 10.1159C10.6604 9.78879 10.6604 9.2604 10.9875 8.9333C11.3146 8.60621 11.843 8.60621 12.1701 8.9333L16.0198 12.783C16.3469 13.1101 16.3469 13.6385 16.0198 13.9656L12.1701 17.8152C12.0134 17.9723 11.8007 18.0605 11.5788 18.0605C11.3569 18.0605 11.1442 17.9723 10.9875 17.8152C10.6688 17.4881 10.6604 16.9514 10.9875 16.6243V16.6243Z" fill="#C3CAD9" />
                                </svg>

                            </div>
                        </div>
                    </li>
                    <li className='flex !bg-transparent px-3 !shadow-none flex-row items-center justify-between w-full mb-2'>
                        <div className='flex flex-row items-center justify-start gap-4'>
                            <div className='w-6 h-6 flex-row items-center justify-center'>
                                <img src={comment} className='w-4 h-4' alt="" />
                            </div>
                            <span className='text-[#6B7A99] text-xs font-bold '>Bracket Coins</span>
                        </div>
                        <div className='flex-row flex items-center gap-2'>

                            <div className={`w-6 h-6 flex flex-row items-center justify-center `}>

                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9875 16.6243L14.2417 13.3701L10.9875 10.1159C10.6604 9.78879 10.6604 9.2604 10.9875 8.9333C11.3146 8.60621 11.843 8.60621 12.1701 8.9333L16.0198 12.783C16.3469 13.1101 16.3469 13.6385 16.0198 13.9656L12.1701 17.8152C12.0134 17.9723 11.8007 18.0605 11.5788 18.0605C11.3569 18.0605 11.1442 17.9723 10.9875 17.8152C10.6688 17.4881 10.6604 16.9514 10.9875 16.6243V16.6243Z" fill="#C3CAD9" />
                                </svg>

                            </div>
                        </div>
                    </li>
                    <li className='flex !bg-transparent px-3 !shadow-none flex-row items-center justify-between w-full mb-2'>
                        <div className='flex flex-row items-center justify-start gap-4'>
                            <div className='w-6 h-6 flex-row items-center justify-center'>
                                <img src={setting} className='w-4 h-4' alt="" />
                            </div>
                            <span className='text-[#6B7A99] text-xs font-bold '>Settings</span>
                        </div>
                        <div className='flex-row flex items-center gap-2'>

                            <div className={`w-6 h-6 flex flex-row items-center justify-center `}>
                               
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar