import { useEffect, useState } from "react";

const useFetch = (url, deps = []) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, deps);
  return { response, error };
};

export default useFetch;
