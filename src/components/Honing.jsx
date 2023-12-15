import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function Honing({ setPage, dealData, ZOHO,setSnackbarMessage,setSeverity,setOpenSnackbar }) {
  const [terrazo, setTerrazo] = useState(false);
  const [lvt, setLvt] = useState(false);
  const [tile, setTile] = useState(false);

  const handleFinalSubmit = () => {
    console.log({
      terrazo: terrazo,
      lvt: lvt,
      tile: tile,
    });
  };

  const handleTerrazoChange = (value) => {
    setTerrazo(value);
  };

  const handleLvtChange = (value) => {
    setLvt(value);
  };

  const handleTileChange = (value) => {
    setTile(value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const recordData = data;

    recordData["Account_Name"] = dealData?.Account_Name;
    recordData["Contact_Person"] = dealData?.Contact_Name;
    recordData["Job_Deal_Name"] = dealData?.Deal_Name;
    recordData["Deal_Lookup"] = { id: dealData?.id };
    // console.log({recordData})

    await ZOHO.CRM.API.insertRecord({
      Entity: "Honing_Bid_Checklists",
      APIData: recordData,
      Trigger: ["workflow"],
    }).then(function (data) {
      if (data.data[0].status === "success") {
        setSnackbarMessage("Milestone successfully updated");
        setSeverity("success");
        setOpenSnackbar(true);
        setPage("Home");
        ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
          console.log(data);
        });
      }
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ paddingBottom: 3 }}>
        Honing Check List
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <Box>
          <Typography fontWeight="bold">Job Information</Typography>
          <br />
          <br />

          <Grid container spacing={2}>
            {renderTextField("JobSiteName", "Job Site Name", "", control)}
            {renderTextField(
              "JobStreetAddress",
              "Job Street Address",
              "",
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField("JobCity", "Job City", "", control)}
            {renderShiftSelect("vendorType", "Vendor Type", "-None-", control, [
              "-None-",
              "GC",
              "Direct",
            ])}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField("JobZipCode", "Job Zip Code", "", control)}
            {renderShiftSelect(
              "OptimalTimeforCompletion",
              "Optimal Time for Completion",
              "1st Shift",
              control,
              ["1st Shift", "2nd Shift", "3rd Shift"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "weekEndWork",
              "Check if Weekend Work",
              false,
              control
            )}
            {renderTextField("accountName", "Job State", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "PhysicalJobDetails",
              "Physical Job Details",
              "",
              control
            )}
          </Grid>
        </Box>
        <Box>
          {/* section: Space Checklist */}

          <Typography fontWeight="bold">Space Checklist</Typography>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "ClosetOrWaterSource",
              "Locate Mop Closet or Water Source?",
              false,
              control
            )}
            {renderCheckboxField(
              "PowerAvailabilityLocation",
              "Power Availability & Location?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "EquipmentAccess",
              "Equipment Access?",
              false,
              control
            )}
            {renderCheckboxField(
              "GarageAccess",
              "Garage Access?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "LocateElectric",
              "Locate Electric?",
              false,
              control
            )}
            {renderCheckboxField(
              "WalkoutBasement",
              "Walkout Basement?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField("SpaceDetails", "Space Details", "", control)}
          </Grid>
        </Box>
        <br />
        <Box>
          {/* section: Location Within Building */}
          <Typography fontWeight="bold">Location Within Building</Typography>
          <br />
          <Grid container spacing={2}>
            {renderTextField("RoomNumber", "Room Number", "", control)}
            {renderTextField("AreaName", "Area Name", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "accessBuilding",
              "Where to access building?",
              "",
              control
            )}
            {renderTextField("level_floor", "Level/Floor", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "framesForEntry",
              "Measure Door Frames for Entry",
              "",
              control
            )}
            {renderCheckboxField(
              "liftNeeded",
              "Elevator, Stairs, Lift Needed?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "locationDetails",
              "Location Details",
              "",
              control
            )}
          </Grid>
          <br />
        </Box>
        <br />
        <Box>
          {/* section: Coating Jobs */}
          <Typography fontWeight="bold">Honing Jobs</Typography>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect("TypeofStone", "Type of Stone", "", control, [
              "Granite",
              "Marble",
              "Concrete Terranzo",
              "Epoxy Terranzo",
            ])}
            {renderShiftSelect(
              "HoningFloorExistingConditions",
              "Honing Floor Existing Conditions",
              "",
              control,
              ["Poor", "Fair", "Good", "Great"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField("HoningSQFT", "Honing SQFT", "", control)}
            {renderShiftSelect(
              "otherIssues",
              "Other Issues (Choose all the apply)",
              "",
              control,
              [
                "Moisture Issues",
                "Leaking of any fixtures",
                "Structural Issues",
              ]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "HoningFloorCovering",
              "Honing Floor Covering",
              "",
              control,
              ["Wax", "None", "N/A"]
            )}
            {renderTextField(
              "TypeofMetalStrips",
              "Type of Metal Strips",
              "",
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "HoningJobDetails",
              "Honing Job Details",
              "",
              control
            )}
            {renderShiftSelect(
              "NumberofHoningJobAreas",
              "Number of Honing Job Areas",
              "",
              control,
              [1, 2, 3]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect("CoverBase", "Cover Base", "", control, [
              "-None-",
              "Yes",
              "No",
            ])}
            {renderTextField("CoverBaseLF", "Cover Base LF", "", control)}
          </Grid>
        </Box>
        <Box sx={{ padding: "30px 0px" }}>
          <Button onClick={() => setPage("Home")}>Back</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

const renderTextField = (
  name,
  label,
  defaultValue,
  control,
  size = "small",
  labelWidth = 180
) => (
  <Grid item xs={6}>
    <FormControlLabel
      labelPlacement="start"
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div style={{ display: "flex" }}>
              <div style={{ width: labelWidth, flexShrink: 0 }}>
                <label>{label}</label>
              </div>
              <TextField label="" variant="outlined" {...field} size={size} />
            </div>
          )}
        />
      }
    />
  </Grid>
);

const renderSelectField = (name, label, defaultValue, control) => (
  <Grid item xs={6}>
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select label={label} {...field}>
            <MenuItem value="GC">GC</MenuItem>
            {/* Add more <MenuItem> components as needed */}
          </Select>
        )}
      />
    </FormControl>
  </Grid>
);

const renderShiftSelect = (
  name,
  label,
  defaultValue,
  control,
  items,
  labelWidth = 180
) => (
  <Grid item xs={6}>
    <FormControlLabel
      labelPlacement="start"
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div style={{ display: "flex" }}>
              <div style={{ width: labelWidth, flexShrink: 0 }}>
                <label>{label}</label>
              </div>
              <TextField
                select
                label=""
                variant="outlined"
                {...field}
                size="small"
                sx={{ width: "223px" }}
              >
                {items.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
        />
      }
    />
  </Grid>
);

const renderCheckboxField = (
  name,
  label,
  defaultValue,
  control,
  labelWidth = 170
) => (
  <Grid item xs={6}>
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div style={{ display: "flex" }}>
              <div style={{ width: labelWidth, flexShrink: 0 }}>
                <label>{label}</label>
              </div>
              <Checkbox {...field} />
            </div>
          )}
        />
      }
      label=""
      labelPlacement="start"
    />
  </Grid>
);

const renderMultiTextField = (
  name,
  label,
  defaultValue,
  control,
  size = "small",
  labelWidth = 180
) => (
  <Grid item xs={6}>
    <FormControlLabel
      labelPlacement="start"
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div style={{ display: "flex" }}>
              <div style={{ width: labelWidth, flexShrink: 0 }}>
                <label>{label}</label>
              </div>
              <TextField
                label=""
                variant="outlined"
                {...field}
                size="small"
                multiline
                rows={4}
                sx={{ width: "223px" }}
                onFocus={(e) => {
                  e.target.rows = 4; // Expand to 4 rows on focus
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.rows = 1; // Shrink to 1 row if the input is empty
                  }
                }}
              />
            </div>
          )}
        />
      }
    />
  </Grid>
);
