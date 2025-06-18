import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import AutocompleteUI from "radar-sdk-js/dist/ui/autocomplete";
const AutoCompleteLocation = ({
  setLocation,
  customPlaceholder
}: {
  setLocation: Dispatch<SetStateAction<any>>;
  customPlaceholder?: string;
}) => {
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_PUBLISHABLE_KEY as string);

    const container = document.getElementById("autocomplete");
    if (container) {
      autocompleteRef.current = Radar.ui.autocomplete({
        container: "autocomplete",
        width: "100%",
        onSelection: (address) => {
          setLocation(address);
        },
        placeholder: customPlaceholder ?? "Pick your city ...",
        
      });
    }

    return () => {
      autocompleteRef.current?.remove();
    };
  }, []);
  return <div id="autocomplete" className="w-full my-4" />;
};

export default AutoCompleteLocation;
