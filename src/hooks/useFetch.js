import { useState, useEffect } from 'react'
export function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) {
            return;
        }
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(error => {
                setLoading(false)
                setError(error)
            })
    }, [url])


    return {
        data,
        loading,
        error
    }
}