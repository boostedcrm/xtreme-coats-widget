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

export default function Concrete({ setPage }) {
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

  const onSubmit = (data) => {
    console.log("Form data:", data);
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
                  name="Proxy"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexShrink: 0, width: 170 }}>
                        <label>Proxy</label>
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
          {/* section: Concrete Jobs */}
          <Typography fontWeight="bold">Concrete - Jobs</Typography>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "ExistingFloorCovering",
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
            )}
            {renderShiftSelect(
              "ExistingConditions",
              "Existing Conditions",
              "None",
              control,
              ["Poor", "Fair", "Good", "Great"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "ConcreteHardness",
              "Concrete Hardness",
              "None",
              control,
              ["Hard", "Medium", "Soft", "Extra Soft"]
            )}
            {renderShiftSelect(
              "Structuralissues?",
              "Structural issues?",
              "None",
              control,
              ["Yes", "No"]
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "MoistureIssues??",
              "Moisture Issues?",
              "None",
              control,
              ["Yes", "No"]
            )}
            {renderCheckboxField(
              "CuringCompoundRemoval",
              "Curing Compound Removal",
              false,
              control
            )}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "GeneratorRequired?",
              "Generator Required?",
              "None",
              control,
              ["Yes", "No"]
            )}
            {renderShiftSelect("GrinderType", "Grinder Type", "None", control, [
              "Propane",
              "Electric",
            ])}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect("Lighting", "Lighting?", "None", control, [
              "Yes",
              "No",
            ])}
            {renderTextField("JointFillLF", "Joint Fill LF", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderTextField(
              "DistancetoPower",
              "Distance to Power",
              "",
              control
            )}
            {renderTextField("CrackChasingLF", "Crack Chasing LF", "", control)}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderShiftSelect(
              "DebrisDisposalOnsite",
              "Debris Disposal Onsite?",
              "None",
              control,
              ["Yes", "No"]
            )}
            {renderShiftSelect("GroutCoat", "Grout Coat", "None", control, [
              "Yes",
              "No",
            ])}
          </Grid>
          <br />
          <Grid container spacing={2}>
            {renderMultiTextField(
              "ConcreteJobDetails",
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
            <Typography fontWeight="bold">Epoxy Jobs</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "scopeOfWorkTileEproxy",
                "Scope of Work - Epoxy",
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
        {polish && (
          <Box>
            {/* section: polish*/}
            <Typography fontWeight="bold">Polished Jobs</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "ScopeofWorkPolish",
                "Scope of Work - Polish",
                "",
                control
              )}
              {renderShiftSelect(
                "FinishLevel",
                "Finish Level",
                "None",
                control,
                ["400", "800", "1500", "3000"]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderShiftSelect("Stain", "Stain", "None", control, [
                "Yes",
                "No",
              ])}
              {renderShiftSelect(
                "PowerOnsite",
                "Power Onsite?",
                "None",
                control,
                ["Yes", "No"]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderShiftSelect(
                "JointsFilled",
                "Joints Filled?",
                "None",
                control,
                ["Yes", "No"]
              )}
              {renderTextField(
                "BreakerPanelType",
                "Breaker Panel Type",
                "",
                control
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("PolishedSQFT", "Polished SQFT", "", control)}
              {renderShiftSelect(
                "SecureStorage?",
                "Secure Storage?",
                "None",
                control,
                ["Yes", "No"]
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {renderShiftSelect(
                  "PolishColors",
                  "Polish Colors",
                  "None",
                  control,
                  ["PR MOCHA", "PR Light Roast"]
                )}
              </Grid>
              <Grid item xs={6}>
                {renderMultiTextField(
                  "stagingDetails",
                  "Staging/Load/Unload Details",
                  "",
                  control
                )}
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "PolishedJobDetails",
                "Polished Job Details",
                "",
                control
              )}
              {renderTextField(
                "TotalPolishedConcreteLF",
                "Total Polished Concrete LF",
                "",
                control
              )}
            </Grid>
          </Box>
        )}
        {striping && (
          <Box>
            {/* section: Striping Job */}
            <Typography fontWeight="bold">Striping Job</Typography>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "scopeOfWorkStriping",
                "Scope of Work - Striping",
                "",
                control
              )}
              {renderShiftSelect("Type", "Type?", "None", control, [
                "Walkway",
                "Safety Boarder",
              ])}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField("StripingSQFT", "Striping SQFT", "", control)}
              {renderShiftSelect("Layout", "Layout?", "None", control, [
                "Solid",
                "Lines",
                "Cross Hatching",
              ])}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderTextField(
                "TotalStripingLF",
                "Total Striping LF",
                "",
                control
              )}
              {renderTextField("width", "Width?", "", control)}
            </Grid>
            <br />
            <Grid container spacing={2}>
              {renderMultiTextField(
                "StripingJobDetails",
                "Striping Job Details",
                "",
                control
              )}
              {renderShiftSelect(
                "StripingColors",
                "Striping Colors",
                "None",
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
            {renderTextField("OtherSQFT", "Other SQFT", "", control)}
            <br />
            {renderTextField("TotalOtherLF", "Total Other LF", "", control)}
            <br />
            {renderMultiTextField(
              "OtherConcreteDetails",
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
