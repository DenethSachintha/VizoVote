import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCol, CPopover, CProgress, CRow } from "@coreui/react";
import { CChartDoughnut } from '@coreui/react-chartjs'
import 'src/scss/_custom.scss'

const Hambanthota = ({ parties, updatedPollingCenters }) => {
  const [totalVotes, setTotalVotes] = useState(0)

  const chartData = {
    labels: parties.map((party) => party.party), // Extract party names for labels
    datasets: [
      {
        backgroundColor: parties.map((party) => party.color), // Extract colors for backgroundColor
        data: parties.map((party) => party.votes), // Extract votes for data
      },
    ],
  }
  useEffect(() => {
    const calculateTotalVotes = parties.reduce((total, party) => total + party.votes, 0)
    setTotalVotes(calculateTotalVotes)
  }, [parties])

  return (
    <>



      <CCard className="mb-2 " style={{ width: '100%' }}>
        <CCardHeader><strong>Hambanthota District Results</strong></CCardHeader>
      </CCard>
      <CRow>
        <CCol md={6} xs={12} className="m-md-0">
          <CCard className="mb-2 m-md-0">
            <CCardBody>
              <div className="back">
                <div className="map-container">
                  <svg
                    height="430.65600000000006"
                    version="1.1"
                    width="430.656"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{
                      overflow: 'hidden',
                      position: 'relative',
                      left: '-0.5px',
                      top: '0.921875px',
                    }}
                    viewBox="0 0 600 600"
                    preserveAspectRatio="xMinYMin"
                  >
                    <desc>
                      Created with Raphaël 2.3.0 and Mapael undefined
                      (https://www.vincentbroute.fr/mapael/)
                    </desc>
                    <defs></defs>
                    <path
                      fill={updatedPollingCenters[2].color}
                      onClick={() => {
                        console.log(updatedPollingCenters[2].name)
                      }}
                      stroke="#ffffff"
                      d="M234.4,228.8C238.31,221.01000000000002,288.93,217.12,302.59000000000003,219.08S331.8,254.08,339.59000000000003,258.03000000000003S368.83000000000004,252.15000000000003,368.83000000000004,252.15000000000003S440.90000000000003,228.75000000000003,456.45000000000005,220.97000000000003S483.74000000000007,193.67000000000002,487.63000000000005,185.92000000000002S507.14000000000004,172.3,518.8100000000001,166.48000000000002S544.1400000000001,150.87,544.1400000000001,150.87L596.7600000000001,172.31L597.5000000000001,172.91C593.1400000000001,178.19,589.1200000000001,183.22,587.0100000000001,185.96C581.2200000000001,193.75,548.0800000000002,222.96,526.6500000000001,238.57S497.4100000000001,254.13,481.8500000000001,267.78999999999996S446.7800000000001,295.05999999999995,427.31000000000006,302.84999999999997S394.19000000000005,330.14,394.19000000000005,330.14L384.43000000000006,332.05C374.71000000000004,334.05,308.43000000000006,349.62,302.6500000000001,353.51S267.56000000000006,374.93,267.56000000000006,374.93S240.28000000000006,376.93,224.74000000000007,374.93L189.91,314L187.72,312.55L181.87,273.55S218.87,254.09,224.75,252.18S230.51,236.59,234.4,228.8Z"
                      strokeOpacity="0.6"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      data-id="division-78"
                      data-type="area"
                      className="area"
                      style={{ strokeLinejoin: 'round', cursor: 'pointer' }}
                    />

                    <path
                      fill={updatedPollingCenters[0].color}
                      onClick={() => {
                        console.log(updatedPollingCenters[0].name)
                      }}
                      stroke="#ffffff"
                      d="M88.3,427.51C84.3,431.51,81.17999999999999,430.03999999999996,79.64999999999999,428.68L119.47999999999999,376.87L101.41999999999999,367.15L94.15999999999998,363.22999999999996L92.15999999999998,349.59999999999997S111.63999999999999,333.99999999999994,119.44999999999999,330.10999999999996S109.69999999999999,322.30999999999995,109.69999999999999,322.30999999999995L105.82,298.91999999999996S113.61999999999999,298.91999999999996,119.44999999999999,300.86999999999995S150.63,304.79999999999995,160.39,308.68999999999994S187.61999999999998,312.55999999999995,187.61999999999998,312.55999999999995L189.79999999999998,314.00999999999993L224.64,374.91999999999996C209.05999999999997,372.91999999999996,179.81,382.72999999999996,179.81,382.72999999999996L175.91,376.87999999999994C172.04,371.04999999999995,164.24,396.35999999999996,164.24,396.35999999999996S138.89000000000001,406.09999999999997,129.15,408.05999999999995S111.62,406.05999999999995,105.79,406.05999999999995S94.15,421.68,88.3,427.51Z"
                      data-id="division-77"
                      data-type="area"
                      className="area"
                      strokeOpacity="0.6"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      style={{ strokeLinejoin: 'round', cursor: 'pointer' }}
                    />
                    <path
                      fill={updatedPollingCenters[1].color}
                      onClick={() => {
                        console.log(updatedPollingCenters[1].name)
                      }}
                      stroke="#ffffff"
                      d="M33.75,341.79C39.59,341.79,64.92,357.36,64.92,357.36H72.71000000000001L76.60000000000001,369.08000000000004L101.41000000000001,367.15000000000003L119.41000000000001,376.87000000000006L79.65,428.68A4.77,4.77,0,0,1,78.56,427.49S70.75,441.13,63,445C60.08,446.44,54,447.88,47.44,449.12L47.44,448.9L45.44,437.21999999999997L29.83,429.40999999999997L18.15,419.65999999999997S19.029999999999998,419.03999999999996,20.419999999999998,418.03C24.63,414.92999999999995,33.75,407.95,39.59,402.14C47.400000000000006,394.34999999999997,37.59,384.59,37.59,384.59L45.39,378.73999999999995L31.8,367.07L24,355.39S27.9,341.79,33.75,341.79Z"
                      data-id="division-76"
                      data-type="area"
                      className="area"
                      strokeOpacity="0.6"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      style={{ strokeLinejoin: 'round', cursor: 'pointer' }}
                    />
                    <path
                      fill={updatedPollingCenters[3].color}
                      onClick={() => {
                        console.log(updatedPollingCenters[3].name)
                      }}
                      stroke="#ffffff"
                      d="M24,355.43S4.51,341.81,2.58,332C0.9000000000000001,323.64,26.72,286.3,37.66,274.9V274.9C39.38999999999999,273.02,40.75,271.9,41.55,271.64C47.379999999999995,269.64,105.83,298.88,105.83,298.88L109.7,322.31S127.24000000000001,326.23,119.46000000000001,330.1S92.17000000000002,349.59000000000003,92.17000000000002,349.59000000000003L94.17000000000002,363.21000000000004L101.45000000000002,367.21000000000004L76.62000000000002,369.14000000000004L72.73000000000002,357.42H64.9S39.57000000000001,341.87,33.730000000000004,341.87S24,355.43,24,355.43Z"
                      data-id="division-75"
                      data-type="area"
                      className="area"
                      strokeOpacity="0.6"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      style={{ strokeLinejoin: 'round', cursor: 'pointer' }}
                    />
                  </svg>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6} xs={12} className="m-md-0">
          <CCard className="mb-2">
            <CCardBody>
              <CRow>
                <CCol
                  xs={12}
                  md={12}
                  className="mb-4"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CChartDoughnut
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                    style={{ height: 'auto', width: '100%' }}
                  />
                </CCol>

                <CCol>
                  {parties.map((party, index) => {
                    // Calculate the percentage of votes for each party
                    const percentage = totalVotes > 0 ? (party.votes / totalVotes) * 100 : 0

                    return (
                      <div key={index}>
                        <CCardText className="m-0">
                          {party.party} : {party.votes}
                        </CCardText>
                        <CProgress
                          className="mb-3"
                          color="light" // Use the library's `color` prop for the progress bar
                          variant="striped"
                          animated
                          value={percentage} // Correct percentage calculation
                        >
                              <span style={{ marginLeft: '8px', color: '#000' }}>
                                {`${Math.round(percentage)}%`} {/* Display rounded percentage */}
                              </span>
                        </CProgress>
                      </div>
                    )
                  })}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Hambanthota
