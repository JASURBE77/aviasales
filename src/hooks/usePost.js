import { useState } from "react";

export const usePost =  (url) => {
    const [data , setdata] = useState(null);
    const [loading , setloading] = useState(false);
    const [error , seterror] = useState(null);

    const postData =  async (bodyData) => {
        try {
            setloading(true);
            seterror(null);
            const response = await fetch(url, {
                  method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
            })

            if (!response.ok) throw new Error("Network response was not ok");

            const result = await response.json();
            setdata(result);
            return result;
        } catch (err) {
            seterror(err.message);
        } finally {
            setloading(false);
        }
    } 
    return { data, loading , error, postData }
}