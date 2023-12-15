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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function Concrete({
  setPage,
  dealData,
  ZOHO,
  setSnackbarMessage,
  setSeverity,
  setOpenSnackbar,
}) {
  const [polish, setPolish] = useState(false);
  const [eproxy, setEproxy] = useState(false);
  const [striping, setStripping] = useState(false);
  const [other, setOther] = useState(false);

  const handlePolishChange = (value) => {
    setPolish(value);
  };

  const handleProxyChange = (value) => {
    setEproxy(value);
  };

  const handleStripingChange = (value) => {
    setStripping(value);
  };
  const handleOtherChange = (value) => {
    setOther(value);
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

    await ZOHO.CRM.API.insertRecord({
      Entity: "Concrete_Bid_Checklists",
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
        Type of Bid / Concrete
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* {renderCheckboxField("Terrazzo", "Terrazzo", false, control)} */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Controller
                  name="Polish"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>Polish</label>
                      </div>
                      <Checkbox
                        {...field}
                        onChange={(e) => handlePolishChange(e.target.checked)}
                      />
                    </div>
                  )}
                />
              }
              label=""
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Controller
                  name="Epoxy"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>Epoxy</label>
                      </div>
                      <Checkbox
                        {...field}
                        onChange={(e) => handleProxyChange(e.target.checked)}
                      />
                    </div>
                  )}
                />
              }
              label=""
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Controller
                  name="Striping"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>Striping</label>
                      </div>
                      <Checkbox
                        {...field}
                        onChange={(e) => handleStripingChange(e.target.checked)}
                      />
                    </div>
                  )}
                />
              }
              label=""
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Controller
                  name="Other"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>Other</label>
                      </div>
                      <Checkbox
                        {...field}
                        onChange={(e) => handleOtherChange(e.target.checked)}
                      />
                    </div>
                  )}
                />
              }
              label=""
              labelPlacement="start"
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Box>
          <Typography fontWeight="bold">Job Information</Typography>
          <br />
          <br />

          <Grid container spacing={2}>
            {renderTextField("Facility_Name", "Job Site Name", "", control)}
            {renderTextField(
              "Job_Street_Address",
              "Job Street Address",
              "",
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField("Job_City", "Job City", "", control)}
            {renderShiftSelect(
              "Vendor_Type",
              "Vendor Type",
              "-None-",
              control,
              ["-None-", "GC", "Direct"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField("Job_Zip_Code", "Job Zip Code", "", control)}
            {renderShiftSelect(
              "What_is_the_optimal_time_for_completion	",
              "Optimal Time for Completion",
              "1st Shift",
              control,
              ["1st Shift", "2nd Shift", "3rd Shift"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "Check_if_Weekend_Work	",
              "Check if Weekend Work",
              false,
              control
            )}
            {renderTextField("Job_State", "Job State", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "Physical_Job_Details",
              "Physical Job Details",
              "",
              control
            )}
          </Grid>
        </Box>
        <br />
        <Box>
          <Typography fontWeight="bold">Bid Checklist Information</Typography>
          <br />
          <br />

          <Grid container spacing={2}>
            {renderDatePicker("Create_Date", "Create Date", null, control)}
            {renderTextField(
              "Name",
              "Concrete - Bid Checklist Name",
              "",
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderDatePicker(
              "Quote_Due_Date",
              "Quote Due Date",
              null,
              control
            )}
            {renderTextField(
              "Bid_Checklist_Co_Owner",
              "Bid Checklist Co-Owner",
              "",
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderDatePicker(
              "Est_Perform_Date",
              "Est. Perform Date",
              null,
              control
            )}
            {renderCheckboxField(
              "Send_to_Vsimple",
              "Send to Vsimple",
              false,
              control
            )}
          </Grid>
          <br />
        </Box>
        <Box>
          {/* section: Space Checklist */}

          <Typography fontWeight="bold">Space Checklist</Typography>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "Locate_Mop_Closet_or_Water_Source",
              "Locate Mop Closet or Water Source?",
              false,
              control
            )}
            {renderCheckboxField(
              "Power_Availability_LocationEdit",
              "Power Availability & Location?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "Equipment_Access",
              "Equipment Access?",
              false,
              control
            )}
            {renderCheckboxField(
              "Garage_Access",
              "Garage Access?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "Locate_Electric",
              "Locate Electric?",
              false,
              control
            )}
            {renderCheckboxField(
              "Walkout_Basement",
              "Walkout Basement?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "Space_Details",
              "Space Details",
              "",
              control
            )}
          </Grid>
        </Box>
        <br />
        <Box>
          {/* section: Location Within Building */}
          <Typography fontWeight="bold">Location Within Building</Typography>
          <br />
          <Grid container spacing={2}>
            {renderTextField("Room_Number", "Room Number", "", control)}
            {renderTextField("Area_Name", "Area Name", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "Where_to_access_building	",
              "Where to access building?",
              "",
              control
            )}
            {renderTextField("Level_Floor", "Level/Floor", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "Measure_Door_Frames_for_Entry",
              "Measure Door Frames for Entry",
              false,
              control
            )}
            {renderCheckboxField(
              "Elevator_Stairs_Lift_Needed",
              "Elevator, Stairs, Lift Needed?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "Location_Details",
              "Location Details",
              "",
              control
            )}
          </Grid>
          <br />
        </Box>
        <br />
        <Box>
          {/* section: Concrete Jobs */}
          <Typography fontWeight="bold">Concrete - Jobs</Typography>
          <br />
          <Grid container spacing={2}>
            {/* {renderShiftSelect(
              "Existing_Floor_Covering",
              "Existing Floor Covering",
              "None",
              control,
              [
                "Tile",
                "Eproxy",
                "Carpet",
                "VCT",
                "Glue",
                "Mastic",
                "Coating",
                "None",
                "N/A",
              ]
            )} */}
            {renderShiftSelect(
              "Existing_Conditions",
              "Existing Conditions",
              "None",
              control,
              ["Poor", "Fair", "Good", "Great"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "Concrete_Hardness",
              "Concrete Hardness",
              "None",
              control,
              ["Hard", "Medium", "Soft", "Extra Soft"]
            )}
            {renderShiftSelect(
              "Structural_issues",
              "Structural issues?",
              "None",
              control,
              ["Yes", "No"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "Moisture_Issues",
              "Moisture Issues?",
              "None",
              control,
              ["Yes", "No"]
            )}
            {renderCheckboxField(
              "Curing_Compound_Removal",
              "Curing Compound Removal",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "Generator_Required",
              "Generator Required?",
              "None",
              control,
              ["Yes", "No"]
            )}
            {renderShiftSelect(
              "Grinder_Type",
              "Grinder Type",
              "None",
              control,
              ["Propane", "Electric"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect("Lighting", "Lighting?", "None", control, [
              "Yes",
              "No",
            ])}
            {renderTextField("Joint_Fill_LF", "Joint Fill LF", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "Distance_to_Power",
              "Distance to Power",
              "",
              control
            )}
            {renderTextField(
              "Crack_Chasing_LF",
              "Crack Chasing LF",
              "",
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "Debris_Disposal_Onsite",
              "Debris Disposal Onsite?",
              "None",
              control,
              ["Yes", "No"]
            )}
            {renderShiftSelect("Grout_Coat", "Grout Coat", "None", control, [
              "Yes",
              "No",
            ])}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "Concrete_Job_Details",
              "Concrete Job Details",
              "",
              control
            )}
          </Grid>
          <br />
        </Box>
        {eproxy && (
          <Box>
            {/* section: Epoxy Jobs */}
            <Typography fontWeight="bold">Proxy Jobs</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Scope_of_Work_Epoxy",
                "Scope of Work - Epoxy",
                "",
                control
              )}
              {renderShiftSelect(
                "Cove_Base_Required",
                "Cove Base Required?",
                "None",
                control,
                ["4 Inch", "6 Inch", "None"]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderShiftSelect("System", "System", "None", control, [
                "Flake",
                "Quartz",
                "Metallic",
                "Solid Color With Grit",
                "Solid Color no Grit",
                "Clear Coat",
                "None",
              ])}
              {renderTextField("Total_Epoxy_LF	", "Total Epoxy LF", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderShiftSelect("Flake_Size", "Flake Size", "None", control, [
                "Quarter Inch",
                "Eighth Inch",
                "None",
              ])}
              {renderMultiSelect(
                "Epoxy_Metallic_Colors",
                "Epoxy Metallic Colors",
                "",
                control,
                [
                  "VAR Pearl",
                  "VAR Dolphin",
                  "VAR Manatee",
                  "VAR Whale",
                  "VAR Emerald",
                  "VAR Lagar",
                  "VAR Driftwood",
                  "VAR Hammock",
                  "VAR Rum",
                  "VAR Shipwreck",
                  "VAR Bikini",
                  "VAR Starfish",
                  "VAR Americana",
                  "VAR Sangria",
                  "VAR Mandarin",
                  "VAR Daydream",
                  "VAR Sunset",
                  "VAR Margarita",
                  "VAR Avocado",
                  "VAR Seaweed",
                  "VAR Curacao",
                  "VAR Azure",
                  "VAR Ocean",
                  "VAR Reef",
                  "VAR Seashell",
                  "VAR Guava",
                  "VAR Overcast",
                  "VAR Sandbar",
                  "VAR Palapa",
                  "VAR Bamboo",
                  "VAR Tiki",
                  "VAR Cabana",
                  "VAR Cannon",
                  "VAR Scandal",
                  "VAR Parrot",
                  "VAR Mango",
                  "VAR Coral",
                  "VAR Ginger",
                  "VAR Banana",
                  "VAR Papaya",
                  "VAR Palm",
                  "VAR Pier",
                  "VAR Kona",
                  "VAR Caribbean",
                  "VAR Maui",
                  "VAR Oyster",
                  "VAR Prawn",
                  "VAR Urchin",
                  "VAR Jellyfish",
                  "VAR Snail",
                ]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("Epoxy_SQFT	", "Epoxy SQFT", "", control)}
              {renderMultiSelect("Epoxy_Colors", "Epoxy Colors", "", control, [
                "SW White",
                "SW Black",
                "SW Charcoal",
                "SW Steel Gray",
                "SW Bone White",
                "SW Silver Gray",
                "SW Parchment",
                "SW Royal Blue",
                "SW Pewter",
                "SW Classic Tile Red",
                "SW Caramel",
              ])}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {renderMultiTextField(
                  "Epoxy_Job_Details",
                  "Epoxy Job Details",
                  "",
                  control
                )}
              </Grid>
            </Grid>
          </Box>
        )}
        {polish && (
          <Box>
            {/* section: polish*/}
            <Typography fontWeight="bold">Polished Jobs</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Scope_of_Work_Polish	",
                "Scope of Work - Polish",
                "",
                control
              )}
              {renderShiftSelect(
                "Finish_Level",
                "Finish Level",
                "None",
                control,
                ["400", "800", "1500", "3000", "None"]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderShiftSelect("Stain", "Stain", "", control, ["Yes", "No"])}
              {renderShiftSelect(
                "Power_Onsite",
                "Power Onsite?",
                "None",
                control,
                ["Yes", "No"]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderShiftSelect(
                "Joints_Filled",
                "Joints Filled?",
                "None",
                control,
                ["Yes", "No"]
              )}
              {renderTextField(
                "Breaker_Panel_Type",
                "Breaker Panel Type",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("Polished_SQFT", "Polished SQFT", "", control)}
              {renderShiftSelect(
                "Secure_Storage",
                "Secure Storage?",
                "None",
                control,
                ["Yes", "No"]
              )}
            </Grid>
            <Grid container spacing={2}>
              {renderShiftSelect(
                "Polish_Colors",
                "Polish Colors",
                "None",
                control,
                [
                  "PR Mocha",
                  "PR Light Roast",
                  "PR Espresso",
                  "PR Desert Sand",
                  "PR Amber",
                  "PR Bronze",
                  "PR Georgia Clay",
                  "PR Brown Stone",
                  "PR Rose Quartz",
                  "PR Red Rock",
                  "PR Painted Desert",
                ]
              )}
              {renderMultiTextField(
                "Staging_Load_Unload_Details",
                "Staging/Load/Unload Details",
                "",
                control
              )}
            </Grid>
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Polished_Job_Details	",
                "Polished Job Details",
                "",
                control
              )}
              {renderTextField(
                "Total_Polished_Concrete_LF",
                "Total Polished Concrete LF",
                "",
                control
              )}
            </Grid>
          </Box>
        )}
        {striping && (
          <Box>
            {/* section: polish*/}
            <Typography fontWeight="bold">Striping Job</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Scope_of_Work_Striping",
                "Scope of Work - Striping",
                "",
                control
              )}
              {renderShiftSelect("Type", "Type?", "None", control, [
                "Walkway",
                "Safety Boarder",
                "None",
              ])}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("Striping_SQFT", "Striping SQFT", "", control)}
              {renderShiftSelect("Layout", "Layout?", "None", control, [
                "Solid",
                "Lines",
                "Cross Hatching",
                "None",
              ])}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField(
                "Total_Striping_LF",
                "Total Striping LF",
                "",
                control
              )}
              {renderTextField("Width", "Width?", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Striping_Job_Details",
                "Striping Job Details",
                "",
                control
              )}
              {renderMultiSelect(
                "Striping_Colors",
                "Striping Colors",
                "",
                control,
                ["Yellow", "Green", "Blue", "Red"]
              )}
            </Grid>
          </Box>
        )}
        {other && (
          <Box>
            {/* section: Terrazzo */}
            <Typography fontWeight="bold">Other Concrete Jobs</Typography>
            <br />
            {renderTextField("Other_SQFT", "Other SQFT", "", control)}
            <br />
            {renderTextField("Total_Other_LF", "Total Other LF", "", control)}
            <br />
            {renderMultiTextField(
              "Other_Concrete_Details",
              "Other Concrete Details",
              "",
              control
            )}
          </Box>
        )}
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

const renderDatePicker = (name, label, defaultValue, control) => {
  return (
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
                <div style={{ width: "180px", flexShrink: 0 }}>
                  <label>{label}</label>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disablePast
                    {...field}
                    inputProps={{
                      style: {
                        height: 18,
                      },
                    }}
                    onChange={(newValue) => {
                      field.onChange(dayjs(newValue).format("YYYY-MM-DD"));
                    }}
                    PopperProps={{
                      placement: "right-end",
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "223px" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            )}
          />
        }
      />
    </Grid>
  );
};

const renderMultiSelect = (
  name,
  label,
  defaultValue,
  control,
  items,
  labelWidth = 180
) => {
  return (
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
};
