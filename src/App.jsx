import { Box } from "@mui/material";

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
  const [dealID, setDealID] = useState(null)
  const [zohoLoaded, setZohoLoaded] = useState(false);
  const [page, setPage] = useState("Home")

  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      //Custom Bussiness logic goes here
      setDealID(data.EntityId[0])
    });
    /*
     * initializing the widget.
     */
    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
      ZOHO.CRM.UI.Resize({width:"1000"}).then(function(data){
        console.log(data);
      });
    });
  }, []);

  useEffect(() => {
    async function getData() {
      if (zohoLoaded) {
        ZOHO.CRM.API.getRecord({
          Entity: "deals", approved: "both", RecordID: dealID
         })
         .then(function(data){
             console.log(data)
         })
      }
    }
    getData();
  }, [zohoLoaded,dealID]);


  return (
    <Box sx={{width: "100%"}}>
      {
        page === "Home" && <SelectChecklist setPage={setPage} />
      }
      {
        page === "Coating-Checklist" && <Coating setPage={setPage} />
      }
      {
        page === "Concreate-Checklist" && <Concrete setPage={setPage} />
      }
       {
        page === "Honing-Checklist" && <Honing setPage={setPage} />
      }
      {/* <XtremeQuoteForm />
      <MaterialCosts />
      <LaborCosts /> */}
    </Box>
  );
}

export default App;
