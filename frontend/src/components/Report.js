import React, { useEffect, useState } from 'react'
import BarChart from './charts/BarChart'
import DoughnutChart from './charts/DoughnutChart'
import axios from 'axios'


function Report() {
  let date = new Date()
  date = date.toISOString().split('T')[0]
  const [view, setView] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState(date)
  const [value, setValue] = useState('')

  const submitHandler = async () => {
    const { data } = await axios.post('http://localhost:5000/report', {
      startDate: start,
      endDate: end

    })
    setValue(data)
    setView(true)




  }
  useEffect(() => {
    submitHandler()
     
  },[start])


  return (
    <div className='my-0 mx-auto w-[100%] px-20 flex-col justify-center align-middle '>

      <div className=' flex justify-items-center w-[100%] h-14 mb-20 mt-5 '>
        <input type='date'
          className='border-2 border-gray rounded-2xl mx-2'
          onChange={(e) => setStart(e.target.value)} />
        <p className='flex align-middle justify-center pt-3'> To</p>
        <input type='date'
          className='border-2 border-gray rounded-2xl mx-2'
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <button className=" mx-5 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => { submitHandler() }}
        > sumbit</button>
      </div>

      {
        view && (
          <div className='flex-col align-middle justify-center'>
            <div className='flex align-middle justify-around'>
              <div className='w-32 h-32 m-3 rounded-xl shadow-2xl border-1'>
                <div className='flex justify-center align-middle'>
                  <p> Total tasks</p>
                
                </div>
                <div className='flex justify-center align-middle font-semibold text-2xl pt-8' >
                  {value.total}
                </div>

              </div>
              <div className='w-32 h-32 m-3 rounded-xl shadow-2xl border-1'>
                <div className='flex justify-center align-middle'>
                  <p>  tasks Completed</p>
                
                </div>
                <div className='flex justify-center align-middle font-semibold text-2xl pt-8' >
                  {value.completed}
                </div>

              </div>
              <div className='w-32 h-32 m-3 rounded-xl shadow-2xl border-1'>
                <div className='flex justify-center align-middle'>
                  <p> tasks Pending</p>
                
                </div>
                <div className='flex justify-center align-middle font-semibold text-2xl pt-8' >
                  {value.pending}
                </div>

              </div>
            


            </div>


            <div className='flex align-middle justify-center mt-10'>
              <div className='w-96 h-96'>
                <DoughnutChart value={value} />
              </div>

            </div>
          </div>

        )
      }

    </div>
  )
}

export default Report