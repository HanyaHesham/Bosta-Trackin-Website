import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import testImg from "../../assets/images/testImg.jpg";
import { getTrackingData } from "../../api/track";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import CustomStepper from "../../components/CustomStepper";
import moment from "moment/moment";

const statusColor = {
  DELIVERED: "#36B500",
  CANCELLED: "#F40105",
  DELIVERED_TO_SENDER: "#F9BA02",
};

export default function TrackingPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [trackingData, setTrackingData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetTrackingData = async () => {
    setLoading(true);
    await getTrackingData(id)
      .then((res) => {
        console.log(res.data);
        const data = res.data;

        setTrackingData({
          ...data,
          TransitEvents: [
            {
              hub: data.hub,
              timestamp: data.timestamp,
              reason: data.reason,
            },
            ...data.TransitEvents,
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      handleGetTrackingData();
    }
  }, [id]);

  return (
    <>
      {!loading && (
        <div className="mainContainer">
          <div className="my-10">
            <div className="trackingDetailsSection grid grid-cols-1 md:grid-cols mt-10 pt-8">
              <div className="details grid grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
                <div>
                  <h5>
                    {t("tracking_no")} : {trackingData?.TrackingNumber}
                  </h5>
                  <div>
                    <p
                      style={{
                        color: statusColor[trackingData?.CurrentStatus?.state],
                      }}
                    >
                      {trackingData?.CurrentStatus?.state || "---"}
                    </p>
                  </div>
                </div>
                <div>
                  <h5>{t("last_update")}</h5>
                  <div>
                    <p>
                      {moment(trackingData?.CreateDate).format(
                        "MMMM Do YYYY, h:mm:ss"
                      ) || "---"}
                    </p>
                  </div>
                </div>
                <div>
                  <h5>{t("merchant_name")}</h5>
                  <div>
                    <p>{trackingData?.provider || "---"}</p>
                  </div>
                </div>
                <div>
                  <h5>{t("delivery_time")}</h5>
                  <div>
                    <p>
                      {moment(trackingData?.PromisedDate).format(
                        "MMMM Do YYYY, h:mm:ss"
                      ) || "---"}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-1 my-10">
                {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10"> */}
                <CustomStepper
                  stepColor={statusColor[trackingData?.CurrentStatus?.state]}
                  currentStep={
                    trackingData?.CurrentStatus?.state === "DELIVERED" ? 3 : 2
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
              <div className="lg:col-span-2">
                <h2 className="mb-3">{t("shipment_details")}</h2>
                {trackingData?.TransitEvents?.length > 0 ? (
                  <CustomTable tableRows={trackingData?.TransitEvents} />
                ) : (
                  t("no_data")
                )}
              </div>
              <div>
                <h2 className="mb-3">{t("delivery_address")}</h2>

                <Grid container wrap="nowrap">
                  <Grid item xs className="address-section">
                    <Typography>
                      امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17
                      بلوك 22,,, القاهرة
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" className="report-section">
                  <Grid item>
                    <img className="reportImg" src={testImg} alt="reportImg" />
                  </Grid>
                  <Box textAlign="center">
                    <Grid item xs>
                      <h2>{t("problem_question")}</h2>
                      <Button className="reportBtn" variant="contained">
                        {t("report_problem")}
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
