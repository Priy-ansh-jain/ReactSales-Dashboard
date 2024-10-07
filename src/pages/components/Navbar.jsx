import { useEffect, useRef } from "react";
import { dashboardLink } from "../../data/dummy.jsx";
import { CiMail } from "react-icons/ci";
import { RiNotification3Line } from "react-icons/ri";
import { Notification, Email } from ".";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const emailRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleOutsideClick = (event) => {
    if (
      emailRef.current &&
      !emailRef.current.contains(event.target) &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsClicked({ mail: false, notification: false });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            type="button"
            onClick={customFunc}
            style={{ color }}
            className="relative bg-gray-100 text-xl p-3 hover:bg-gray-200 rounded-3xl text-black transition-all duration-0"
          >
            <span
              style={{ background: dotColor }}
              className="absolute rounded-full h-2 w-2 right-2 top-2"
            ></span>
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-[10px] items-start">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  // Sample email data
  const emails = [
    {
      id: 1,
      ticket: "TICKET001",
      amount: "$250",
      high: "$300",
      low: "$200",
      status: "Received",
    },
    {
      id: 2,
      ticket: "TICKET002",
      amount: "$150",
      high: "$180",
      low: "$120",
      status: "Pending",
    },
  ];

  // Sample notification data
  const notifications = [
    {
      id: 1,
      message: "New email received regarding TICKET001",
      time: "2 mins ago",
    },
    {
      id: 2,
      message: "Your profile was updated successfully",
      time: "5 mins ago",
    },
    {
      id: 3,
      message: "Payment for TICKET002 is pending",
      time: "10 mins ago",
    },
  ];

  return (
    <div className="flex items-center justify-between bg-gray-100">
      <div className="flex justify-between pt-1 md:mx-6 relative text-[black]">
        <div className="flex -ml-[20px]">
          <NavButton
            title="menu"
            customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
            icon={
              activeMenu ? (
                <AiOutlineMenu className="lg:ml-0 ml-8" />
              ) : (
                <AiOutlineMenu className="ml-8 lg:ml-0" />
              )
            }
            color="black"
          />
          {dashboardLink.map((item) => (
            <div
              key={item.title}
              className="text-[#2e2d2e] m-3 font-semibold uppercase"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className="flex mr-10">
        <NavButton
          title="mail"
          color="blue"
          dotColor="red"
          customFunc={() => handleClick("mail")}
          icon={<CiMail />}
        />
        <NavButton
          title="notification"
          color="blue"
          dotColor="red"
          customFunc={() => handleClick("notification")}
          icon={<RiNotification3Line className="text-[20px]" />}
        />
        {isClicked.notification && <Notification />}
        {isClicked.mail && <Email />}

        {/* Display emails when mail icon is clicked */}
        {isClicked.mail && (
          <div
            ref={emailRef}
            className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg mb-2">Received Emails</h3>
              <button
                onClick={() => setIsClicked((prev) => ({ ...prev, mail: false }))}
                className="text-gray-600 hover:text-gray-800"
              >
                ✖️ {/* Cross icon */}
              </button>
            </div>
            {emails.length > 0 ? (
              emails.map((email) => (
                <div
                  key={email.id}
                  className="flex justify-between border-b border-gray-200 py-2"
                >
                  <div>
                    <span className="font-semibold">Ticket: {email.ticket}</span>
                    <br />
                    <span className="text-sm text-gray-600">Amount: {email.amount}</span>
                    <br />
                    <span className="text-sm text-gray-600">High: {email.high}</span>
                    <br />
                    <span className="text-sm text-gray-600">Low: {email.low}</span>
                    <br />
                    <span className="text-sm text-gray-600">Status: {email.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No emails to display.</p>
            )}
          </div>
        )}

        {/* Display notifications when notification icon is clicked */}
        {isClicked.notification && (
          <div
            ref={notificationRef}
            className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg mb-2">Notifications</h3>
              <button
                onClick={() => setIsClicked((prev) => ({ ...prev, notification: false }))}
                className="text-gray-600 hover:text-gray-800"
              >
                ✖️ {/* Cross icon */}
              </button>
            </div>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="border-b border-gray-200 py-2">
                  <span className="font-semibold">{notification.message}</span>
                  <br />
                  <span className="text-sm text-gray-600">{notification.time}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No notifications to display.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
