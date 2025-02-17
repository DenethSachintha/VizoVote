import React, { useEffect, useState } from 'react'
import { logo } from 'src/assets/brand/logo'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCol,
  CPopover,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import 'src/scss/_custom.scss'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import PollingCenters from '../widgets/PollingCenters'
import CountrySvg from './CountrySvg'
import District from '../widgets/District'
import { db, auth, storage } from 'src/firebase'
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { CChartDoughnut } from '@coreui/react-chartjs'



const Dashboard = () => {
  const [loading, setLoading] = useState(true) // Loading state to manage data readiness
  const [pollingCenters, setPollingCenters] = useState([])
  const [parties, setParties] = useState([])
  const pollingCentersCollectionRef = collection(db, 'pollingCenters')
  const [district, setDistrict] = useState([])
  const [showDistrict, setShowDistrict] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0)

  const handleDistrict = (districtId) => {
    setShowDistrict(true)
    setDistrict(districtId)
  }
  const [districts, setDistricts] = useState([
    { id: 'LK-11', name: 'Colombo' },
    { id: 'LK-12', name: 'Gampaha' },
    { id: 'LK-13', name: 'Kalutara' },
    { id: 'LK-21', name: 'Mahanuvara' },
    { id: 'LK-22', name: 'Matale' },
    { id: 'LK-23', name: 'Nuwara Eliya' },
    { id: 'LK-31', name: 'Galle' },
    { id: 'LK-32', name: 'Matara' },
    { id: 'LK-33', name: 'Hambantota' },
    { id: 'LK-41', name: 'Jaffna' },
    { id: 'LK-44', name: 'Vavuniya' },
    { id: 'LK-51', name: 'Batticalo' },
    { id: 'LK-52', name: 'Digamadulla' },
    { id: 'LK-53', name: 'Trincomale' },
    { id: 'LK-61', name: 'Kurunegala' },
    { id: 'LK-62', name: 'Puttalam' },
    { id: 'LK-71', name: 'Anuradhapura' },
    { id: 'LK-72', name: 'Polonnaruwa' },
    { id: 'LK-81', name: 'Badulla' },
    { id: 'LK-82', name: 'Moneragala' },
    { id: 'LK-91', name: 'Ratnapura' },
    { id: 'LK-92', name: 'Kegalle' },
  ])

  // Fetch polling center data
  const getPollingCenters = async () => {
    try {
      const data = await getDocs(pollingCentersCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log('Fetched Polling Centers:', filteredData)
      setPollingCenters(filteredData)
    } catch (err) {
      console.error('Error fetching polling centers:', err)
    }
  }

  // Calculate total votes per party
  const calculatePartyVotes = () => {
    const Votes = [
      { party: 'Party A', color: '#5856d6', votes: 0 },
      { party: 'Party B', color: '#F7A072', votes: 0 },
      { party: 'Party C', color: '#1b9e3e', votes: 0 },
      { party: 'Party D', color: '#DD1B16', votes: 0 },
      { party: 'Party E', color: '#f9b115', votes: 0 },
      { party: 'Party F', color: '#cc00cc', votes: 0 },
    ]

    pollingCenters.forEach((center) => {
      Votes[0].votes += Number(center.partyA) || 0
      Votes[1].votes += Number(center.partyB) || 0
      Votes[2].votes += Number(center.partyC) || 0
      Votes[3].votes += Number(center.partyD) || 0
      Votes[4].votes += Number(center.partyE) || 0
      Votes[5].votes += Number(center.partyF) || 0
    })

    setParties(Votes)
    console.log('Calculated Total Votes:', Votes)
  }

  const aggregateDistrictVotes = () => {
    const partyColors = {
      'party A': '#5856d6',
      'party B': '#F7A072',
      'party C': '#1b9e3e',
      'party D': '#DD1B16',
      'party E': '#f9b115',
      'party F': '#cc00cc',
    }

    const updatedDistrictVotes = districts.map((district) => ({
      ...district,
      partyA: 0,
      partyB: 0,
      partyC: 0,
      partyD: 0,
      partyE: 0,
      partyF: 0,
      party: '',
      votes: 0,
      color: '#ccc',
    }))

    pollingCenters.forEach((center) => {
      const district = updatedDistrictVotes.find((d) => d.id === center.district)
      if (district) {
        district.partyA += Number(center.partyA || 0)
        district.partyB += Number(center.partyB || 0)
        district.partyC += Number(center.partyC || 0)
        district.partyD += Number(center.partyD || 0)
        district.partyE += Number(center.partyE || 0)
        district.partyF += Number(center.partyF || 0)

        const votes = {
          'party A': district.partyA,
          'party B': district.partyB,
          'party C': district.partyC,
          'party D': district.partyD,
          'party E': district.partyE,
          'party F': district.partyF,
        }

        const maxParty = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b))

        district.party = maxParty // Set the party name (with spaces)
        district.votes = votes[maxParty] // Set the votes of the winning party
        district.color = partyColors[maxParty] // Set the color of the winning party
      }
    })

    setDistricts(updatedDistrictVotes)
  }

  useEffect(() => {
    getPollingCenters()
  }, [])

  useEffect(() => {
    if (pollingCenters.length > 0) {
      calculatePartyVotes()
      aggregateDistrictVotes()
      setLoading(false) // Set loading to false after calculations are complete
    } else {
      console.log('No polling centers available.')
    }
  }, [pollingCenters])

  const chartData = {
    labels: parties.map((party) => party.party), // Extract party names for labels
    datasets: [
      {
        backgroundColor: parties.map((party) => party.color), // Extract colors for backgroundColor
        data: parties.map((party) => party.votes), // Extract votes for data
        borderWidth: 0,
      },
    ],
  }
  useEffect(() => {
    const calculateTotalVotes = parties.reduce((total, party) => total + party.votes, 0)
    setTotalVotes(calculateTotalVotes)
  }, [parties])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {showDistrict ? (
        <District districtId={district} pollingCenters={pollingCenters} />
      ) : (
        <>
          <CCard className="mb-2 " style={{ width: '100%' }}>
            <CCardHeader>
              <strong>All Island Results</strong>
            </CCardHeader>
          </CCard>
          <CRow>
            <CCol md={12}>
              <PollingCenters pollingCenters={pollingCenters} />
            </CCol>
            <CCol md={6} xs={12} className="m-md-0">
              <CCard className="mb-2 m-md-0">
                <CCardBody>
                  <div className="back-country">
                    <div className="map-container-country">
                      <svg viewBox="0 0 349.68774 675.54926" xmlns="http://www.w3.org/2000/svg">
                        {districts.map((district) => {
                          const matchedPath = CountrySvg.find(
                            (item) => item.districtId === district.id,
                          )

                          if (!matchedPath) return null // Return nothing if no matching path is found\

                          if (district.party) {
                            return (
                              <CPopover
                                trigger={['hover', 'focus']}
                                title={district.name}
                                content={district.party + ' got total votes ' + district.votes}
                                placement="right"
                              >
                                <path
                                  key={district.id}
                                  d={matchedPath.path}
                                  id={district.id}
                                  title={district.name}
                                  fill={district.color}
                                  className="district-path"
                                  onClick={() => {
                                    handleDistrict(districts[19].id)
                                  }}
                                />
                              </CPopover>
                            )
                          }

                          return (
                            <path
                              key={district.id}
                              d={matchedPath.path}
                              id={district.id}
                              title={district.name}
                              fill={district.color}
                              className="district-path"
                            />
                          )
                        })}
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
                        style={{ height: 'auto', width: '100%', maxWidth: '600px' }}
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
      )}
    </>
  )
}

export default Dashboard
