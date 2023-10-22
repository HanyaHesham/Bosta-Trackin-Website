import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoImg from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const navigation = [
    { name: t("navbar.home"), href: "/", current: false },
    { name: t("navbar.prices"), href: "/prices", current: false },
    { name: t("navbar.call_sales"), href: "/sales", current: false },
  ];

  function changeLang() {
    let currentLang = i18n.language;
    if (currentLang === "ar") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e) => {
    // Perform form submission logic here
    console.log("Form submitted:", inputValue);
    setIsOpen(false);
    navigate(`/tracking/${inputValue}`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Disclosure as="nav" className="bg-white-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 nav-bar fixed top-0 left-0 right-0 z-50 bg-white">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center justify-between sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:text-red-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                    <span className="absolute -inset-0.5 " />
                    <span className="sr-only">{t("navbar.open_menu")}</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center hidden sm:block">
                  <div className="nav-bar-logo">
                    <NavLink to="/">
                      <img className="h-8 w-auto" src={logoImg} alt="logo" />
                      <span>{t("navbar.bosta")}</span>
                    </NavLink>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-black"
                              : "text-black-300 hover:text-red-700 hover:text-black",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="trackDropdown absolute inset-y-0 right-0 flex items-center pr-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="relative" ref={dropdownRef}>
                    <button className="trackBtn" onClick={toggleMenu}>
                      {t("navbar.track_shipment")}
                      {i18n.language === "ar" ? (
                        <KeyboardArrowLeftIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )}
                    </button>
                    {isOpen && (
                      <div className="dropdown-menu absolute z-10 bg-white py-2 mt-2 rounded shadow-lg">
                        {/* Menu Options */}
                        <form onSubmit={handleSubmit}>
                          <label htmlFor="inputField">
                            {t("navbar.track_your_shipment")}
                          </label>
                          <div className="flex my-3">
                            <input
                              id="inputField"
                              type="text"
                              placeholder={t("tracking_no")}
                              className="border border-gray-300 rounded px-2 py-1 focus:border-gray-200"
                              value={inputValue}
                              onChange={handleInputChange}
                            />
                            <button
                              type="submit"
                              className="searchBtn text-white font-semibold rounded"
                            >
                              <SearchIcon />
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  <NavLink to="/">{t("navbar.login")}</NavLink>
                  <Button
                    shape="circle"
                    onClick={changeLang}
                    className="lang-button"
                  >
                    {i18n.language === "ar" ? "ENG" : "AR"}
                  </Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-7 mt-10">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-black"
                        : "text-black-300 hover:text-red-700 hover:text-black",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
