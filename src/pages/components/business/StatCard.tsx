const StatCard = ({
  total,
  change,
  percentage,
  label,
  isHide,
}: {
  total: number;
  change: number;
  percentage: number;
  label: string;
  isHide?: boolean;
}) => {
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col">
      <div className="flex items-center text-4xl font-bold text-gray-900 h-full">
        {total}
        <span
          className={`ml-2 mr-2 flex items-center text-lg font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {!isHide && (
            <>
              <svg
                id="Layer_2_copy_13"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16.003"
                viewBox="0 0 16 16.003"
              >
                <g id="_113">
                  <path
                    id="Path_9326"
                    data-name="Path 9326"
                    d="M14.973,0H2.879a1.032,1.032,0,0,0,0,2.063h9.6L.3,14.241a1.032,1.032,0,0,0,1.46,1.46L13.938,3.523v9.6a1.032,1.032,0,1,0,2.063,0V1.032A1.028,1.028,0,0,0,14.973,0Z"
                    transform="translate(-0.001)"
                    fill="#56b26e"
                  />
                </g>
              </svg>
              <span className={`ml-2`}>{Math.abs(change)}</span>
              <span className="text-sm ml-1">({Math.abs(percentage)}%)</span>
            </>
          )}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
};

// 📌 Sử dụng component
export default StatCard;
