import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

export const useBookSearch = (initialText?: string) => {
  const [searchText, setSearchText] = useState(initialText ?? "");
  const [triggeredEnterPress, setTriggeredEnterPress] = useState(initialText ?? "");
  const { keycloak } = useKeycloak();

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchText.trim() && event.key === "Enter") {
      if (!keycloak.authenticated) return;
      setTriggeredEnterPress(searchText.trim());
    }
  };

  return {
    searchText,
    handleSearchTextChange,
    handleSearchEnterPress,
    setSearchText,
    triggeredEnterPress,
  };
};
