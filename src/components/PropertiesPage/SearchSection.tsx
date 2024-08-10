import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PropertiesListCard from "./PropertiesListCard";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProperties } from "../../redux/SearchBox/SearchSlice";

const SearchSection = ({ searchQuery ,filterproperty}) => {
  const {
    budgetRange,
    propertyType,
    area,
    city,
    properties,
    searchOption,
    isPropertyLoading,
  } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  // Extract complex expressions
  const minPrice = budgetRange[0];
  const maxPrice = budgetRange[1];
  const minArea = area[0];
  const maxArea = area[1];
  console.log("filterproperties");
  console.log(filterproperty)
  console.log(searchQuery)
  useEffect(() => {
    const filters = {
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      City: city,
      PropertyType: propertyType,
      url: `http://localhost:5000/api/propertyPurpose?query=${searchQuery}`
    };
    
}, [dispatch, minPrice, maxPrice, minArea, maxArea, city, propertyType, searchQuery]);
    


  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontSize: "20px",
          lineHeight: "28px",
          fontWeight: 600,
          color: "#091E42",
          fontFamily: "Open Sans",
        }}
      >
        {filterproperty.length} results | Property for " {searchQuery} " in{" "}
        {city.address === undefined ? "India" : city.address}
      </Typography>

      {isPropertyLoading ? (
        <CircularProgress />
      ) : (
        filterproperty.map((property) => (
          <React.Fragment key={property.propertyId}>
            <PropertiesListCard key={property.id}property={property}  />
          </React.Fragment>
        ))
      )}
    </Box>
  );
};

export default SearchSection;
