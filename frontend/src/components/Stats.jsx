import React from 'react'
import JobLocationsPieChart from './JobLocationsPieChart'
import JobStatsChart from './JobStatsChart'

const Stats = () => {
  return (
    <>
    <JobStatsChart/>
    <div style={{marginTop: '5rem'}}>
    <JobLocationsPieChart/></div>
    </>
  )
}

export default Stats