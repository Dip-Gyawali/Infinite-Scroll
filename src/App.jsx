import { useState, useEffect} from "react";
import useBookSearch from "./useBookSearch";

export default function App(){
  const [query,setQuery]= useState("");
  const [pageNo, setPageNo]= useState(1);
  const {loading,error,books,more}=useBookSearch(query,pageNo);

  function handleChange(e){
     setQuery(e.target.value);
     setPageNo(1);
  }

  function handleMore(){
    setPageNo(p => p + 1);
  }
  useEffect(()=>{

    const handleScroll = ()=>{
      if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      if(more){
        handleMore();
      }

    }
      window.addEventListener("scroll",handleScroll);
      return ()=>{
        window.removeEventListener("scroll",handleScroll);
      }
  },[loading,more])

  return(
    <div>
       <input type="text" value={query} onChange={handleChange} placeholder="Search for books..."/>
      <div>
        {books.map((ele, index) => (
          <div key={index}>{ele}</div>
        ))}
      </div>
      <div>{loading && <h1>Loading...</h1>}</div>
      <div>{error && <h1>Error occurred while fetching data</h1>}</div>
    </div>
  );
}