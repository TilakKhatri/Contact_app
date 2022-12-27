import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';


function Home() {
    const [data, setData] = useState([]);

    const getData = () => {
        const response = axios.get('http://localhost:8080/api/get').then(function (response) {
            setData(response.data)
        }).catch((err) => {
            toast.error(err);
        })
    }
    useEffect(() => {
        getData();
    }, []);

    const removeContact = (id) => {
        axios.delete(`http://localhost:8080/api/remove/${id}`);
        toast.success("Contact Remove successfully.");
        setTimeout(() => {
            getData();
        }, 500);
    }

    return (
        <>
            <div className='mb-4'>
                <Link to='/input'> <button type="button" className="btn btn-success ">Add Contact</button></Link>
            </div>
            <table className="table table-bordered">
                <thead className='bg-success'>
                    <tr className='text-light'>
                        <th scope="col">Contact Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile no.</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((contact, index) => {
                            return (
                                <tr key={contact.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <Link to={`/update/${contact.id}`}>
                                            <button type="button" style={{ 'background': 'gray', 'padding': '.2rem .4rem', 'margin': '.24rem' }}>edit</button>
                                        </Link>
                                        <button type="button" style={{ 'background': 'red', 'padding': '.2rem .4rem', 'margin': '.24rem' }}
                                            onClick={() => { removeContact(contact.id) }}
                                        >X</button>
                                        <Link to={`/view/${contact.id}`}> <button type="button" style={{ 'background': 'blue', 'padding': '.2rem .4rem', 'margin': '.24rem' }}>Info</button></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </>

    )
}

export default Home;