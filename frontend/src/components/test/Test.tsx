import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import Modal from "react-modal";


export const Test = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [student, setStudent] = useState([])

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [isOpen, setOpen] = useState(false);
  Modal.setAppElement("#root");

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };
  //once->use Effect
  useEffect(() => {
    fetch('http://localhost:3001/api/students')
      .then(res => res.json())
      .then(json => {
        setStudent(json)
      })
  }, [])

  const handleSaveStudentClicked = async () => {
    const newStudent = { firstName: first, lastName: last, email }
    const url = 'http://localhost:3001/api/students'

    fetch(url, {
      method: 'POST',//or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),

    }).then(res => res.json())
      .then(json => {
        console.log(json);
        /* newStudent._id=json.id */
      }).catch(e => console.log(e));
  }


  
  return (
    <div>
      <form action="">
        <input type="text" value={first} onChange={(e) => { setFirst(e.currentTarget.value) }} placeholder='First Name' />
        <input type="text" value={last} onChange={(e) => { setLast(e.currentTarget.value) }} placeholder='Last Name' />
        <input type="email" value={email} onChange={(e) => { setEmail(e.currentTarget.value) }} placeholder='Email' />
        <input type="button" value="Save" onClick={handleSaveStudentClicked} />
      </form>
    </div>
  )
}
