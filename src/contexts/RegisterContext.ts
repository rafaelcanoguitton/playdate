import React from "react";

const initialPersonalInfoState = {
  gender: [],
  preferences: [],
  topics: [],
};

const PersonalInfoWrapper = (component?: React.Component) => ({
    ...initialPersonalInfoState,
    
});
