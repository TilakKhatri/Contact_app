import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'

const initialState = {
    name: "",
    email: "",
    phone: "",

}


function Input() {
    const navigate = useNavigate();
    const [input, setInput] = useState(initialState);
    const { name, email, phone } = input;
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/get/${id}`).then(function (response) {
            setInput(response.data[0])
        }).catch((err) => {
            toast.error(err);
        })
    }, [id])

    function handleSubmit(e) {
        e.preventDefault();
        console.log(name, email, phone)
        if (!name || !email || !phone) {
            toast.error('Fill all the input.');
        }
        else {
            if (!id) {
                axios.post('http://localhost:8080/api/post', { name, email, phone }).then(() => {
                    setInput({ name: "", email: "", phone: "" });
                }).catch((err) => toast.err(err.response.data));
                toast.success('Added successfully.')
                setTimeout(() => {
                    navigate('/');
                }, 500)
            }
            else {
                axios.put(`http://localhost:8080/api/update/${id}`, { name, email, phone }).then(() => {
                    setInput({ name: "", email: "", phone: "" });
                }).catch((err) => toast.err(err.response.data));
                toast.success('Updated successfully.')
                setTimeout(() => {
                    navigate('/');
                }, 500)
            }
        }
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        });
    }

    return (
        <>

            <div class="registration-form">
                <form onSubmit={handleSubmit}>

                    <div class="form-group">
                        <input type="text"
                            className="form-control item"
                            id="name"
                            name='name'
                            value={name || ""}
                            placeholder="Fullname"
                            onChange={handleInput}
                        />
                    </div>

                    <div class="form-group">
                        <input type="text"
                            className="form-control item"
                            id="email"
                            name='email'
                            value={email || ""}
                            placeholder="Email"
                            onChange={handleInput}
                        />
                    </div>
                    <div class="form-group" >
                        <input type="text"
                            maxLength={10}
                            class="form-control item"
                            id="phone"
                            name='phone'
                            value={phone || ""}
                            placeholder="Phone Number"
                            onChange={handleInput}
                        />
                    </div>

                    <div class="form-group">
                        {
                            id ? <button type="submit" class="btn btn-block submit">Update</button> : <button type="submit" class="btn btn-block submit">Submit</button>
                        }
                    </div>
                </form>
                <Link
                    to='/'
                ><button type="button" class="btn btn-block back">Back</button>
                </Link>
            </div>
        </>
    )
}

export default Input;