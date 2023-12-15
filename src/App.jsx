import { Alert, Box, Snackbar } from "@mui/material";

import XtremeQuoteForm from "./components/XtremeQuoteForm";
import MaterialCosts from "./components/MaterialCosts";
import LaborCosts from "./components/LaborCosts";
import { useEffect, useState } from "react";
import SelectChecklist from "./components/SelectChecklist";
import Coating from "./components/Coating";
import Concrete from "./components/Concrete";
import Honing from "./components/Honing";

const ZOHO = window.ZOHO;

function App() {
  const [dealID, setDealID] = useState(null);
  const [zohoLoaded, setZohoLoaded] = useState(false);
  const [page, setPage] = useState("Home");
  const [dealData, setDealData] = useState(null);
  const [coatingData, setCoatingData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      //Custom Bussiness logic goes here
      setDealID(data.EntityId[0]);
    });
    /*
     * initializing the widget.
     */
    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
      ZOHO.CRM.UI.Resize({ width: "1000" }).then(function (data) {
        console.log(data);
      });
    });
  }, []);

  useEffect(() => {
    async function getData() {
      if (zohoLoaded) {
        ZOHO.CRM.API.getRecord({
          Entity: "deals",
          approved: "both",
          RecordID: dealID,
        }).then(function (data) {
          setDealData(data?.data[0]);
        });
      }
    }
    getData();
  }, [zohoLoaded, dealID]);

  return (
    <>
      {zohoLoaded ? (
        <Box sx={{ width: "100%" }}>
          {page === "Home" && <SelectChecklist setPage={setPage} />}
          {page === "Coating-Checklist" && (
            <Coating
              setPage={setPage}
              dealData={dealData}
              ZOHO={ZOHO}
              setSnackbarMessage={setSnackbarMessage}
              setSeverity={setSeverity}
              setOpenSnackbar={setOpenSnackbar}
              setZohoLoaded={setZohoLoaded}
            />
          )}
          {page === "Concreate-Checklist" && (
            <Concrete
              setPage={setPage}
              dealData={dealData}
              ZOHO={ZOHO}
              setSnackbarMessage={setSnackbarMessage}
              setSeverity={setSeverity}
              setOpenSnackbar={setOpenSnackbar}
              setZohoLoaded={setZohoLoaded}
            />
          )}
          {page === "Honing-Checklist" && (
            <Honing
              setPage={setPage}
              dealData={dealData}
              ZOHO={ZOHO}
              setSnackbarMessage={setSnackbarMessage}
              setSeverity={setSeverity}
              setOpenSnackbar={setOpenSnackbar}
              setZohoLoaded={setZohoLoaded}
            />
          )}
          {/* <XtremeQuoteForm />
  <MaterialCosts />
  <LaborCosts /> */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3800}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      ) : (
        <Box>...........</Box>
      )}
    </>
  );
}

export default App;
