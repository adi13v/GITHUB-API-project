/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

import Repos from '../components/Repos';
import Spinner from '../components/Spinner';
function ExplorePage() {
  const [loading,setLoading] = useState(false);
  const [repos,setRepos] = useState([]);
  const [selectedLanguage,setSelectedLanguage] = useState('');
  const exploreRepo = async (language)=>{
try{
  setSelectedLanguage(language);
  setLoading(true);
  const res = await fetch(`http://localhost:5000/api/explore/repos/${language}`);
  
  
      if(!res.ok) throw new Error("Something Went Wrong")
  
  const items = await res.json();
setRepos(items);
}
catch(e){
  toast.error(e.message);
}
finally{
  setLoading(false);
}
  }

  return (
<div className="px-4">
  <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
    <h1 className='text-xl font-bol text-center'>Explore Popular Repositories</h1>
    <div className='flex flex-wrap gap-2 my-2 justify-center'>
					<img onClick={()=>exploreRepo('javascript')} src='/javascript.svg' alt='JavaScript' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={()=>exploreRepo('typescript')} src='/typescript.svg' alt='TypeScript logo' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={()=>exploreRepo('c++')} src='/c++.svg' alt='C++ logo' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={()=>exploreRepo('python')} src='/python.svg' alt='Python logo' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={()=>exploreRepo('java')} src='/java.svg' alt='Java logo' className='h-11 sm:h-20 cursor-pointer' />
				</div>
        {
          repos.length>0 && (
            <h2 className='text-lg font-semibold text-center my-4'>
						<span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
							{selectedLanguage.toUpperCase()}{" "}
						</span>
						 Repositories
					</h2>
          )
        }
        {!loading && repos.length>0 && <Repos repos={repos} />}
        {loading && <Spinner/>}
  </div>
</div>
  )
}

export default ExplorePage