import React from 'react'
import { MoonLoader } from 'react-spinners'

function Spinner() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
            <MoonLoader color="#39ff88" size={50} />
            <p className="animate-pulse text-xs tracking-widest text-[#54a879]">
                SENSORS SCANNING // RETRIEVING DATA_
            </p>
        </div>
    )
}

export default Spinner
