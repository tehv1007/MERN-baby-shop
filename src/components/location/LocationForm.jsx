import Select from "react-select";
import useLocationForm from "./useLocation";

const LocationForm = ({ setSubData, subData }) => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  return (
    <div className="mb-4 flex flex-col gap-1">
      <Select
        required
        name="cityId"
        key={`cityId_${selectedCity?.value}`}
        isDisabled={cityOptions.length === 0}
        options={cityOptions}
        onChange={(option) => {
          onCitySelect(option);
          setSubData({ ...subData, city: option.label });
        }}
        placeholder="City"
        defaultValue={selectedCity}
      />

      <Select
        required
        name="districtId"
        key={`districtId_${selectedDistrict?.value}`}
        isDisabled={districtOptions.length === 0}
        options={districtOptions}
        onChange={(option) => {
          onDistrictSelect(option);
          setSubData({ ...subData, district: option.label });
        }}
        placeholder="District"
        defaultValue={selectedDistrict}
      />

      <Select
        required
        name="wardId"
        key={`wardId_${selectedWard?.value}`}
        isDisabled={wardOptions.length === 0}
        options={wardOptions}
        placeholder="Ward"
        onChange={(option) => {
          onWardSelect(option);
          setSubData({ ...subData, ward: option.label });
        }}
        defaultValue={selectedWard}
      />
    </div>
  );
};

export default LocationForm;
