import { useState } from "react";
import API_GMAIL from "../services/api"


const useApi=(urlObject) =>{
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false)
    
    const call = async (payload, type="")=>{
        setResponse(null)
        setError("")
        setisLoading(true)

        try {
            let res = await API_GMAIL(urlObject, payload, type);
            setResponse(res.data);
        } catch (error) {
            setError(error.message)
        } finally{
            setisLoading(false)
        }
    }

    return {call, response, error, isLoading}
}

export default useApi;