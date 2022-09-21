import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddTask from './AddTask'
import Button from './Button'
function Tasks() {
  const [task, setTask] = useState([])
  const [count, setCount] = useState(0)
 
 
 
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios('http://localhost:5000/task')
      console.log(data);
      return setTask(data)


    }
    fetchData()
  }, [count])


  const startHandler = async (id) => {
    await axios.post('http://localhost:5000/startTask', {
      id:id
    })
    setCount(count+1)
 
    
  }

  const endHandler = async(id) => {
    await axios.post('http://localhost:5000/endTask', {
      id: id
    })
    setCount(count + 1)
    
  }



  return (
    <div>
      <AddTask count={ count} setCount={setCount} />

      <div>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Task list</h2>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Task
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Esitmatied Time
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Select
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        total time in hour 
                      </th>
                     


                    </tr>
                  </thead>
                  <tbody>

                    {
                      task.map((item, index) => {
                        return (
                          
                          <tr >
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                              <div className="flex items-center">

                                <div className="ml-1">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item.taskName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {item.date}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {item.estimated_time}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="text-gray-900 whitespace-no-wrap text-center">
                              
                                {item.total_time ? (<p> Task  Completed</p>) : (
                                  
                                  item.started_At ? (<button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-red-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-400 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={() => endHandler(item._id)}
                                  >end Task</button>) : (

                                    <button
                                      type="button"
                                      data-mdb-ripple="true"
                                      data-mdb-ripple-color="light"
                                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                      onClick={() => startHandler(item._id)}
                                    >Start task</button>
                                  )
                                )}
                                
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap text-center">{
                                item.total_time
                              }
                              </p>
                            </td>


                          </tr>


                        )
                      })
              }


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks