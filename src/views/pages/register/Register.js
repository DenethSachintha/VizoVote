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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from 'src/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Register = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // State for error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setError(''); // Clear previous errors
    const { email, password } = userData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user);

      toast.success("You're registered");
      navigate('/login')

    } catch (error) {
      setError(error.message); // Set error message
      console.error('Registration error:', error);
      toast.error('Registration error:', error);
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [userInfo, navigate])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  {/* Display error message if any */}
                  {error && <div className="alert alert-danger">{error}</div>}

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

                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
