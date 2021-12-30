
import { useEffect, useState } from 'react';
import API from '../API';


const initialState= {
    page : 0,
    results : [],
    total_pages : 0,
    total_results : 0
};

export const useHomeFetch= ()=>{
    const [state,setState] = useState(initialState);
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
   // it will send state : state , loading : loading automatically 
    return {state,loading,error};
}