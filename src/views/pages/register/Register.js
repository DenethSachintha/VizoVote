import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser,cilPhone } from '@coreui/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom';
import { useRegisterMutation } from "src/slices/usersApiSlice";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
const Register = () => {
  
  const [userData, setUserData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
    role: 'admin'  // Assuming role is constant here
  });
  const [feedback, SetFeedback] = useState(false);
  const [loginApiCall , {isLoading, error}] = useRegisterMutation()
  const [message, setMessage] = useState('');
  const { userInfo } = useSelector((state) => state.auth)
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value, 
    });
  };

  const navigateLogin =()=>{
    navigate('/login');
  }

  useEffect(()=>{
    if(userInfo){
      navigate('/dashboard')
    }
  },[userInfo,navigate])

  function validateForm() {
    setMessage('');
    SetFeedback(false);
    if (userData.firstName.length == 0) {
      setMessage('First Name can not be empty');
      SetFeedback(true);
      return
    }
    if (userData.secondName.length == 0) {
      setMessage('Second Name can not be empty');
      SetFeedback(true);
      return
    }
    if (userData.email.length == 0) {
      setMessage('Email Address can not be empty');
      SetFeedback(true);
      return
    }

    let countUpperCase = 0
    let countLowerCase = 0
    let countDigit = 0
    let countSpecialCharacters = 0

    for (let i = 0; i < userData.password.length; i++) {
      const specialChars = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '_',
        '-',
        '+',
        '=',
        '[',
        '{',
        ']',
        '}',
        ':',
        ';',
        '<',
        '>',
      ]

      if (specialChars.includes(userData.password[i])) {
        countSpecialCharacters++
      } else if (!isNaN(userData.password[i] * 1)) {
        countDigit++
      } else {
        if (userData.password[i] == userData.password[i].toUpperCase()) {
          countUpperCase++
        }
        if (userData.password[i] == userData.password[i].toLowerCase()) {
          countLowerCase++
        }
      }
    }

    if (userData.password.length < 8 || userData.password.length > 16 || countLowerCase == 0 || countUpperCase == 0 || countDigit == 0 || countSpecialCharacters == 0) {
      setMessage('your password must be 8-16 characters, and include at least one lowercase letter, one uppercase letter, special character, and a number');
      SetFeedback(true);
      return
    }

    if (!(userData.password == userData.repeatPassword)) {
      setMessage(`passwords don't match`);
      SetFeedback(true);
      return
    }
    if (userData.phone.length == 0) {
      setMessage('Phone number can not be empty');
      SetFeedback(true);
      return
    }
    //alert('Form is valid')
    handleSubmit();
  }
  const handleResponse =(response) => {
    const formattedMessage = response.message.replace(/\./g, ' ');
    if(response.status=='failure'){
      setMessage(formattedMessage);
      SetFeedback(true);
      console.log(response.status ,' : ',formattedMessage);
    }else if(response.status=='success'){
      setMessage(formattedMessage);
      setSuccess(true);
      toast.success("Registration Success");
      console.log(response.status ,' : ',formattedMessage);
    }    
  }

  const handleSubmit = async (e) => {
    setMessage('');
    SetFeedback(false);
        const response = await loginApiCall({
          firstName: userData.firstName,
          secondName: userData.secondName,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
          role: userData.role
        }).unwrap();
        handleResponse(response);
    
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <h1>Register</h1>
                <p className="text-body-secondary">Create your account</p>
                {success ? (
                <>
                <p className="alert alert-success p-2">{message}</p>
                <div className="d-grid">
                  <CButton color="primary" onClick={navigateLogin}>Go to Login</CButton>
                </div>
              </>  
            ) :  ( 
              <CForm>
              {feedback && <p className={"alert alert-danger p-2"}>{message}</p>}
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="First Name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Last Name"
                  name="secondName"
                  value={userData.secondName}
                  onChange={handleInputChange}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Repeat Password"
                  name="repeatPassword"
                  value={userData.repeatPassword}
                  onChange={handleInputChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
              <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              </CInputGroup>

              <div className="d-grid">
                <CButton color="success mb-3" onClick={validateForm}>Create Account</CButton>
              </div> 

              <div className="d-grid">
                  <CButton color="primary" onClick={navigateLogin}>Go to Login</CButton>
                </div>
            </CForm>
            )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
