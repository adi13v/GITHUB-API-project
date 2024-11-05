 const explorePopularRepos = async(req,res)=>{
  
    
    const {language} = req.params;
    try {
        const repoRes = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
            headers:{
                authorization : `token ${process.env.GITHUB_API_KEY }`
            }
           
    
        })
    
        const {items} = await repoRes.json();
      
        
        res.status(200).json(items);
    } catch (error) {
        res.status(404);
    }
}

export default explorePopularRepos

