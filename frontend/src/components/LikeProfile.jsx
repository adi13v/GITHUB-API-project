/* eslint-disable no-unused-vars */
import React from 'react'
import toast from 'react-hot-toast'
import { FaHeart } from 'react-icons/fa6'

import { useAuthContext } from '../context/AuthContext';

function LikeProfile({userProfile}) {
    
    
    const {authUser,setAuthUser} = useAuthContext();
    const handleLikeProfile = async ()=>{
        try {
        console.log(userProfile);
        
                const res = await fetch(`/api/users/likes/${userProfile.login}` , {
                    method: "POST",
                    credentials: "include",
                })
                const data = await res.json();
                if(data.error) throw new Error(data.error)
                    toast.success(data.message)
        } catch (error) {
            console.log(error);
            
            toast.error("lol");
        }
    };
    if(!authUser) return null;
    if(userProfile.login===authUser?.username) return null;
  return (
    <div 
    onClick={handleLikeProfile}
    className='bg-glass font-medium w-full text-xs p-2 rounded-md cursor-pointer border border-blue-400 flex items-center gap-2'>
    <FaHeart size={16}/> Like Profile
    </div>
  )
}

export default LikeProfile