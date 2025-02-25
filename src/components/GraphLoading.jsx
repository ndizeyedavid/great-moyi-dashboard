
export default function GraphLoading() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((index) => (
                <div key={index} className="p-6 bg-gray-900 border rounded-lg border-red-900/20 h-[250px] animate-pulse"></div>
            ))}

        </div>
    )
}
