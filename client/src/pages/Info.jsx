import Avatar from '../assets/user.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Info() {
    const [user, setUser] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/get/${id}`).then((response) => {
            setUser({ ...response.data[0] });
        }).catch((err) => toast(err));

    }, [id]);

    return (
        <>
            <div className="container " style={
                {
                    "width": "90vw",
                    "margin": "auto"
                }
            }>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body text-center">
                                <img src={Avatar} alt='avater'
                                    width="100px"
                                    height="100px"
                                />
                                <h4>{user.name}</h4>
                                <h3>Email:{` ${user.email}`}</h3>
                                <h3>Phone:{` ${user.phone}`}</h3>

                                <Link to='/'>
                                    <button className="btn1 btn-out btn-square"> Back</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info;