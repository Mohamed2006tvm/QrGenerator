import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../data/supabase'
import {LogOut} from 'lucide-react'

const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = async ()=>{
        const {error} =await supabase.auth.signOut()

        if(error)
            alert('Error in logout')
        else
            navigate('/')
    }


  return (
    <div>
        <button onClick={handleLogout} 
            className='flex items-center gap-2 px-2 py-2 rounded-lg
                 border border-red-500/40 text-red-400
                 hover:bg-red-500/10 transition'
        >
            <LogOut size={18}/>
        </button>
    </div>
  )
}

export default Logout