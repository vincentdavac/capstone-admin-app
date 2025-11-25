import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { AlertsContainerRef } from "../components/Alert/AlertsContainer";
import { AppContext } from "../context/AppContext";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

// Assume these icons are imported from an icon library
import {
  ChevronDownIcon,
  HorizontaLDots,
  HomepageSliderShow,
  HomepageAbout,
  HomepagePrototype,
  HomepageTeam,
  HomepageFAQs,
  HomepageFooter,
  HomepageAdjust,
  Archive,
  Comment,
  Management,
  ManageUsers,
  Buoy,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";
import {
  CloudRain,
  Droplet,
  Droplets,
  Gauge,
  LayoutDashboard,
  MapPinHouse,
  Megaphone,
  MessagesSquare,
  Thermometer,
  Waves,
  Wind,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;

  subItems?: {
    name: string;
    path: string;
    icon?: React.ReactNode;
    pro?: boolean;
    new?: boolean;
  }[];
};

const navItems: NavItem[] = [
  // ADMIN
  {
    icon: <LayoutDashboard />,
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <MessagesSquare />,
    name: "Chat support",
    path: "/admin/chat-support",
  },
  {
    icon: <ManageUsers />,
    name: "Manage Users",
    path: "/admin/manage-users",
  },
  {
    name: "Management",
    icon: <Management />,
    subItems: [
      {
        name: "Buoy Deployment",
        path: "/admin/manage-buoys",
        icon: <Buoy className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Barangay",
        path: "/admin/barangay-management",
        icon: <MapPinHouse className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
    ],
  },

  // BARANGAY
  {
    icon: <LayoutDashboard />,
    name: "Dashboard",
    path: "/barangay/dashboard",
  },
  {
    icon: <MessagesSquare />,
    name: "Chat support",
    path: "/barangay/chat-support",
  },
  {
    icon: <ManageUsers />,
    name: "Manage Users",
    path: "/barangay/manage-users",
  },
  {
    icon: <Waves />,
    name: "River Monitoring",
    path: "/barangay/river-monitoring",
  },

  {
    icon: <Megaphone />,
    name: "Alert Management",
    path: "/barangay/alert-management",
  },
  {
    icon: <Buoy />,
    name: "Buoy Monitoring",
    path: "/barangay/deployed-buoy",
  },
  {
    name: "Historical Data",
    icon: <Management />,
    subItems: [
      {
        name: "Surroundings Temperature",
        path: "/barangay/historical-data/surrounding-temperature",
        icon: <Thermometer className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Humidity",
        path: "/barangay/historical-data/humidity",
        icon: <Droplet className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Water Temperature ",
        path: "/barangay/historical-data/water-temperature",
        icon: <Thermometer className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Rain Monitoring",
        path: "/barangay/historical-data/rain-monitoring",
        icon: <CloudRain className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Atmospheric Pressure ",
        path: "/barangay/historical-data/atmospheric-pressure",
        icon: <Gauge className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Wind Speed",
        path: "/barangay/historical-data/windspeed-monitoring",
        icon: <Wind className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Water Level",
        path: "/barangay/historical-data/water-level",
        icon: <Waves className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Rain Gauge",
        path: "/barangay/historical-data/rain-gauge",
        icon: <Droplets className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
    ],
  },

  // {
  //   name: "Pages",
  //   icon: <PageIcon />,
  //   subItems: [
  //     { name: "Slider", path: "/slider", pro: false },
  //     { name: "404 Error", path: "/error-404", pro: false },
  //     { name: "Calendar", path: "/calendar", pro: false },
  //     { name: "User Profile", path: "/admin-profile", pro: false },
  //     { name: "Form Elements", path: "/form-elements", pro: false },
  //     { name: "Basic Tables", path: "/basic-tables", pro: false },
  //     { name: "Line Chart", path: "/line-chart", pro: false },
  //     { name: "Bar Chart", path: "/bar-chart", pro: false },
  //     { name: "Alerts", path: "/alerts", pro: false },
  //     { name: "Avatar", path: "/avatars", pro: false },
  //     { name: "Badge", path: "/badge", pro: false },
  //     { name: "Buttons", path: "/buttons", pro: false },
  //     { name: "Images", path: "/images", pro: false },
  //     { name: "Videos", path: "/videos", pro: false },
  //     { name: "Sign In", path: "/signin", pro: false },
  //     { name: "Sign Up", path: "/signup", pro: false },
  //   ],
  // },
  // {
  //   name: "Design ",
  //   icon: <PageIcon />,
  //   subItems: [
  //     { name: "Alert", path: "/alerts", pro: false },
  //     { name: "avatars", path: "/avatars", pro: false },
  //     { name: "badge", path: "/badge", pro: false },
  //     { name: "buttons", path: "/buttons", pro: false },
  //     { name: "images", path: "/form-elements", pro: false },
  //     { name: "videos", path: "/videos", pro: false },
  //   ],
  // },
];

const othersItems: NavItem[] = [
  {
    icon: <HomepageAdjust />,
    name: "Customization",
    subItems: [
      {
        name: "Slider",
        path: "/admin/customization-slider",
        icon: <HomepageSliderShow className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "About us",
        path: "/admin/customization-about",
        icon: <HomepageAbout className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Prototype",
        path: "/admin/customization-prototype",
        icon: <HomepagePrototype className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Team",
        path: "/admin/customization-team",
        icon: <HomepageTeam className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "FAQs",
        path: "/admin/customization-faqs",
        icon: <HomepageFAQs className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Feedback",
        path: "/admin/customization-feedbacks",
        icon: <Comment className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Footer",
        path: "/admin/customization-footer",
        icon: <HomepageFooter className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
    ],
  },

  {
    icon: <Archive />,
    name: "Archive",
    subItems: [
      //  ADMIN
      {
        name: "Users",
        path: "/admin/archived-users",
        icon: <ManageUsers className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      {
        name: "Feedbacks",
        path: "/admin/archived-feedbacks",
        icon: <Comment className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
      // BARANGAY
      {
        name: "Users",
        path: "/barangay/archived-users",
        icon: <ManageUsers className="w-5 h-5 stroke-[1.5]" />,
        pro: false,
      },
    ],
  },
];

// Helper function to filter nav items by user type
const filterNavItemsByUserType = (items: NavItem[], userType?: string) => {
  if (!userType) return [];
  return items
    .map((item) => {
      if (item.subItems) {
        const filteredSubItems = item.subItems.filter((sub) =>
          sub.path?.startsWith(`/${userType}`)
        );
        if (filteredSubItems.length === 0) return null;
        return { ...item, subItems: filteredSubItems };
      }
      if (item.path && item.path.startsWith(`/${userType}`)) return item;
      return null;
    })
    .filter(Boolean) as NavItem[];
};

const AppSidebar = ({ alertsRef }: Props) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  // ✅ Move useContext here
  const { user } = useContext(AppContext)!;
  const lastType = user?.userType;

  // Apply filter to your nav items
  const filteredNavItems = filterNavItemsByUserType(navItems, lastType);
  const filteredOtherItems = filterNavItemsByUserType(othersItems, lastType);

  const handleClick = (e: React.MouseEvent, name: string) => {
    if (name === "Sign In" || name === "Sign Up") {
      e.preventDefault();

      alertsRef.current?.addAlert(
        "warning",
        `You are already logged in, no need to ${name}.`
      );
    }
  };
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    {subItem.name === "Sign In" ||
                    subItem.name === "Sign Up" ? (
                      <a
                        href="#"
                        onClick={(e) => handleClick(e, subItem.name)}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.icon}
                        {subItem.name}
                      </a>
                    ) : (
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.icon}
                        {subItem.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link
          to={
            user?.userType === "admin"
              ? "/admin/dashboard"
              : user?.userType === "barangay"
              ? "/barangay/dashboard"
              : "/"
          }
        >
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                src="/light-with-name.svg"
                alt="Logo"
                className="dark:hidden"
              />
              <img
                className="hidden dark:block"
                src="/dark-with-name.svg"
                alt="Logo"
              />
            </>
          ) : (
            <>
              <img
                src="/light-solo.svg"
                alt="Logo"
                width={50}
                height={50}
                className="dark:hidden"
              />
              <img
                src="/dark-solo.svg"
                alt="Logo"
                width={50}
                height={50}
                className="hidden dark:block"
              />
            </>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(filteredNavItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(filteredOtherItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
