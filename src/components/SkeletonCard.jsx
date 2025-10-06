// src/components/SkeletonCard.jsx
import React from 'react'

export default function SkeletonCard(){
  return (
    <div className="product-card" aria-hidden="true">
      <div className="skeleton skel-img" />
      <div className="skeleton skel-line" style={{width:'60%'}} />
      <div className="skeleton skel-line" style={{width:'40%'}} />
      <div style={{marginTop:'auto'}} className="skeleton skel-line" />
    </div>
  )
}
