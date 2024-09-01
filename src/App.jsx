import { useState } from "react";
import useBookSearch from "./useBookSearch";

export default function App(){
  const [query,setQuery]= useState("");
  const [pageNo, setPageNo]= useState(1);
  useBookSearch(query,pageNo);
  return(
    <div>
       <h1>Infinite scroll</h1>
       <h1>Loading....</h1>
    </div>
  );
}