import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://kdu.ac.lk/" target="_blank" rel="noopener noreferrer">
          KDU
        </a>
        <span className="ms-1">&copy; 2025 | All Rights Reserved.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Created by Intake 39 Students</span>

      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
