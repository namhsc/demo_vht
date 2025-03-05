const StatCard = ({
  total,
  change,
  percentage,
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
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg h-full">
      <div className="flex items-center text-4xl font-bold text-gray-900">
        {total}

        {!isHide && (
          <span
            className={`ml-3 flex items-center text-lg font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="ml-1"
            >
              <path
                d="M14.973,0H2.879a1.032,1.032,0,0,0,0,2.063h9.6L.3,14.241a1.032,1.032,0,0,0,1.46,1.46L13.938,3.523v9.6a1.032,1.032,0,1,0,2.063,0V1.032A1.028,1.028,0,0,0,14.973,0Z"
                fill={isPositive ? "#56b26e" : "#e63946"}
              />
            </svg>
            <span className="ml-2 text-xl font-semibold">
              {Math.abs(change)}
            </span>
            <span className="ml-1 text-sm text-gray-500">
              ({Math.abs(percentage)}%)
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
