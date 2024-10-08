import { useState, useEffect } from "react";
import { earningData } from "../../data/dummy.jsx";
import StackedBarChart from "../components/charts/StackedBarChart";
import { ActiveUsers, PaymentDashboard, SalesOverview, YearlySalesChart } from "../components";

const Ecommerce = () => {
  const [hiddenItems, setHiddenItems] = useState([]);

  useEffect(() => {
    // Load saved hidden items from localStorage (if any)
    const savedHiddenItems = localStorage.getItem("hiddenItems");
    if (savedHiddenItems) setHiddenItems(JSON.parse(savedHiddenItems));
  }, []);

  const toggleVisibility = (key) => {
    const updatedHiddenItems = hiddenItems.includes(key)
      ? hiddenItems.filter((item) => item !== key)
      : [...hiddenItems, key];

    setHiddenItems(updatedHiddenItems);
    localStorage.setItem("hiddenItems", JSON.stringify(updatedHiddenItems));
  };

  return (
    <div className="mt-2 px-4">
      {/* Main Sales Overview */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center pl-3 pr-3 ">
        <div className="shadow-md rounded-xl m-2 bg-no-repeat sm:bg-cover lg:bg-cover xl:bg-cover bg:start w-full bg-hero-pattern bg-contain p-2 md:h-auto">
          <h1 className="font-bold text-cyan-800 text-lg">Sales Distribution</h1>
          <p className="text-sm">This is all over platform sales generated</p>

          {/* Earnings Overview Cards */}
          <div className="mt-2 flex flex-wrap gap-2 w-full">
            {earningData.map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-start gap-2 p-2 hover:drop-shadow-xl bg-white rounded-md transition-all duration-200 hover:bg-gray-100 flex-col text-sm"
              >
                <div className="flex items-center gap-1">
                  <p className="text-lg font-semibold">${item.amount}</p>
                  {item.percentage && (
                    <p className="text-green-500">{item.percentage}</p>
                  )}
                </div>
                <div className="text-gray-500 text-xs">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Components Stacked Vertically */}
      <div className="grid grid-cols-1 sm:grid-col-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-5 p-5 bg ">
        <div className="bg-gray-200 col-span-1 sm:col-span-1 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          {!hiddenItems.includes("salesOverview") ? (
            <>
              <button className="bg-gray-300 p-1 hover:bg-white rounded-sm" onClick={() => toggleVisibility("salesOverview")}>Hide</button>
              <SalesOverview />
            </>
          ) : (
            <div key="salesOverview-placeholder" className="bg-gray-200 p-2 rounded-md shadow-md text-xs m-2">
              <button onClick={() => toggleVisibility("salesOverview")}>Show Sales Overview</button>
            </div>
          )}
        </div>
        <div className="bg-gray-200 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          {!hiddenItems.includes("stackedBarChart") ? (
            <>
              <button className="bg-gray-300 p-1 hover:bg-white rounded-sm" onClick={() => toggleVisibility("stackedBarChart")}>Hide</button>
              <StackedBarChart />
            </>
          ) : (
            <div key="stackedBarChart-placeholder" className="bg-gray-200 p-2 rounded-md shadow-md text-xs m-2">
              <button onClick={() => toggleVisibility("stackedBarChart")}>Show Stacked Bar Chart</button>
            </div>
          )}
        </div>
        <div className="bg-gray-200 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          {!hiddenItems.includes("yearlySalesChart") ? (
            <>
              <button className="bg-gray-300 p-1 hover:bg-white rounded-sm" onClick={() => toggleVisibility("yearlySalesChart")}>Hide</button>
              <YearlySalesChart />
            </>
          ) : (
            <div key="yearlySalesChart-placeholder" className="bg-gray-200 p-2 rounded-md shadow-md text-xs m-2">
              <button onClick={() => toggleVisibility("yearlySalesChart")}>Show Yearly Sales Chart</button>
            </div>
          )}
        </div>

      </div>

      <div className="grid grid-cols-3  gap-5 mt-2 pl-5 pr-5">




        <div className="bg-gray-200 md:col-span-1 xl:col-span-1 lg:col-span-1 col-span-3 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          {!hiddenItems.includes("paymentDashboard") ? (
            <>
              <button className="bg-gray-300 p-1 hover:bg-white rounded-sm" onClick={() => toggleVisibility("paymentDashboard")}>Hide</button>
              <PaymentDashboard />
            </>
          ) : (
            <div key="paymentDashboard-placeholder" className="bg-gray-200 p-2 rounded-md shadow-md text-xs m-2">
              <button onClick={() => toggleVisibility("paymentDashboard")}>Show Payment Dashboard</button>
            </div>
          )}
        </div>
        <div className="col-span-3 sm:col-span-3 md:col-span-2 bg-gray-200 p-2 rounded-md shadow-md text-xs hover:bg-orange-300">
          {!hiddenItems.includes("activeUsers") ? (
            <>
              <button
                className="bg-gray-300 p-1 hover:bg-white rounded-sm"
                onClick={() => toggleVisibility("activeUsers")}
              >
                Hide
              </button>
              <ActiveUsers />
            </>
          ) : (
            <div className="bg-gray-200 p-2 rounded-md shadow-md text-xs m-2">
              <button onClick={() => toggleVisibility("activeUsers")}>
                Show Active Users
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Ecommerce;
