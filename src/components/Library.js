import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import COFFEE_DATA_IMPORT from '../data/coffee_analysis.csv';

export function Library() {
    const [coffeeData, setCoffeeData] = useState([]);
  
    // This import function was found online
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(COFFEE_DATA_IMPORT);
        const result = await response.text();
        setCoffeeData(Papa.parse(result, { header: true, dynamicTyping: true }).data);
      };
  
      fetchData();
    }, []);
  
    console.log(coffeeData);
  
    return (
      <div>
        {/* Render your data here */}
      </div>
    );
  }