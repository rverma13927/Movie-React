import React, { useEffect, useState } from 'react';
import API from '../API';


 
  

const Home=()=>{
     
    const [state,setState] = useState();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
 

    const fetchMovies =async(page,seachTerm="")=>{
       try{
        setError(false);
        setLoading(true);
        const movies = await API.fetchMovies(seachTerm,page);

         console.log(movies);

         //return an object therefore we have to add paranthesis 
         // never mutate the state in react use setState function
         setState(prev=>({
             ...movies,
            results: 
              page>1 ? [...prev,...movies.results] : [...movies.results]
         }));
       }catch(error){
          setError(true);
       }
       setLoading(false);
       console.log(state)
    }

    //initial render only once since []
    useEffect(()=>{
        fetchMovies(1,"");
    },[])
    
    return <div>Home Page</div>
}


export default Home;

