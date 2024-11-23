import React from "react"

export default function Item() {
    return (
     <div className="w-full bg-slate-100 p-5 rounded-md border-slate-300 border flex items-center justify-between">
        <h1>Done</h1>

        <button className="bg-blue-500 rounded-md text-white font-semibold px-3 py-2">
            Complete
        </button>
     </div>   
    )
}