import React from 'react'

export default function GridLoading() {
    return (
        <>
            {[1, 2, 3, 4].map((data) => (
                <div key={data} className='p-6 py-10 bg-gray-800 border rounded-lg border-red-300/20 animate-pulse'></div>
            ))}
        </>
    )
}
