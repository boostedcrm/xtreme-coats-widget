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

export default function Coating({
  setPage,
  dealData,
  ZOHO,
  setSnackbarMessage,
  setSeverity,
  setOpenSnackbar,
  setZohoLoadede,
}) {
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
      Entity: "Coating_Bid_Checklists",
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
        Type of Bid / Coating
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* {renderCheckboxField("Terrazzo", "Terrazzo", false, control)} */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Controller
                  name="Terrazzo"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>Terrazzo</label>
                      </div>
                      <Checkbox
                        {...field}
                        onChange={(e) => handleTerrazoChange(e.target.checked)}
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
                  name="VCT_LVT"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>VCT & LVT</label>
                      </div>
                      <Checkbox
                        {...field}
                        onChange={(e) => handleLvtChange(e.target.checked)}
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
                  name="Tile_Grout"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>Tile & Grout</label>
                      </div>
                      <Checkbox
                        {...field}
                        onChange={(e) => handleTileChange(e.target.checked)}
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
        <Box>
          <br />
          <Box>
            <Typography fontWeight="bold">
              Coating Bid Checklist Information
            </Typography>
            <br />
            <br />

            <Grid container spacing={2}>
              {renderDatePicker("Create_Date", "Create Date", null, control)}
              {renderTextField(
                "Name",
                "Coating - Bid Checklist Name",
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
              "Power_Availability_Location",
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
              "Where_to_access_building",
              "Where to access building?",
              "",
              control
            )}
            {renderTextField("Level_Floor", "Level/Floor", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "Measure_Door_Frames_for_Entry",
              "Measure Door Frames for Entry",
              "",
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
          {/* section: Coating Jobs */}
          <Typography fontWeight="bold">Coating Jobs</Typography>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect("Power", "Power?", "None", control, [
              "Yes",
              "No",
              "None",
            ])}
            {renderTextField(
              "What_time_must_the_area_accept_foot_traffic",
              "What time must the area accept foot traffic?",
              "",
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "Distance_to_Water_Closet",
              "Distance to Water Closet",
              "",
              control
            )}
            {renderShiftSelect(
              "Lighting_Available",
              "Lighting Available?",
              "None",
              control,
              ["Yes", "No", "None"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "Secure_Storage_Onsite",
              "Secure Storage Onsite?",
              "None",
              control,
              ["Yes", "No", "None"]
            )}
            {renderTextField(
              "Distance_to_Power_if_yes",
              "Distance to Power (if yes)",
              "",
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
            {renderShiftSelect(
              "Coating_Removal",
              "Coating Removal?",
              "None",
              control,
              ["Yes", "No", "None"]
            )}
          </Grid>
          <br />
        </Box>
        {tile && (
          <Box>
            {/* section: Tile & Grout */}
            <Typography fontWeight="bold">Tile & Grout</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Scope_of_Work_Tile_Grout",
                "Scope of Work Tile & Grout",
                "",
                control
              )}
              {renderTextField("Size_of_Tile", "Size of Tile", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("T_G_SQFT", "T&G SQFT", "", control)}
              {renderTextField(
                "Color_Seal_Color",
                "Color Seal Color",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderCheckboxField(
                "Tiles_Need_Grout_Coat_Touch_Up",
                "Tiles Need Grout Coat Touch-Up",
                false,
                control
              )}
              {renderTextField(
                "Existing_Color_Conditions",
                "Existing Color Conditions",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "T&T_G_Job_Details",
                "T&G Job Details",
                "",
                control
              )}
              {renderShiftSelect(
                "Coating_Removal",
                "Coating Removal",
                "None",
                control,
                ["Yes", "No", "None"]
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              {renderShiftSelect(
                "Coating_Type",
                "Coating Type",
                "None",
                control,
                ["Wax", "Adsil", "XGen", "Icon", "Unknown", "None"]
              )}
            </Grid>
          </Box>
        )}
        {lvt && (
          <Box>
            {/* section: VCT / LVT*/}
            <Typography fontWeight="bold">VCT / LVT</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Scope_of_Work_VCT_LVT",
                "Scope of Work VCT / LVT",
                "",
                control
              )}
              {renderTextField("VCT_LVT_SQFT", "VCT / LVT SQFT", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("T_G_SQFT", "T&G SQFT", "", control)}
              {renderTextField(
                "Color_Seal_Color",
                "Color Seal Color",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "VCT_LVT_Job_Details",
                "VCT/LVT Job Details",
                "",
                control
              )}
              {renderShiftSelect(
                "Coating_Removal_VCT_LVT",
                "Coating Removal (VCT/LVT)",
                "None",
                control,
                ["Yes", "No", "None"]
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              {renderShiftSelect(
                "Coating_Type_VCT_LVT",
                "Coating Type (VCT/LVT)",
                "None",
                control,
                ["Wax", "Adsil", "XGen", "Icon", "Unknown", "None"]
              )}
            </Grid>
          </Box>
        )}
        {terrazo && (
          <Box>
            {/* section: Terrazzo */}
            <Typography fontWeight="bold">Terrazzo</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Scope_of_Work_Terrazzo",
                "Scope of Work Terrazzo",
                "",
                control
              )}
              {renderTextField("Terrazzo_SQFT", "Terrazzo SQFT", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "Terrazzo_Job_Details",
                "Terrazzo Job Details",
                "",
                control
              )}
              {renderShiftSelect(
                "Coating_Removal_Terrazzo",
                "Coating Removal (Terrazzo)",
                "None",
                control,
                ["Yes", "No", "None"]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              {renderShiftSelect(
                "Coating_Type_Terrazzo",
                "Coating Type (Terrazzo)",
                "None",
                control,
                ["Wax", "XGen", "Icon", "Unknown", "None"]
              )}
            </Grid>
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
