import React from 'react';
import { useFetch } from '../hooks/useFetch';
export default function IdiotFoolInfo({ login='idiotFool' }) {
    const { data, loading, error } = useFetch(`https://api.github.com/users/${login}`)

    if (loading) {
        return <h1>Loading....</h1>
    } 

    if (error) {
        return <pre>{JSON.stringify(error)}</pre>
    }

    return (
        <div>
             <img src={data.avatar_url} alt={data.login} />
             <h3>{data.name}</h3>
        </div>
    );
}