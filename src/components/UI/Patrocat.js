import React from 'react'

export default function Patrocat ({ width = 300, height = 300, isSad }) {
  return (
    <>
      {isSad
        ? <img src='../../public/patronage-cat-error.svg' alt='Patrocat error' width={width} height={height} />
        : <img src='../../public/patronage-cat.svg' alt='Patrocat' width={width} height={height} />}
    </>
  )
};
