import React from 'react';
import './Fetch.css'
import { useState, useEffect } from 'react';

const Fetch = () => {
    const [data, setData] = useState([])
    const [select, setSelect] = useState([])

    useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
    .then(res => res.json())
    .then(result => setData(result))
    }, [])

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/categories")
        .then(res => res.json())
        .then(result => setSelect(result))
        }, [])
        
    function handleDelete (e) {
        console.log(e.target.id)

        fetch(`https://api.escuelajs.co/api/v1/products/${e.target.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => setData(result))
    }

    const handleChange = (e) => {
        fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${e.target.value}`)
        .then(res => res.json())
        .then(result => setData(result))
    }

    return (
        <div className='card'>
            <div className="card-items">
            <h2>Select one of categories: </h2>
            <select onChange={e => handleChange(e)}>
                {
                    select?.map((item, index) => {
                        return <option key={index} value={item?.id}>{item?.name}</option>
                    })
                }
            </select>
            </div>

            <div className='container'>
            {
                data?.map((el, index) => {
                    return <div key={index} className='fetch'>
                        <img src={el?.images} alt="" />
                        <h1>Title: {`${el?.title}`}</h1>
                        <h1>Description: {`${el?.description}`}</h1>
                        <h1>Price: {`${el?.price}`}</h1>
                        <button className='del-btn' onClick={e => handleDelete(e)} id={el?.id}>Delete</button>
                    </div>
                })
            }
            </div>
        </div>
    )
}

export default Fetch;
