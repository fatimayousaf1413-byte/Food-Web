import { useContext, useState } from 'react'
import './Loginpopupstyle.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { Storecontext } from '../../Context/Storecontext'
import { toast } from 'react-toastify'

const Loginpopup = ({ setshowlogin }) => {
    const { setToken } = useContext(Storecontext);
    const [currentstate, setcurrentstate] = useState("Sign Up")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let newUrl = "";
            if (currentstate === "Log In") {
                newUrl = "http://localhost:3000/api/user/login";
            } else {
                newUrl = "http://localhost:3000/api/user/signup";
            }
            const response = await axios.post(newUrl, data)
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token)
                setshowlogin(false)
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
        let newUrl = "";
        if (currentstate === "Log In") {
            newUrl = "http://localhost:3000/api/user/login";
        } else {
            newUrl = "http://localhost:3000/api/user/signup";
        }
    }

    return (
        <div className="loginpopup">
            <form onSubmit={onSubmitHandler} className="loginpopup-container">
                <div className="loginpopup-title">
                    <h2>{currentstate}</h2>
                    <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="loginpopup-inputs">
                    {currentstate === "Log In" ? <></> : <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required />}
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
                </div>
                <button type='submit'>{currentstate === 'Sign Up' ? 'Create account' : 'Log In'}</button>
                <div className="loginpopup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
                {currentstate === 'Log In'
                    ? <p>Create a new acount?    <span onClick={() => setcurrentstate('Sign Up')} >Click here</span></p>
                    : <p>Already have an account?<span onClick={() => setcurrentstate('Log In')} >Login here</span> </p>}
            </form>
        </div>
    )
}

export default Loginpopup