import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCarousel,
  CCarouselItem,
  CCardTitle,
  CCardText,
} from '@coreui/react';
import 'src/scss/_custom.scss';

const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const PollingCenters = ({ pollingCenters }) => {
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 700) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1200) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    window.addEventListener('resize', updateCardsPerView);
    updateCardsPerView(); // Set initial value

    return () => {
      window.removeEventListener('resize', updateCardsPerView);
    };
  }, []);

  // Use the chunkArray function
  const chuckedPollingCenters = chunkArray(pollingCenters, cardsPerView);

  return (
    <>
      <CCard className="mb-2">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          Polling Centers
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
              style={{ position: 'relative' }}
            >
              {chuckedPollingCenters.map((group, index) => (
                <CCarouselItem key={index}>
                  <CRow xs={{ gutter: 4 }} className="justify-content-center carousel-row">
                    {group.map((pollingCenter, idx) => (
                      <CCol key={idx} className="justify-content-center">
                        <CCard
                          textBgColor={'secondary'}
                          style={{ margin: 'auto', maxWidth: '20rem', alignSelf: 'center' }}
                          onClick={() => console.log(pollingCenter)}
                        >
                          <CCardBody>
                            <CCardTitle>{pollingCenter.name}</CCardTitle>
                            <CCardText>{pollingCenter.totalVotes}</CCardText>
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
  );
};

export default PollingCenters;
