import React, { useEffect, useState } from 'react'
import { NavLinks } from '../../NavBar/NavLinks';
import { Footer } from '../../Footer/Footer';
import css from './SignUp.module.scss'
import axios from 'axios';
import NavBar from '../../NavBar/NavBar';
import { Nav } from '../Nav/Nav';
/* import { NavSign } from '../../NavBar/navSign/navSign'; */
//להירשם



export const SignUp = () => {

    const url = 'http://localhost:3001/api/auth/signup'

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log("error: " + err);

            })
    })


    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [errorUser, setErrorUser] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');


    const isValidConfirm = (confirmPass: string) => {
        if (confirmPass === password)
            return true;
    }


    const isValidEmail = (email: string) => {
        const check1 = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
        return check1;
    }


    const isValidPassword = (password: any) => {
        const check2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(password);
        return check2;
    }



    const handleUser = (e: any) => {
        setUserName(e.currentTarget.value);

        if (userName === '' || userName.length == 0) {
            setErrorUser('Invalid Username.')
            setSubmit(false);
        }
        else {
            setErrorUser('')
            setError(false)
        }

    }



    const handleEmail = (e: any) => {
        setEmail(e.currentTarget.value);
        console.log(email)
        if (!isValidEmail(e.target.value) || email === '' || email.length == 0) {
            setEmailError('Invalid Email.');
            setSubmit(false)
        }
        else {
            setEmailError('')
            setError(false);
        }
    }

    const handlePassword = (e: any) => {
        setPassword(e.currentTarget.value);
        if (!isValidPassword(e.target.value) || password === '' || password.length == 0) {
            setErrorPass('Invalid Password.')
            setSubmit(false)
        }
        else {
            setErrorPass('');
            setError(false)
        }
    }


    const handleConfirmPassword = async (e: any) => {
        setConfirmPassword(e.currentTarget.value);

        if (!isValidConfirm(e.target.value)) {
            setConfirmPasswordError('Error')
        }
        else {
            setConfirmPasswordError('')
        }
    }

    console.log(password, confirmPassword, confirmPasswordError)


    //if the value is empty
    const handleSubmit = (e: any) => {
        //מונע ריענון של העמוד
        e.preventDefault();

        if (!isValidEmail(email) || !isValidPassword(password) || !isValidConfirm(confirmPassword)) {
            setError(true);
            setSubmit(false)
            alert('Please enter all fields')
        }
        else {
            alert('All the fields is full')
            setSubmit(true);
            setError(false);

        }
        const newUser = { username: userName, email, password }

        fetch(url, {
            method: 'POST',//or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),

        }).then(res => res.json())
            .then(json => {
                console.log(json);
                /* newStudent._id=json.id */
            }).catch(e => console.log(e));
    };


    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                    color: 'red',
                    fontFamily: 'lato',
                    fontSize: "12px",

                }}>
                <h2>Please Enter correct values. </h2>
            </div>
        );
    };

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submit ? '' : 'none',
                    color: 'green',
                    fontSize: "12px",
                    fontFamily: "lato"
                }}>
                <h2>You have successfully registered!</h2>
            </div>
        );
    };


    return (

        <div className={css.signup}>
            <NavBar />

            <form className={css.form}>
                <h1 className={css.title}>Sign Up</h1>
                {/* <label htmlFor="" className={css.label}>Username:</label><br /> */}
                <input type="text" value={userName} placeholder=' &#xf007;
                Username*' onChange={handleUser} className={css.input} /><br />
                {errorUser && <h2 style={{ color: 'red', fontSize: "10px" }}>{errorUser}</h2>}
                {/* <label htmlFor="" className={css.label}>Email:</label><br /> */}
                <input type="email" id='email' value={email} placeholder=' &#xf0e0; Email*' onChange={handleEmail} className={css.input} />
                <br />
                {emailError && <h2 style={{ color: 'red', fontSize: "10px" }}>{emailError}</h2>}

                {/* <label htmlFor="" className={css.label}>Password:</label><br /> */}
                <input type="password" value={password} placeholder=' &#xf023; Password*' onChange={handlePassword} className={css.input} />
                <br />
                {errorPass && <h2 style={{ color: 'red', fontSize: "10px" }}>{errorPass}</h2>}

                <input type="password" value={confirmPassword} placeholder='&#xf00c; Confirm Password*' onChange={(e) => handleConfirmPassword(e)} className={css.input} /><br />

                {confirmPasswordError && <h2 style={{ color: 'red', fontSize: "10px" }}>{confirmPasswordError}</h2>}
                <div className={css.rem}>
                    <input type="checkbox" />
                    <label htmlFor=""> Remember me</label>
                </div>
                <button type='submit' className={css.button} onClick={handleSubmit}>Sign up</button>
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>

            </form>
            <Footer />
        </div>
    )
}

export default SignUp


















