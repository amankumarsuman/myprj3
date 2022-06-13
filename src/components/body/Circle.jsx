import React from 'react'
import "./circle.css"
function Circle({number,playerName}) {
  return (
      <>
      
    <div className="circle">
  <p className="text">{number}</p>
</div>
<p>{playerName}</p>
      </>
  )
}

export  {Circle}