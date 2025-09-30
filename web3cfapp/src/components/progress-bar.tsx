
export default function Progress({max, value} : {max : bigint, value : bigint}) {

    const maxValue = Number(max);
    const currValue = Number(value);
    
    // Ensure no division by zero and percentage is between 0 and 100
    const percentage = Math.min(Math.max((currValue / maxValue) * 100, 0), 100);

    return (
        <div className="w-full bg-gray-200  rounded-full h-3 my-2">
            <div 
                className="bg-green-400 h-3 rounded-full flex items-center justify-end text-black" 
                style={{ width: `${percentage}%` }}
            >
                {percentage > 0 ? <span className="text-[10px] font-semibold mr-2">{percentage}$</span> : null}
            </div>
            <p className="my-3 text-xs  text-right text-blue-300">{percentage}% Funded</p>
        </div>
    )
}
