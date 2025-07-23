import React from 'react'
import { Link } from 'react-router-dom'
import LinkDashboard from './links/LinkDashboard'

function Dashboard() {
  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card shadow p-4 w-100' style={{ maxWidth: 900 }}>
        <div className='mb-4'>
          <h2 className='text-center'>Your Affiliate Links</h2>
        </div>
        <LinkDashboard/>
        <div className='d-flex justify-content-end mt-4'>
          <Link to='/logout' className='btn btn-outline-danger'>Logout</Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
