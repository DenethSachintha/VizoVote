
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCol, CPopover, CProgress, CRow } from "@coreui/react";
import { CChartDoughnut } from '@coreui/react-chartjs'
import 'src/scss/_custom.scss'
import PollingCenters from "src/views/widgets/PollingCenters";

const  Galle = ({ parties, updatedPollingCenters }) => {
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
        <CCardHeader><strong>Galle District Results</strong></CCardHeader>
      </CCard>
      <CRow>
        <CCol md={12}>
          <PollingCenters pollingCenters={updatedPollingCenters}/>
        </CCol>
        <CCol md={6} xs={12} className="m-md-0">
          <CCard className="mb-2 m-md-0">
            <CCardBody>
              <div className="back">
                <div className="map-container">
                    <svg
                      height="430.65600000000006"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      style={{ overflow: 'hidden',maxWidth:"100%" ,position:"relative" , left: '-0.5px', top: '-0.078125px' }}
                      viewBox="0 0 600 600"
                      preserveAspectRatio="xMinYMin"
                    >

                      <path
                        fill={updatedPollingCenters[2].color}
                        onClick={() => {
                          console.log(updatedPollingCenters[2].name)
                        }}
                        stroke="#ffffff"
                        d="M575.6,199.75S457,140.45,466.34,168.55S519.4499999999999,237.25,525.67,246.62S525.67,277.82,525.67,277.82L524.9499999999999,277.89L472.6,281S408.06,257.05,391.45000000000005,277.87S370.65000000000003,319.48,370.65000000000003,319.48L387.32000000000005,365.29L299.88000000000005,315.36S298.77000000000004,303.1,297.15000000000003,289.36C295.51000000000005,276.82,293.57000000000005,263.14,291.61,257.05C287.41,244.48000000000002,270.76,215.5,258.26,202.87S262.45,182.09,270.76,161.32C277.68,144.07999999999998,250.32999999999998,121.19999999999999,240.76,113.82L263.51,103.11999999999999L285.3,90.55L319.72,109.33L354,134.26L372.76,96.78999999999999L379,78.06L400.87,59.3L434.07,36.37L599.0699999999999,125.07L597.4699999999999,128.07L575.6199999999999,143.68C553.8199999999999,159.27,594.3999999999999,184.22,591.2399999999999,193.60000000000002S575.6,199.75,575.6,199.75Z"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        data-id="division-62"
                        data-type="area"
                        className="area"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[4]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[4].name)
                        }}
                        stroke="#ffffff"
                        d="M414.85,440.09C444,456.31,472.6,474.5,472.6,474.5V527.5L450.8,571.2L448.33,578.2C404.01,562.7900000000001,307.5,528.83,291.61,519.2A36.35,36.35,0,0,1,282.46000000000004,511.90000000000003L314.27000000000004,498.78000000000003L345.71000000000004,485.86L386.54,476.65000000000003Z"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        data-id="division-67"
                        data-type="area"
                        className="area"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[9]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[9].name)
                        }}
                        stroke="#ffffff"
                        d="M391.41,277.82C408.06,257,472.57,281,472.57,281S460.06,352.79,475.64,384S535.03,446.51,525.64,458.95C520.76,465.46999999999997,513.24,469.46999999999997,507.21999999999997,471.72999999999996A56.36,56.36,0,0,1,497.48999999999995,474.56999999999994H472.48999999999995S443.9,456.29,414.82,440C391.27,426.9,367.38,415.07,358.08,415.07C338.58,415.07,253.51999999999998,385.88,242.64999999999998,382.07C240.43,355,229,315.28,229,315.28H299.8L387.22,365.2L370.54,319.4A112.36,112.36,0,0,1,391.41,277.82Z"
                        data-id="division-63"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[7]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[7].name)
                        }}
                        stroke="#ffffff"
                        d="M108.43,128S154.16,132.12,162.54000000000002,157.15S195.77,240.39,212.46000000000004,252.88C227.14000000000004,263.88,283.92,284.56,297.11,289.28999999999996C298.73,302.97999999999996,299.88,315.35999999999996,299.88,315.35999999999996H229.11L179.11,311.15L175,265.32L83.39,232Z"
                        data-id="division-60"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[6]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[6].name)
                        }}
                        stroke="#ffffff"
                        d="M270.73,161.22C262.42,182.09,245.73000000000002,190.37,258.23,202.87S287.38,244.48000000000002,291.57000000000005,256.96000000000004C293.51000000000005,263.06000000000006,295.51000000000005,276.69000000000005,297.07000000000005,289.27000000000004C283.9200000000001,284.54,227.07000000000005,263.84000000000003,212.42000000000004,252.86000000000004C195.73000000000005,240.37000000000003,170.77000000000004,182.12000000000006,162.50000000000006,157.13000000000005S108.39,128,108.39,128L23.25,109.36C19.25,96.92,10.07,67.78,2.1099999999999994,43.260000000000005L54.31,21.840000000000003L101.09,37.440000000000005L119.81,71.76L147.93,99.91L210.39,128L240.67999999999998,113.75C250.3,121.12,277.62,144.08,270.73,161.22Z"
                        data-id="division-61"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[0]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[0].name)
                        }}
                        stroke="#ffffff"
                        d="M195.77,440L204.15,406.84000000000003L206.92000000000002,400.38000000000005A89.11,89.11,0,0,0,225.58,406.70000000000005L224.92000000000002,415.13000000000005S283.22,448.46000000000004,295.69,452.64000000000004S312.34,494.18000000000006,312.34,494.18000000000006L314.27,498.7900000000001L282.43,511.9100000000001C273.74,502.2900000000001,279.03000000000003,494.18000000000006,279.03000000000003,494.18000000000006S254.03000000000003,481.68000000000006,241.65000000000003,477.5900000000001C231.44000000000003,474.1700000000001,210.07000000000005,454.06000000000006,195.84000000000003,440.0700000000001V440Z"
                        data-id="division-65"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[5]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[5].name)
                        }}
                        stroke="#ffffff"
                        d="M225.55,406.71A89.78,89.78,0,0,1,206.89000000000001,400.37A169.27,169.27,0,0,1,187.5,390.17L108.5,281.97H66.84C65.04,276.67,62.13,266.08000000000004,58.67,252.69000000000003L83.42,232L175,265.32L179.12,311.13L229.12,315.34S240.47,355.01,242.72,382.17999999999995C243.87,395.28,242.89,405.5199999999999,237.42,406.85999999999996C234,407.72,229.87,407.48,225.55,406.71Z"
                        data-id="division-59"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[3]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[3].name)
                        }}
                        stroke="#ffffff"
                        d="M414.85,440.09L386.5,476.69L345.64,485.9L314.24,498.81L312.34000000000003,494.2S308.15000000000003,456.77,295.66,452.65999999999997S224.88000000000002,415.13,224.88000000000002,415.13L225.55,406.71C229.87,407.47999999999996,234,407.71,237.39000000000001,406.85999999999996C242.86,405.52,243.83,395.33,242.72000000000003,382.17999999999995C253.55000000000004,385.9599999999999,338.62,415.17999999999995,358.14000000000004,415.17999999999995C367.42,415.13,391.35,427,414.85,440.09Z"
                        data-id="division-66"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[1]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[1].name)
                        }}
                        stroke="#ffffff"
                        d="M187.5,390.17A168.23,168.23,0,0,0,206.92000000000002,400.37L204.15,406.86L195.77,440C192.59,436.89,189.72,434.05,187.47,431.76C175,419.31,75.05,306.93,66.78,282H108.39Z"
                        data-id="division-64"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
                      />
                      <path
                        fill={updatedPollingCenters[8]?.color}
                        onClick={() => {
                          console.log(updatedPollingCenters[8].name)
                        }}
                        stroke="#ffffff"
                        d="M23.25,109.36L108.43,128L83.43,232L58.67,252.69C45.83,203.14,25.2,115.44,25.2,115.44Z"
                        data-id="division-58"
                        data-type="area"
                        className="area"
                        strokeOpacity="0.6"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                          strokeLinejoin: 'round',
                          cursor: 'pointer',
                        }}
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

export default Galle
