import React from 'react';
import { useParams } from 'react-router-dom'
import './style.css'

export const AboutRouterCpt = () => { 
    const { monster } = useParams();
    return <h3 className='layout'>这是什么页面： <em>{ monster }</em></h3>
}