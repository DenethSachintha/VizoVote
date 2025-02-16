
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCol, CPopover, CProgress, CRow } from "@coreui/react";
import { CChartDoughnut } from '@coreui/react-chartjs'
import 'src/scss/_custom.scss'
import PollingCenters from "src/views/widgets/PollingCenters";

const Monaragala = ({ parties, updatedPollingCenters }) => {
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
        <CCardHeader><strong>Monaragala District Results</strong></CCardHeader>
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
                    width="430.656"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ overflow: "hidden", position: "relative",maxWidth:"100%" , left: "-0.5px", top: "-0.0625px" }}
                    viewBox="0 0 600 600"
                    preserveAspectRatio="xMinYMin"
                  >
                    <path
                      fill={updatedPollingCenters[0]?.color}
                      onClick={() => {
                        console.log(updatedPollingCenters[0].name)
                      }}
                      stroke="#ffffff"
                      d="M320.5,88.24S333.59,101.35,341.08,101.35S356.08,95.69999999999999,356.08,95.69999999999999L354.19,69.50999999999999S365.42,54.50999999999999,374.8,47.019999999999996S386,28.29,386,28.29S438.46,-7.27,440.33,2.06S440.33,48.900000000000006,442.19,56.38S470.31,135,470.31,135S446.56,149,443.66,161.22C441.18,161.28,428.34000000000003,161.60999999999999,421.58000000000004,165.01C414.12000000000006,168.73,423.49000000000007,193.07999999999998,425.37000000000006,198.68S410.37000000000006,219.29000000000002,410.37000000000006,219.29000000000002S436.62000000000006,241.76000000000002,447.82000000000005,251.14000000000001S449.72,269.86,445.9800000000001,277.35S385.9800000000001,286.73,374.7900000000001,284.87S350.44000000000005,264.21,350.44000000000005,264.21L333.57000000000005,271.75L305.48,253S322.31,204.28,301.76,198.69A158.27,158.27,0,0,0,264.28999999999996,193.07L263.28999999999996,188.70999999999998L258.71,168.70999999999998L241.82,153.70999999999998L253,140.67L269.89,142.55999999999997Z"
                      strokeOpacity="0.6"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      data-id="division-141"
                      data-type="area"
                      className="area"
                      style={{ strokeLinejoin: "round", cursor: "pointer" }}
                    />
                    <path
                      fill={updatedPollingCenters[1]?.color}
                      onClick={() => {
                        console.log(updatedPollingCenters[1].name)
                      }}
                      stroke="#ffffff"
                      d="M249.34,286.78S262.46,298,270,290.52S281.23,268.04999999999995,286.85,264.28999999999996S305.58000000000004,253.05999999999997,305.58000000000004,253.05999999999997L333.66,271.82L350.52000000000004,264.29S363.62000000000006,283.06,374.87000000000006,284.95000000000005S442.2800000000001,284.95000000000005,446.0400000000001,277.44000000000005S459.1400000000001,260.57000000000005,447.9000000000001,251.22000000000006S410.4500000000001,219.38000000000005,410.4500000000001,219.38000000000005S427.3200000000001,204.38000000000005,425.4500000000001,198.75000000000006S414.2100000000001,168.81000000000006,421.67000000000013,165.07000000000005C428.4300000000001,161.68000000000006,441.2600000000001,161.33000000000004,443.7400000000001,161.31000000000006A9,9,0,0,0,444.1800000000001,166.93000000000006C449.78000000000014,180.02000000000007,455.41000000000014,196.93000000000006,455.41000000000014,196.93000000000006L502.23000000000013,211.93000000000006S498.46000000000015,402.9800000000001,498.46000000000015,414.21000000000004C498.46000000000015,419.74,497.57000000000016,436.12000000000006,496.67000000000013,451.36C487.84000000000015,449.98,448.90000000000015,443.92,442.2600000000001,442.27000000000004C434.8000000000001,440.41,402.9700000000001,419.80000000000007,397.3600000000001,417.93000000000006S389.8600000000001,395.46000000000004,382.3600000000001,384.2300000000001S363.6400000000001,372.9700000000001,363.6400000000001,372.9700000000001L326.2000000000001,352.4000000000001S290.6000000000001,354.24000000000007,273.7500000000001,346.7500000000001C259.47000000000014,340.3900000000001,245.1000000000001,325.92000000000013,241.11000000000013,321.7000000000001Z"
                      strokeOpacity="0.6"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      data-id="division-142"
                      data-type="area"
                      className="area"
                      style={{ strokeLinejoin: "round", cursor: "pointer" }}
                    />
                    <path
                      fill={updatedPollingCenters[2]?.color}
                      onClick={() => {
                        console.log(updatedPollingCenters[2].name)
                      }}                      stroke="#ffffff"
                      d="M99.78,510.14C98.1,501.33,97,493.48,97.64,489C97.89,487.38,98.44,484.95,99.23,482C104.65,461.47,121.23,414.33,121.96000000000001,412.31A0.06,0.06,0,0,0,121.96000000000001,412.26S146.29000000000002,391.65,155.67000000000002,397.26S189.36,427.26,187.51000000000002,438.45S180.00000000000003,464.68,189.35000000000002,470.28S202.46000000000004,459.05999999999995,202.46000000000004,459.05999999999995L211.85000000000002,444.05999999999995L223.07000000000002,440.30999999999995S213.72000000000003,414.0899999999999,213.72000000000003,408.47999999999996S219.34000000000003,382.26,219.34000000000003,382.26L208.11000000000004,371.03L211.87,343L240,326.11L241.08,321.66C245.08,325.86,259.39,340.33000000000004,273.72,346.66C290.56,354.19,326.15000000000003,352.31,326.15000000000003,352.31L363.59000000000003,372.89S374.82000000000005,372.89,382.33000000000004,384.14S391.69000000000005,415.97999999999996,397.33000000000004,417.84999999999997S434.78000000000003,440.31999999999994,442.26000000000005,442.17999999999995C448.90000000000003,443.84,487.81000000000006,449.90999999999997,496.6700000000001,451.2699999999999C495.6700000000001,467.00999999999993,494.7200000000001,481.50999999999993,494.7200000000001,481.50999999999993S481.62000000000006,490.88999999999993,470.3800000000001,496.4599999999999S444.1300000000001,507.7199999999999,440.3800000000001,515.1899999999999S425.3800000000001,541.4499999999999,410.3800000000001,548.9S326.1400000000001,578.9,326.1400000000001,578.9S305.5300000000001,588.27,298.0300000000001,584.53S275.56,549,262.46,547.07S200.67,548.9300000000001,196.89999999999998,556.4200000000001S193.14999999999998,577.0400000000001,187.51999999999998,578.94S146.3,599.5,146.3,599.5S108.85,564,108.85,554.59C108.87,548.39,103.13,527.39,99.78,510.14Z"
                      strokeOpacity="0.6"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      data-id="division-143"
                      data-type="area"
                      className="area"
                      style={{ strokeLinejoin: "round", cursor: "pointer" }}
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

export default Monaragala
