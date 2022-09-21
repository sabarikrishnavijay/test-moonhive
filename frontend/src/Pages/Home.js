import React, { useState } from 'react'
import Report from '../components/Report'
import Tasks from '../components/Tasks'
import Users from '../components/Users'

function Home() {
    const [selected, setSelected] = useState('user')

    return (
        <div class="flex flex-row w-full h-full ">
            <div className='basis-[20%] h-screen bg-white flex-col flex justify-start align-middle mt-5 px-2'>
                <div className='w-[80%] border-black border m-1 rounded-lg flex justify-center align-middle'
                onClick={()=> setSelected('user')}
                > users</div>
                <div className='w-[80%] border-black border m-1 rounded-lg flex justify-center align-middle'
                    onClick={() => setSelected('task')}

                > tasks</div>
                <div className='w-[80%] border-black border m-1 rounded-lg flex justify-center align-middle'
                    onClick={() => setSelected('report')}
                > Reports</div>

            </div>
            <div className='basis-[80%] h-[100%] bg-white mt-5 border-l-2 border-gray-300 '>
                {selected === 'user' && <Users />}
                {selected === 'task' && <Tasks />}
                {selected === 'report' && <Report />}

            </div>

        </div>
    )
}

export default Home