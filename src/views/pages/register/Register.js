import React, { useState } from 'react';
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
import api from 'src/api/api';

const Register = () => {
  
  const [userData, setUserData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    phone: '',
    role: 'admin'  // Assuming role is constant here
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value, 
    });
  };

  const handleSubmit = () => {
    api.post('/user/signup', userData)
      .then(response => {
        console.log('User created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error in request:', error.response ? error.response.data : error.message);
      });
  };

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
                    <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
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
