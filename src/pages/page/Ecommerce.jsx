import { earningData } from "../../data/dummy.jsx";
import StackedBarChart from "../components/charts/StackedBarChart";
import { ActiveUsers, PaymentDashboard, SalesOverview, YearlySalesChart } from "../components";

const Ecommerce = () => {
  return (
    <div className="mt-5">
      {/* Main Sales Overview */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="shadow-md rounded-xl pt-6 m-2 bg-no-repeat sm:bg-cover lg:bg-cover xl:bg-cover bg:start w-full bg-hero-pattern bg-contain p-2 md:h-auto">
          <h1 className="font-bold text-cyan-800 text-lg">Sales Distribution</h1>
          <p className="text-sm">This is all over platform sales generated</p>

          {/* Earnings Overview Cards */}
          <div className="mt-2 flex flex-wrap gap-2 w-full">
            {earningData.map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-start gap-2 p-2 hover:drop-shadow-xl bg-white rounded-md transition-all duration-200 hover:bg-gray-100 flex-col text-sm"
              >
                {/* Amount and Percentage */}
                <div className="flex items-center gap-1">
                  <p className="text-lg font-semibold">${item.amount}</p>
                  {item.percentage && (
                    <p className="text-green-500">{item.percentage}</p>
                  )}
                </div>
                {/* Title */}
                <div className="text-gray-500 text-xs">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout for Charts and Cards */}
      <div className="grid grid-cols-1 sm:grid-col-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-5 p-5 bg ">
        <div className="bg-gray-200 col-span-1 sm:col-span-1 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          <SalesOverview />
        </div>
        <div className="bg-gray-200 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          <StackedBarChart />
        </div>
        <div className="bg-gray-200 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          <YearlySalesChart />
        </div>

      </div>

      <div className="grid grid-cols-3  gap-5 mt-2 pl-5 pr-5">
        <div className="bg-gray-200 md:col-span-1 xl:col-span-1 lg:col-span-1 col-span-3 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          <PaymentDashboard />
        </div>
        <div className="col-span-3 md:col-span-2 sm:col-span-3 bg-gray-200 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
