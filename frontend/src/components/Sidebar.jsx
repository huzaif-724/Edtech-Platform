import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDashboard, logout } from "../slices/authSlice";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "./ConfirmationModal";
import SidebarLink from "./SidebarLink";
import {sidebarLinks} from "../data/dashboardLinks"

const Sidebar = () => {
  const isDashboardOpen = useSelector((state) => state.auth.isDashboardOpen);
  const user = useSelector((state)=> state.auth.user)
  const dispatch = useDispatch();
  const dashboardRef = useRef(null);
  const [confirmationModal, setConfirmationModal] = useState(false);

  // Close dashboard when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
        dispatch(closeDashboard());
      }
    };

    if (isDashboardOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDashboardOpen, dispatch]);

  return (
    <>
      {/* Overlay when Dashboard is open */}
      {isDashboardOpen && <div className="fixed top-16 inset-0 bg-black opacity-50 z-40"></div>}

      {/* Sidebar with Slide-in Animation */}
      <div
        ref={dashboardRef}
        className={`fixed left-0 top-16 h-[calc(100vh-3.5rem)] min-w-[220px] flex flex-col border-r border-richblack-700 bg-richblack-800 py-10 z-50
          transform transition-transform duration-300 ease-in-out ${
            isDashboardOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
         <div className="flex flex-col">
            {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null
                return (
                  <SidebarLink key={link.id} link={link} iconName={link.icon} />
                )
            })}
         </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
        <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  dispatch(logout())
                  setConfirmationModal(false)},
                btn2Handler: () => setConfirmationModal(false),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
