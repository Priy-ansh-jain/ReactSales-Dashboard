import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./components/ui/tooltip";
import { Navbar, Footer, Sidebar, Chart, Chat } from "./pages/components";
import {
  Ecommerce,
  Email,
  Contacts,
  Pricing,
  Calendar,
  TreeView,
  SettingsPage,
  Ticket, // Import the SettingsPage component
} from "./pages/page"; // Ensure SettingsPage is exported here
import { useStateContext } from "./context/ContextProvider";

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className="flex relativer dark:bg-main-dark-bg">
          <div className="fixed right-2 top-1" style={{ zIndex: "1000" }}>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      type="button"
                      className="text-xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-3xl text-black transition-all duration-0"
                      onClick={() => {
                        window.location.href = "/settings"; // Redirect to settings page
                      }}
                    >
                      <FiSettings />
                    </button>
                  </TooltipTrigger>

                  <TooltipContent>
                    <div className="hover:bg-light-gray">Settings</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "w-full"
              }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />
                {/* Apps */}
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/chats" element={<Chat />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/email" element={<Email />} />
                <Route path="/tickets" element={<Ticket />} />
                <Route path="/treeView" element={<TreeView />} />
                <Route path="/settings" element={<SettingsPage />} /> {/* Add route for settings */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
