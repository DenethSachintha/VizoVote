import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
} from "@coreui/react";

import Galle from "./Galle";
import Hambanthota from "./Hambanthota";
import Monaragala from "./Monaragala";
import "src/scss/_custom.scss";

const District = ({ districtId, pollingCenters }) => {
  const [activeTab, setActiveTab] = useState("");
  const [districtPollingCenters, setDistrictPollingCenters] = useState([]);
  const [parties, setParties] = useState([])
  const [loading, setLoading] = useState(true) // Loading state to manage data readiness
  const [updatedPollingCenters, setUpdatedPollingCenters] = useState([])
  useEffect(() => {
    setActiveTab(districtId);
  }, [districtId]);

  useEffect(() => {
    const filteredCenters = pollingCenters.filter(
      (center) => center.district === activeTab // Match `center.district` with `activeTab`
    );
    setDistrictPollingCenters(filteredCenters); // Update state
    // Use a separate log to inspect the filtered results immediately
    console.log("Filtered Centers:", filteredCenters);
  }, [activeTab, pollingCenters]);

  const aggregatePollingCenterVotes = () => {
    const partyColors = {
      'party A': '#5856d6',
      'party B': '#F7A072',
      'party C': '#1b9e3e',
      'party D': '#DD1B16',
      'party E': '#f9b115',
      'party F': '#cc00cc',
    }

    // Map through districtPollingCenters to calculate and set the required values
    const updatedPollingCenters = districtPollingCenters.map((center) => {
      const votes = {
        'party A': center.partyA || 0,
        'party B': center.partyB || 0,
        'party C': center.partyC || 0,
        'party D': center.partyD || 0,
        'party E': center.partyE || 0,
        'party F': center.partyF || 0,
      }

      // Find the party with the maximum votes
      const maxParty = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b))

      return {
        ...center,
        party: maxParty, // Set the party name (with spaces)
        votes: votes[maxParty], // Set the votes of the winning party
        color: partyColors[maxParty], // Set the color of the winning party
      }
    })

    setUpdatedPollingCenters(updatedPollingCenters)
  }

  const calculatePartyVotes = () => {
    const totalVotes = [
      { party: 'Party A', color: '#5856d6', votes: 0 },
      { party: 'Party B', color: '#F7A072', votes: 0 },
      { party: 'Party C', color: '#1b9e3e', votes: 0 },
      { party: 'Party D', color: '#DD1B16', votes: 0 },
      { party: 'Party E', color: '#f9b115', votes: 0 },
      { party: 'Party F', color: '#cc00cc', votes: 0 },
    ]

    districtPollingCenters.forEach((center) => {
      totalVotes[0].votes += Number(center.partyA) || 0
      totalVotes[1].votes += Number(center.partyB) || 0
      totalVotes[2].votes += Number(center.partyC) || 0
      totalVotes[3].votes += Number(center.partyD) || 0
      totalVotes[4].votes += Number(center.partyE) || 0
      totalVotes[5].votes += Number(center.partyF) || 0
    })

    setParties(totalVotes)
    console.log('Calculated Total Votes:', totalVotes)
  }
  useEffect(() => {
    if (districtPollingCenters.length > 0) {
      calculatePartyVotes()
      aggregatePollingCenterVotes()
      console.log('Updated Polling Centers with Max Party Details:', updatedPollingCenters)
      setLoading(false)
    } else {
      console.log('No polling centers available.')
    }
  }, [activeTab,pollingCenters,districtPollingCenters])
  const renderContent = () => {
    if (districtPollingCenters.length === 0) {
      return (
        <div>
          <p>No polling centers available in this district.</p>
        </div>
      );
    }
    switch (activeTab) {
      case "LK-31":
        return <Galle updatedPollingCenters={updatedPollingCenters} parties={parties} />;
      case "LK-33":
        return <Hambanthota updatedPollingCenters={updatedPollingCenters} parties={parties} />;
      case "LK-82":
        return <Monaragala updatedPollingCenters={updatedPollingCenters} parties={parties} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (<>
    <CCol className='mb-2'>
      <CCard>
        <CCardHeader>
          {districtId && (
            <CNav variant="pills">
              <CNavItem>
                <CNavLink
                  active={activeTab === "LK-31"}
                  onClick={() => setActiveTab("LK-31")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Galle</strong>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeTab === "LK-33"}
                  onClick={() => setActiveTab("LK-33")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Hambanthota</strong>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeTab === "LK-82"}
                  onClick={() => setActiveTab("LK-82")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Monaragala</strong>
                </CNavLink>
              </CNavItem>
            </CNav>
          )}
        </CCardHeader>

      </CCard>

    </CCol>
      <CCol>
        <CCardBody className='m-0'>{renderContent()}</CCardBody>

      </CCol>

    </>
  );
};

export default District;
