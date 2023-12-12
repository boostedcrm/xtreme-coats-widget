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

export default function Coating({ setPage }) {
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

  const onSubmit = (data) => {
    console.log("Form data:", data);
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
                  name="vctLvt"
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
                  name="tileGrout"
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
            {renderTextField("JobSiteName", "Job Site Name", "", control)}
            {renderTextField("JobStreetAddress", "Job Street Address", "", control)}
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
          <Typography fontWeight="bold">Coating Jobs</Typography>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField("power", "Power?", false, control)}
            {renderCheckboxField(
              "acceptFootTraffic",
              "What time must the area accept foot traffic?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "distanceToWaterCloset",
              "Distance to Water Closet",
              "",
              control
            )}
            {renderCheckboxField(
              "LightingAvailable",
              "Lighting Available?",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderCheckboxField(
              "SecureStorageOnsite",
              "Secure Storage Onsite?",
              false,
              control
            )}
            {renderTextField(
              "distanceToPower",
              "Distance to Power (if yes)",
              "",
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
            {renderCheckboxField(
              "CoatingRemoval",
              "Coating Removal?",
              false,
              control
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
                "scopeOfWorkTileGrout",
                "Scope of Work Tile & Grout",
                "",
                control
              )}
              {renderTextField("SizeofTile", "Size of Tile", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("TGSQFT", "T&G SQFT", "", control)}
              {renderTextField(
                "ColorSealColor",
                "Color Seal Color",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderCheckboxField(
                "tilesNeedGroutCoatTouchUp",
                "Tiles Need Grout Coat Touch-Up",
                false,
                control
              )}
              {renderTextField(
                "existingColorConditions",
                "Existing Color Conditions",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "T&GJobDetails",
                "T&G Job Details",
                "",
                control
              )}
              {renderShiftSelect(
                "CoatingRemoval",
                "Coating Removal",
                "None",
                control,
                ["Yes", "No", "None"]
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              {renderShiftSelect(
                "CoatingType",
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
                "ScopeofWorkVCTLVT",
                "Scope of Work VCT / LVT",
                "",
                control
              )}
              {renderTextField("VCTLVTSQFT", "VCT / LVT SQFT", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("TGSQFT", "T&G SQFT", "", control)}
              {renderTextField(
                "ColorSealColor",
                "Color Seal Color",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "VCT/LVT Job Details",
                "VCT/LVT Job Details",
                "",
                control
              )}
              {renderShiftSelect(
                "CoatingRemovalVctLvt",
                "Coating Removal (VCT/LVT)",
                "None",
                control,
                ["Yes", "No", "None"]
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              {renderShiftSelect(
                "CoatingTypeVctLvt",
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
                "scopeOfWorkTerrazzo",
                "Scope of Work Terrazzo",
                "",
                control
              )}
              {renderTextField("TerrazzoSQFT", "Terrazzo SQFT", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "TerrazzoJobDetails",
                "Terrazzo Job Details",
                "",
                control
              )}
              {renderShiftSelect(
                "CoatingRemovalTerrazzo",
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
                "CoatingTypeTerrazzo",
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
