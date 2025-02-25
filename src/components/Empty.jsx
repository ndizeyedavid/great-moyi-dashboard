
export default function Empty({ title, text }) {
    return (
        <div className="flex flex-col items-center justify-center h-[600px] p-6 shadow-md md:h-80 lg:h-96 rounded-2xl">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-16 h-16 text-gray-400"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M9 21V3m6 18V3" />
            </svg>
            <p className="mt-4 text-lg font-semibold text-gray-600">{title}</p>
            <p className="text-sm text-center text-gray-500">{text}</p>
        </div>
    )
}
