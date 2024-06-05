import React, { useState } from 'react'

function SideDropDown({ item, idx }) {

    const [isopen, setIsOpen] = useState(false);

    return (
        <li className={`px-4 py-3 w-full rounded-lg mb-2 ${item?.id == 1 ? 'active' : ''}`} key={idx}>
            <button className={`flex justify-between flex-row items-center !visible w-full `} style={{ visibility: 'visible !important' }} onClick={() => { setIsOpen(!isopen) }}>
                <div className='flex flex-row items-center justify-start gap-4'>
                    <div className='w-6 h-6 flex-row items-center justify-center'>
                        <img src={item.image} className='w-4 h-4' alt="" />
                    </div>
                    <span className='text-[#28324F] text-xs font-bold '>{item.title}</span>
                </div>
                <div className='flex-row flex items-center gap-2'>
                    {item?.id == 1 && <div className='notify-icon w-[25.16px] h-[25.16px] rounded-full flex flex-row items-center justify-center'>
                        <span className='text-[10.06px] text-center font-black text-white'>5</span>
                    </div>}
                    <div className={`w-6 h-6 flex flex-row items-center justify-center ${isopen ? 'rotate-180' : ''}`}>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.04956 0.434776L5.30375 3.68897L8.55795 0.434776C8.88504 0.107679 9.41343 0.107679 9.74053 0.434776C10.0676 0.761872 10.0676 1.29026 9.74053 1.61736L5.89085 5.46703C5.56375 5.79413 5.03537 5.79413 4.70827 5.46703L0.858592 1.61736C0.701541 1.46066 0.613281 1.24792 0.613281 1.02607C0.613281 0.804213 0.701541 0.591473 0.858592 0.434776C1.18569 0.116066 1.72246 0.107679 2.04956 0.434776V0.434776Z" fill={"#28324F"} />
                        </svg>
                    </div>
                </div>
            </button>
            {isopen &&
                <div className='border-t-[1.68px] mt-3 pt-3 border-[#F5F6F7] '>
                    <div className='flex flex-col gap-3'>
                        {item?.submenu.map((sub, indx) => {
                            return (
                                <div className='flex flex-row items-center justify-between' key={indx}>
                                    <div className='flex flex-row items-center gap-4 justify-start'>
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0982 11.9326C17.4905 11.9326 18.606 10.8088 18.606 9.41652C18.606 8.02426 17.4905 6.90039 16.0982 6.90039C14.706 6.90039 13.5821 8.02426 13.5821 9.41652C13.5821 10.8088 14.706 11.9326 16.0982 11.9326ZM9.38855 11.9326C10.7808 11.9326 11.8963 10.8088 11.8963 9.41652C11.8963 8.02426 10.7808 6.90039 9.38855 6.90039C7.99629 6.90039 6.87242 8.02426 6.87242 9.41652C6.87242 10.8088 7.99629 11.9326 9.38855 11.9326ZM9.38855 13.6101C7.43435 13.6101 3.51758 14.5914 3.51758 16.5456V17.8036C3.51758 18.2649 3.895 18.6423 4.35629 18.6423H14.4208C14.8821 18.6423 15.2595 18.2649 15.2595 17.8036V16.5456C15.2595 14.5914 11.3427 13.6101 9.38855 13.6101ZM16.0985 13.6101C15.8552 13.6101 15.5785 13.6268 15.2849 13.652C15.3017 13.6604 15.3101 13.6772 15.3185 13.6856C16.2746 14.3817 16.9372 15.3126 16.9372 16.5456V17.8036C16.9372 18.0972 16.8785 18.3823 16.7862 18.6423H21.1307C21.592 18.6423 21.9694 18.2649 21.9694 17.8036V16.5456C21.9694 14.5914 18.0526 13.6101 16.0985 13.6101Z" fill="#BEC3D7" />
                                        </svg>
                                        <span className='text-[#6B7A99] text-xs font-normal text-'>{sub?.title}</span>
                                    </div>
                                    <button className='bg-transparent border-none'>
                                        <span className='text-[#6699FF] text-[8.98px]/[16px] font-black '>View</span>
                                    </button>
                                </div>
                            )
                        })}

                    </div>
                </div>
            }
        </li>
    )
}

export default SideDropDown