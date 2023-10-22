import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/tracking/${inputValue}`);
  };

  return (
    <div className="homePage">
      <div className="my-20">
        <div className="flex flex-1 items-center justify-center">
          <form onSubmit={handleSubmit}>
            <h2>{t("navbar.track_your_shipment")}</h2>
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
      </div>
    </div>
  );
}
