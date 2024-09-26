import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from "src/slices/usersApiSlice";
import {setCredentials} from "src/slices/authSlice"
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify'; 

const Login = () => {
  const navigate = useNavigate(); 
  //const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch() 
  const [feedback, SetFeedback] = useState(false);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firebase_token: 'yyyy'  // Update token
  });
  const [loginApiCall , {isLoading, error}] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value, 
    });
  };

  useEffect(()=>{
    if(userInfo){
      navigate('/dashboard')
    }
  },[userInfo,navigate])

  const handleResponse =(response) => {
    console.log(response); 
    const formattedMessage = response.message.replace(/\./g, ' ');
    if(response.status=='failure'){
      setMessage(formattedMessage);
      SetFeedback(true);
      console.log(response.status ,' : ',formattedMessage);
    }else if(response.status=='success'){
      // store user here using redux
      dispatch(setCredentials(response))
      navigate('/dashboard');
      toast.success('You\'re  logged in')
      console.log(response.status ,' : ',formattedMessage);
    }    
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    setMessage('');
    SetFeedback(false);
  
    // Validate email and password fields
    if (userData.email.length === 0) {
      setMessage(`User name can't be empty`);
      SetFeedback(true);
      return;
    } else if (userData.password.length === 0) {
      setMessage(`Password can't be empty`);
      SetFeedback(true);
      return;
    } else {
        // Correct object structure for loginApiCall
        const response = await loginApiCall({
          email: userData.email,
          password: userData.password,
          firebase_token: userData.firebase_token
        }).unwrap();
        handleResponse(response);
    }
  };
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    {feedback && <p className={"alert alert-danger p-2"}>{message}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      placeholder="Username"  
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                    Sign up to access your dashboard, manage tasks, 
                    track progress, and unlock all features for a seamless experience!
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
