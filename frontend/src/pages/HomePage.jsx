/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import toast from 'react-hot-toast';
import { useState,useEffect } from 'react';

import  Search  from '../components/Search';
import  SortRepos  from '../components/SortRepos';
import  ProfileInfo  from '../components/ProfileInfo';
import  Repos  from '../components/Repos';
import Spinner from '../components/Spinner';

function HomePage() {
  const [userProfile,setUserProfile] = useState(null);
  const [repos,setRepos] = useState([]);
  const [loading , setLoading] = useState(false);
  const [sortType,setSortType] = useState('forks');

  const getUserProfileAndRepos = useCallback( 
    async(username = "burakorkmez")=>{
      setLoading(true);
      try {
        const res = await  fetch(`http://localhost:5000/api/users/profile/${username}`)
                      
        if (!res.ok) {
          // Handle HTTP errors
          if (res.status === 404) {
            throw new Error("User not found");
          } else {
            throw new Error("Failed to fetch user data");
          }
        }
        const {userProfile,repos} = await res.json();
      
        setUserProfile(userProfile);
    setRepos(repos);
   
        return {userProfile,repos}
      } catch (error) {
        toast.error(error.message)
      }
      finally{
        setLoading(false); 
      }
    },[]
  )


  useEffect(()=>{
getUserProfileAndRepos();
  } , [getUserProfileAndRepos])

  const onSearch = async (e,username)=>{
    e.preventDefault();
    // setLoading(true);
    setRepos([]);
    setUserProfile(null);
    const {userProfile,repos} = await getUserProfileAndRepos(username);
    setLoading(false)
  }

  const onSort = (sortType)=>{
    if(sortType==="recent"){
      repos.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
    }
    else if(sortType==="stars"){
      repos.sort((a,b)=> b.stargazers_count - a.stargazers_count)
    }
    else if(sortType==="forks") {
      repos.sort((a,b)=>b.forks_count - a.forks_count)
    }
    setSortType(sortType);
    setRepos([...repos])
  }

  return (
   <div className="m-4">
    <Search onSearch={onSearch} />
    {repos.length>0 && <SortRepos  sortType = {sortType} onSort={onSort}/>}
    <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
      {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
      {!loading && <Repos repos={repos} />}
      {loading && <Spinner />}
    </div>
   </div>
  )
}

export default HomePage