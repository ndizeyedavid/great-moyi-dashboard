import React from 'react'

export default function SingleMessage({ id, status, from, time, subject, setMessageId }) {

    function readMessage() {
        setMessageId(id)
    }

    return (
        <button
            type='button'
            onClick={readMessage}
            className={`p-3 rounded-lg w-full text-start cursor-pointer ${status === 'unread'
                ? 'bg-gray-800'
                : 'hover:bg-gray-800/20'
                }`}
        >
            <div className="flex items-start justify-between">
                <h3 className="font-semibold text-white">
                    {from}
                </h3>

                <span className="text-xs text-gray-400">
                    {time}
                </span>
            </div>
            <p className="text-sm text-gray-400 truncate">
                {subject}
            </p>
        </button>
    )
}
