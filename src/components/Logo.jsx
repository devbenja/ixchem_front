import React from 'react';

export const Logo = () => {
  return (
    <div className='logo' style={{ paddingTop: '30px' }}> {/* Ajusta el padding o usa margin */}
      <div className='logo-icon'>
        <img src="/Final.png" alt="Logo Icon" style={{ width: '80px', height: '80px', marginTop: '-10px' }} />
      </div>
    </div>
  )
}
