import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CCarousel, CCarouselItem, CCardTitle, CCardText,
  CWidgetStatsA,
  CForm,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CButton,
  CInputGroupText,
  CFormFeedback
} from '@coreui/react'
import { cilHouse, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { CChartLine } from '@coreui/react-chartjs'
import  'src/scss/_custom.scss';
//import House from './House';
//import {AddDevice, DeviceList} from './Devices';
//import { DocsExample } from 'src/components'
import { db, auth, storage } from 'src/firebase';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};
const PollingCenters = () => {
  const [pollingCenters, setPollingCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDistrict, setShowDistrict] = useState(false);
  const [cardsPerView, setCardsPerView] = React.useState(3);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const districtCollectionRef = collection(db, "districts");
  const pollingCenterCollectionRef = collection(db, "pollingCenters");


  /*
  const fetchHouses = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData?.data?.token) {
        throw new Error('Bearer token not found in sessionStorage.');
      }
      const token = userData.data.token;
      console.log(token);
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/house`, {
        method: 'GET',
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        setHouses(data.data);
        console.log(data.data)
        setSelectedHouse(null);
        setShowHouse(false);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };*/
  const getDistrictList = async () => {
    try {
      const data = await getDocs(pollingCenterCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData)
      setPollingCenters(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDistrictList();
    //fetchHouses();

    const updateCardsPerView = () => {
      if (window.innerWidth < 700) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1200) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    window.addEventListener("resize", updateCardsPerView);
    updateCardsPerView(); // Set initial value

    return () => {
      window.removeEventListener("resize", updateCardsPerView);
    };
  }, []);
  const chunkedDistricts = chunkArray(pollingCenters, cardsPerView);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Polling Centers</strong>

        </CCardHeader>

        <CCardBody>
          {pollingCenters.length > 0 ? (
            <CCarousel
              activeIndex={0}
              controls
              indicators
              interval={false}
              pause="hover"
              wrap
              touch
              transition="slide"
              className="custom-carousel"
              style={{ position: "relative" }}

            >
              {chunkedDistricts.map((districtGroup, index) => (
                <CCarouselItem key={index}>
                  <CRow xs={{ gutter: 4 }} className="justify-content-center carousel-row">
                  {districtGroup.map((district, idx) => (
                      <CCol key={idx} className="justify-content-center">
                        <CCard
                          textBgColor={'primary'}
                          className=""
                          style={{ margin: 'auto', maxWidth: '20rem', alignSelf: 'center' }}
                          onClick={() => console.log(district)}
                        >
                          <CCardBody>
                            <CCardTitle>{district.name}</CCardTitle>
                            <CCardText>{district.totalVotes}</CCardText>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    ))}
                  </CRow>
                </CCarouselItem>
              ))}
            </CCarousel>
          ) : (
            <div>No Polling Centers available.</div>
          )}
        </CCardBody>
      </CCard>


    </>
  )
}

export default PollingCenters
