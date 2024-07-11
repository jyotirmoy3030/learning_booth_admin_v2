import React from 'react'
// import Heading from '../../components/shared/Heading'
import dotsIcon from '../../assets/new-dashboard-img/Icon.svg';
import plusIcon from '../../assets/new-dashboard-img/Icon-1.svg';
import angleDown from '../../assets/new-dashboard-img/arrow-down.svg';
import search from '../../assets/new-dashboard-img/Search.svg';
import plussign from '../../assets/new-dashboard-img/plussign.svg';
import filter from '../../assets/new-dashboard-img/Filter.svg'
import sort from '../../assets/new-dashboard-img/Sort.svg'
import Sidebar from 'components/SideNav/Sidebar';
import Chart from "react-apexcharts";
import ScatterChart from './ScatterChart';

function AssessmentReport() {

    const externalData = [
        {
            id: 1,
            title: 'Active Jobs Openings',
            value: 2,
            time: null
        },
        {
            id: 2,
            title: 'Total Applications',
            value: 123,
            time: null
        },
        {
            id: 3,
            title: 'Shorts Listed Candidates',
            value: 80,
            time: null
        },
        {
            id: 4,
            title: 'Schedule Interviews',
            value: 4,
            time: null

        },
        {
            id: 5,
            title: 'Avg Time to Hire',
            value: 15,
            time: 'Days'

        },

    ];

    const options = {

    };

    const internalData = [
        {
            title: 'Total Assessment',
            value: 12
        }, {
            title: 'Total Employees',
            value: 1265
        }, {
            title: 'Total Skilled Employees',
            value: 254
        },

    ];

    return (
        <>
            {/* <Sidebar /> */}
            <section className='flex-1 flex flex-row ml-[308px]'>
                <div className='flex-1 bg-white pl-7 pr-[30px] pt-[14.83px]'>
                    {/* { <Heading text={'External Data'} />} */}
                    <h3 className='text-lg font-bold text-black mb-3'>External Data</h3>
                    <div className='flex gap-4 flex-wrap flex-row items-center justify-center' id={'ExternalData'}>
                        {
                            externalData.map((items, idx) => {
                                return (
                                    <div className={'flex-1 flex-col flex justify-center items-center p-[18.52px] box-border rounded-[10px] overflow-hidden externalBox'} key={idx}>
                                        <div className='flex flex-row items-center justify-between w-full'>
                                            <h3 className='line-clamp-1 flex-1 text-xs text-white font-bold'>{items?.title}</h3>
                                            <button className='w-7 h-7 bg-transparent border-none flex flex-row items-center justify-center'>
                                                <img src={dotsIcon} className='w-full h-full' alt="" />
                                            </button>
                                        </div>
                                        <div className='my-3.5 flex justify-center flex-col items-center'>
                                            <h3 className='text-white text-xl text-center font-bold'>{items?.value}</h3>
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-[7.48px] '>
                                            <button className='w-[27.78px] h-[27.48px] rounded-full  border-none bg-[#ffffff26] flex flex-row items-center justify-center'>
                                                <div className='w-3.5 h-3.5'>
                                                    <img src={plusIcon} className='w-full h-full object-contain' alt="" />
                                                </div>
                                            </button>
                                            <button className='w-[62.78px] h-[27.48px] rounded-[13.89px]  border-none bg-[#ffffff26] flex flex-row items-center justify-center'>
                                                <h3 className="text-white  font-black text-[9.26px]/[18.52px] text-center">View All</h3>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='mt-3'>
                        <h3 className='text-lg font-bold text-black mb-3'>Internal Data</h3>

                        <div className='flex gap-3 flex-wrap flex-row items-center justify-start' id={'ExternalData'}>
                            {internalData.map((items, idx) => {
                                return (
                                    <div className='bg-white rounded-md border-[#e9e9e9] border-[0.83px] w-1/4 overflow-hidden min-h-[149px] min-w-[228px]max-w-[230px] ' >
                                        <div className='internalDataCard my-1 ml-[21.56px]'>
                                            <div className='ml-0.5 mt-5'>
                                                <h3 className='font-bold text-[#3d4668] text-[11.11px] line-clamp-1'>{items?.title}</h3>
                                                <div className='mt-8'>
                                                    <h3 className='font-bold text-2xl text-[#414d55] mb-0.5'>{items?.value}</h3>
                                                    <button className='bg-transparent border-none flex flex-row mb-[17.8px]  items-center justify-center'>
                                                        <span className='text-[#4c89ff] text-sm font-normal'>View All</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='chart-section flex flex-row items-center justify-between flex-wrap lg:flex-nowrap  mt-8 mb-2.5 gap-4'>
                        <div className='bg-[#fafafb] rounded-md px-10 py-5 lg:w-3/5 w-full'>
                            <div className='flex-row flex justify-between w-full items-center'>
                                <h3 className='text-black text-lg font-semibold mb-4'>Unique Visiter</h3>
                                <div className='flex-row flex justify-end items-center gap-2'>
                                    <button className='bg-transparent border-none'>
                                        <span className='text-gray-500 text-base font-semibold'>Month</span>
                                    </button>
                                    <button className='bg-transparent border h-8  px-2 flex flex-row items-center justify-center border-blue-500 rounded'>
                                        <span className='text-blue-500 text-base font-semibold'>Week</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mixed-chart border border-slate-300 rounded overflow-hidden">
                                <Chart
                                    options={
                                        {
                                            chart: {
                                                id: "basic-bar",
                                                background: '#fff',
                                                height: 400,
                                                width: '100%',
                                                redrawOnParentResize: true,
                                                redrawOnWindowResize: true,
                                                stackOnlyBar: true
                                            },
                                            xaxis: {
                                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                            },
                                            stroke: {
                                                show: true,
                                                curve: 'smooth',
                                                // lineCap: 'butt',
                                                colors: ['#6E91E9', '#8A9BD5'],
                                                width: 2,
                                                dashArray: 0,
                                            },
                                            dataLabels: {
                                                enabled: false,
                                            },

                                        }
                                    }
                                    series={[
                                        {
                                            name: "Page View",
                                            data: [10, 30, 45, 40, 45, 70, 50],
                                            color: "#A1B2DF",
                                        },
                                        {
                                            name: "Sessions",
                                            data: [30, 35, 25, 40, 50, 55, 40],
                                            color: "#D4E1FE",
                                        }
                                    ]}
                                    type="area"
                                // width="500"
                                />
                            </div>
                        </div>
                        <div className='bg-[#1E2027] lg:w-2/5  py-5 rounded-md overflow-hidden w-full'>
                            <div className='flex-row flex justify-between w-full items-center pb-3 border-b border-[#585c6c] px-5 mb-3'>
                                <h3 className='text-white text-lg font-semibold'>Candidate Profiling</h3>
                                <select name="" id="" className='bg-[#585c6c] h-7 border-none rounded-sm text-white px-1'>
                                    <option value="Overall" className='text-white'>Overall</option>
                                </select>
                            </div>
                            <ScatterChart />
                        </div>

                    </div>
                    <div className='pt-9 w-full'>
                        <div className='flex flex-row items-center justify-start gap-[19.64px] mb-[31px]'>
                            <button className='bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-max py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px]'>
                                <span className='text-[#1F222E] font-medium text-base'>Select Jobs</span>
                                <div className='w-3 h-2'>
                                    <img src={angleDown} alt="" className='w-full h-full' />
                                </div>
                            </button>
                            <button className='bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-max py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px]'>
                                <span className='text-[#1F222E] font-medium text-base'>Location</span>
                                <div className='w-3 h-2'>
                                    <img src={angleDown} alt="" className='w-full h-full' />
                                </div>
                            </button>
                            <button className='bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-max py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px]'>
                                <span className='text-[#1F222E] font-medium text-base'>Experience Level</span>
                                <div className='w-3 h-2'>
                                    <img src={angleDown} alt="" className='w-full h-full' />
                                </div>
                            </button>
                            <button className='bg-[#F9F9FB] border-[#EDEDED] border h-[44px] w-max py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px]'>
                                <span className='text-[#1F222E] font-medium text-base'>Candidate Profile</span>
                                <div className='w-3 h-2'>
                                    <img src={angleDown} alt="" className='w-full h-full' />
                                </div>
                            </button>
                            <button className='bg-white border-[#EDEDED] border h-[44px] w-max py-[10.4px] px-[15.02px] flex flex-row items-center rounded  gap-[9px]'>
                                <div className='w-5 h-5 bg-[#DCEAFF] flex flex-row items-center justify-center rounded'>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5844 0.994141H0.759766L3.85061 4.85772C4.04284 5.09798 4.14756 5.39651 4.14756 5.70426V10.1412C4.14756 10.5154 4.4509 10.8187 4.82512 10.8187H6.51902C6.89323 10.8187 7.19657 10.5154 7.19657 10.1412V5.70426C7.19657 5.39651 7.30132 5.09798 7.49355 4.85772L10.5844 0.994141Z" stroke="#6C757D" stroke-width="1.01634" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <span className='text-[#1F222E] font-medium text-base'>All Filter</span>
                                <div className='w-3 h-2 -rotate-90'>
                                    <img src={angleDown} alt="" className='w-full h-full' />
                                </div>
                            </button>
                        </div>
                        <div className='my-4'>
                            <div className='flex flex-row items-center justify-between'>
                                <div>
                                    <button className='border-[#0057FC] border bg-white p-2.5 rounded-md h-10 flex justify-center items-center flex-row gap-2'>
                                        <span className=''>
                                            <img src={plussign} alt="" />
                                        </span>
                                        <span className='font-semibold text-[#0057FC]  text-sm text-center'>New candidate</span>
                                    </button>
                                </div>
                                <div className='w-[325px] h-10 relative'>
                                    <div className='absolute w-4 h-4 left-3 top-3'>
                                        <img src={search} alt="" />
                                    </div>
                                    <input type="text" name="" className='h-10 border border-[#CED4DA] rounded-md py-3 pl-10 w-full' id="" />
                                </div>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='w-14 border-b border-r border-[#E9ECEF] h-[35px]' >
                                            <span className='text-[#6C757D] text-xs font-bold'>#</span>
                                        </th>
                                        <th className='lg:w-[13%] border-b border-r border-[#E9ECEF] h-[35px]' >
                                            <div className='flex flex-row w-full justify-between px-5 items-center'>
                                                <span className='text-[#6C757D] text-xs font-bold'>Candidate ID</span>
                                                <span className='w-4 h-4'>
                                                    <img src={filter} alt="" className='w-full h-full' />
                                                </span>
                                            </div>
                                        </th>
                                        <th className='lg:w-[16%] border-b border-r border-[#E9ECEF] h-[35px]' >
                                            <div className='flex flex-row w-full justify-between px-5 items-center'>
                                                <span className='text-[#6C757D] text-xs font-bold'>Full Name</span>
                                                <div className='flex-row items-center justify-end gap-1 flex' >
                                                    <button className='bg-transparent border-none  w-4 h-4'>
                                                        <img src={sort} alt="" className='w-full h-full' />
                                                    </button>
                                                    <button className='bg-transparent border-none  w-4 h-4'>
                                                        <img src={filter} alt="" className='w-full h-full' />
                                                    </button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className='lg:w-[10%] border-b border-r border-[#E9ECEF] h-[35px]' >
                                            <div className='flex flex-row w-full justify-between px-5 items-center'>
                                                <span className='text-[#6C757D] text-xs font-bold'>Courses</span>
                                                <button className='bg-transparent border-none  w-4 h-4'>
                                                    <img src={filter} alt="" className='w-full h-full' />
                                                </button>
                                            </div>
                                        </th>
                                        <th className='lg:w-[12%] border-b border-r border-[#E9ECEF] h-[35px]' >
                                            <div className='flex flex-row w-full justify-between px-5 items-center'>
                                                <span className='text-[#6C757D] text-xs font-bold'>Score</span>
                                                <span className='text-[#6C757D] text-xs font-bold'>/ 100</span>
                                                <div className='flex-row items-center justify-end gap-1 flex' >
                                                    <button className='bg-transparent border-none  w-4 h-4'>
                                                        <img src={filter} alt="" className='w-full h-full' />
                                                    </button>
                                                    <button className='bg-transparent border-none  w-4 h-4'>
                                                        <img src={sort} alt="" className='w-full h-full' />
                                                    </button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className='lg:w-[20%] border-b border-r border-[#E9ECEF] h-[35px]' >
                                            <div className='flex flex-row w-full justify-between px-5 items-center'>
                                                <span className='text-[#6C757D] text-xs font-bold'>Relevant Skills</span>
                                                <div className='flex-row items-center justify-end gap-1 flex' >
                                                    <button className='bg-transparent border-none  w-4 h-4'>
                                                        <img src={filter} alt="" className='w-full h-full' />
                                                    </button>
                                                    <button className='bg-transparent border-none  w-4 h-4'>
                                                        <img src={sort} alt="" className='w-full h-full' />
                                                    </button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className='flex-1'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-[#F8F9FA] py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#56BA28]' />
                                                <span className='text-[#343A40] text-xs font-normal '>1</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#29CC390D] ' >
                                                    <span className='text-[8px] text-[#29CC39] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-white py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#56BA28]' />
                                                <span className='text-[#343A40] text-xs font-normal '>13</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0066FF0D] ' >
                                                    <span className='text-[8px] text-[#51A1FF] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-[#F8F9FA] py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#495057]' />
                                                <span className='text-[#343A40] text-xs font-normal '>1</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#29CC390D] ' >
                                                    <span className='text-[8px] text-[#29CC39] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-white py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#56BA28]' />
                                                <span className='text-[#343A40] text-xs font-normal '>13</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0066FF0D] ' >
                                                    <span className='text-[8px] text-[#51A1FF] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-[#F8F9FA] py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#FF1F25]' />
                                                <span className='text-[#343A40] text-xs font-normal '>1</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#FF6F1F0D] ' >
                                                    <span className='text-[8px] text-[#F0A043] font-black text-center'> Passed</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-white py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#56BA28]' />
                                                <span className='text-[#343A40] text-xs font-normal '>13</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0066FF0D] ' >
                                                    <span className='text-[8px] text-[#51A1FF] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-[#F8F9FA] py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#495057]' />
                                                <span className='text-[#343A40] text-xs font-normal '>1</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#29CC390D] ' >
                                                    <span className='text-[8px] text-[#29CC39] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-white py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#56BA28]' />
                                                <span className='text-[#343A40] text-xs font-normal '>13</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0066FF0D] ' >
                                                    <span className='text-[8px] text-[#51A1FF] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-[#F8F9FA] py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#495057]' />
                                                <span className='text-[#343A40] text-xs font-normal '>1</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#29CC390D] ' >
                                                    <span className='text-[8px] text-[#29CC39] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-white py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#56BA28]' />
                                                <span className='text-[#343A40] text-xs font-normal '>13</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0066FF0D] ' >
                                                    <span className='text-[8px] text-[#51A1FF] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-[#F8F9FA] py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#495057]' />
                                                <span className='text-[#343A40] text-xs font-normal '>1</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#29CC390D] ' >
                                                    <span className='text-[8px] text-[#29CC39] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-y h-[50px] border-[#E9ECEF] bg-white py-[14px]'>
                                        <td className='w-14 border-r border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>1</span>
                                        </td>
                                        <td className='w-[13%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#343A40] text-xs font-normal '>AK-123</span>
                                        </td>
                                        <td className='w-[16%] border-x border-[#E9ECEF] px-5'>
                                            <span className='text-[#5061FF] text-xs font-normal '>Alyvia Kelley</span>
                                        </td>
                                        <td className='w-[10%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-2.5 h-2.5 rounded-full border border-[#DEE2E6] bg-[#56BA28]' />
                                                <span className='text-[#343A40] text-xs font-normal '>13</span>
                                            </div>
                                        </td>
                                        <td className='w-[12%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <span className='text-[#343A40] text-xs font-normal '>60</span>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0066FF0D] ' >
                                                    <span className='text-[8px] text-[#51A1FF] font-black text-center'> Good</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-[20%] border-x border-[#E9ECEF] px-5'>
                                            <div className='flex flex-row items-center justify-start gap-2'>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'> Good</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>DS</span>
                                                </div>
                                                <div className='w-min px-2.5 flex flex-row items-center justify-center h-5 rounded-full border  bg-[#0047FF0D] ' >
                                                    <span className='text-[8px] text-[#6A7B8B] font-black text-medium'>Flutter</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex-1  '>
                                            <div className='flex flex-row items-center justify-center gap-[7.12px]'>
                                                <button className='bg-white border-[#0057FC] border  w-[35px] h-[35px]  rounded-lg flex flex-row items-center justify-center'>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.54 11.5135V5.2832H7.3097M13.3567 5.46645L5.84375 12.9794" stroke="#0057FC" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>

                                                <button className='bg-white border-[#CED4DA] border w-[35px] h-[35px] rounded-lg flex flex-row items-center justify-center'>

                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.9095 7.0957L2.24284 3.55404V10.6374H8.61784V12.054H2.24284C1.85326 12.054 1.51975 11.9153 1.24232 11.6379C0.964887 11.3605 0.826172 11.027 0.826172 10.6374V2.13737C0.826172 1.74779 0.964887 1.41428 1.24232 1.13685C1.51975 0.859418 1.85326 0.720703 2.24284 0.720703H13.5762C13.9658 0.720703 14.2993 0.859418 14.5767 1.13685C14.8541 1.41428 14.9928 1.74779 14.9928 2.13737V7.0957H13.5762V3.55404L7.9095 7.0957ZM7.9095 5.67904L13.5762 2.13737H2.24284L7.9095 5.67904ZM12.8678 14.179L11.8762 13.1874L12.9918 12.054H10.0345V10.6374H12.9918L11.8585 9.50404L12.8678 8.51237L15.7012 11.3457L12.8678 14.179ZM2.24284 3.55404V11.3457V7.0957V7.14883V2.13737V3.55404Z" fill="#212529" />
                                                    </svg>


                                                </button>
                                                <button className='bg-white border-[#CED4DA] border rounded-lg  w-[35px] h-[35px] flex flex-row items-center justify-center'>

                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.28271 6.01533L5.89925 13.1056C5.96512 13.8631 6.59929 14.4445 7.35968 14.4445H10.902C11.6624 14.4445 12.2965 13.8631 12.3624 13.1056L12.9789 6.01533M7.48163 5.83209V5.28236C7.48163 4.47273 8.13793 3.81641 8.94758 3.81641H9.31406C10.1237 3.81641 10.78 4.47273 10.78 5.28236V5.83209M4 6.01533H14.2616" stroke="#212529" stroke-width="1.31935" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='flex-1 w-full flex flex-row items-center mt-3.5 py-3 border-t border-[#DDDDDD]'>
                                <div className='flex-1 flex flex-row justify-start items-center gap-8 '>
                                    <ul className='pl-0 flex flex-row gap-[7.19px] items-center'>
                                        <li className='bg-[#E9ECEF] border border-[#E9ECEF] w-[35px] flex flex-row items-center justify-center h-[35px] rounded'>

                                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.85252 7.20898L7.28711 9.59115L9.85252 11.9733" stroke="#ADB5BD" stroke-width="1.09946" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </li>
                                        <li className='bg-[#fff] border border-[#0057FC] w-[35px] flex flex-row items-center justify-center h-[35px] rounded'>
                                            <span className='text-[#0057FC] text-[7px]  '>1</span>

                                        </li>
                                        <li className='bg-[#fff] border border-[#CED4DA] w-[35px] flex flex-row items-center justify-center h-[35px] rounded'>
                                            <span className='text-[#343A40] text-[7px]  '>2</span>

                                        </li>
                                        <li className='bg-[#fff] border border-[#CED4DA] w-[35px] flex flex-row items-center justify-center h-[35px] rounded'>
                                            <span className='text-[#343A40] text-[7px]  '>3</span>

                                        </li>
                                        <li className='bg-[#fff] border border-[#CED4DA] w-[35px] flex flex-row items-center justify-center h-[35px] rounded'>
                                            <span className='text-[#343A40] text-[7px]  '>4</span>

                                        </li>
                                        <li className='bg-[#fff] border border-[#CED4DA] w-[35px] flex flex-row items-center justify-center h-[35px] rounded'>
                                            <span className='text-[#343A40] text-[7px]  '>5</span>

                                        </li>
                                        <li className='bg-[#fff] border border-[#CED4DA] w-[35px] flex flex-row items-center justify-center h-[35px] rounded'>
                                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.11523 7.20898L10.6806 9.59115L8.11523 11.9733" stroke="#212529" stroke-width="1.09946" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </li>
                                    </ul>
                                    <div className='gap-[7px] flex flex-row items-center '>
                                        <div className='h-[35px] w-[120px]'>
                                            <select className='w-full h-full border border-[#CED4DA] rounded-lg' name=''>
                                                <options value="1" />
                                            </select>
                                        </div>
                                        <label>
                                            <span className='text-[#343A40] text-xs font-normal'>/Page</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center justify-end gap-3'>
                                    <button className='bg-white border border-[#E0E3EB] rounded-md py-2.5 flex flex-row items-center justify-center gap-2 px-4 h-[44px]'>
                                        <span>

                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.4683 7.28655L16.1443 2.96252C15.653 2.47295 14.9953 2.19922 14.3051 2.19922H8.2352C6.79994 2.19922 5.63672 3.36244 5.63672 4.7977L5.63698 20.3886C5.63698 21.8238 6.80021 22.987 8.23546 22.987H18.6291C20.0644 22.987 21.2276 21.8238 21.2276 20.3886V9.12173C21.2276 8.4315 20.9556 7.77377 20.4683 7.28655ZM14.7314 3.58291C14.9132 3.64649 15.0832 3.73906 15.2235 3.87926L19.5475 8.20329C19.6888 8.34218 19.7822 8.51271 19.8431 8.69541H15.381C15.0237 8.69541 14.7314 8.40308 14.7314 8.04579V3.58291ZM19.9283 20.3886C19.9283 21.1048 19.3453 21.6878 18.6291 21.6878H8.2352C7.51899 21.6878 6.93596 21.1048 6.93596 20.3886V4.7977C6.93596 4.08149 7.51899 3.49846 8.2352 3.49846H13.4322V8.04579C13.4322 9.12173 14.3051 9.99465 15.381 9.99465H19.9283V20.3886ZM14.0818 11.9435C14.0818 11.5862 13.7894 11.2939 13.4322 11.2939C13.0749 11.2939 12.7825 11.5862 12.7825 11.9435V16.8725L10.6428 14.7328C10.517 14.6069 10.3505 14.542 10.1841 14.542C10.0176 14.542 9.85112 14.6069 9.72526 14.7328C9.4715 14.9866 9.4715 15.3979 9.72526 15.6512L12.9734 18.8993C13.2271 19.1531 13.6384 19.1531 13.8918 18.8993L17.1399 15.6512C17.3936 15.3975 17.3936 14.9862 17.1399 14.7328C16.8861 14.4795 16.4748 14.4791 16.2215 14.7328L14.0818 16.8725V11.9435Z" fill="#1F222E" />
                                            </svg>

                                        </span>
                                        <span className='text-[#1F222E] font-medium text-sm'>Download CSV</span>
                                    </button>
                                    <button className='bg-[#2C3141] rounded-md py-2.5 flex flex-row items-center justify-center gap-2 px-4 h-[44px]'>
                                        <span>
                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.48112 8.51172L2.14779 3.92839V13.0951H10.3978V14.9284H2.14779C1.64362 14.9284 1.21202 14.7489 0.852995 14.3898C0.493967 14.0308 0.314453 13.5992 0.314453 13.0951V2.09505C0.314453 1.59089 0.493967 1.15929 0.852995 0.80026C1.21202 0.441233 1.64362 0.261719 2.14779 0.261719H16.8145C17.3186 0.261719 17.7502 0.441233 18.1092 0.80026C18.4683 1.15929 18.6478 1.59089 18.6478 2.09505V8.51172H16.8145V3.92839L9.48112 8.51172ZM9.48112 6.67839L16.8145 2.09505H2.14779L9.48112 6.67839ZM15.8978 17.6784L14.6145 16.3951L16.0582 14.9284H12.2311V13.0951H16.0582L14.5915 11.6284L15.8978 10.3451L19.5645 14.0117L15.8978 17.6784ZM2.14779 3.92839V14.0117V8.51172V8.58047V2.09505V3.92839Z" fill="white" />
                                            </svg>
                                        </span>
                                        <span className='text-white font-medium text-sm'>Bulk Mail</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AssessmentReport