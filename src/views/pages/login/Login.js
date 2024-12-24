import React, { useState, useEffect } from 'react'
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
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from 'src/slices/authSlice'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'src/firebase'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState(false)
  const [message, setMessage] = useState('')
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  //const [loginApiCall, { isLoading, error }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [userInfo, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission
    setMessage('')
    setFeedback(false)
    if (userData.email.length === 0) {
      setMessage(`User name can't be empty`)
      setFeedback(true)
      return
    } else if (userData.password.length === 0) {
      setMessage(`Password can't be empty`)
      setFeedback(true)
      return
    } else {
      signInWithEmailAndPassword(auth, userData.email,userData.password)
        .then((userCredential) => {
          const user = userCredential.user
          const serializedUser = {
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            emailVerified: user.emailVerified || false,
            isAnonymous: user.isAnonymous || false,
            providerId: user.providerData?.[0]?.providerId || "",
            refreshToken: user.stsTokenManager?.refreshToken || "",
            accessToken: user.stsTokenManager?.accessToken || "",
            expirationTime: user.stsTokenManager?.expirationTime || 0,
            createdAt: user.metadata?.createdAt || "",
            lastLoginAt: user.metadata?.lastLoginAt || "",
          };
          dispatch(setCredentials(serializedUser))
          navigate('/dashboard')
          toast.success("You're  logged in")})
        .catch((error) => {
          console.error(error);
          let errMsg;
          switch (error.code) {
            case "auth/invalid-email":
              errMsg = "Invalid email address. Please enter a valid email.";
              break;
            case "auth/invalid-credential":
              errMsg = "Incorrect credential. Please try again.";
              break;
            default:
              errMsg = "Login failed. Please check your credentials and try again.";
              break;
          }

          setMessage(errMsg); // Update the message state to show feedback
          setFeedback(true);  // Trigger feedback UI
          toast.error(errMsg); // Display an error toast for user feedback
        })
    }
  }

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
                    {feedback && <p className={'alert alert-danger p-2'}>{message}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        name="email"
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
                      Sign up to access your dashboard, manage tasks, track progress, and unlock all
                      features for a seamless experience!
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
