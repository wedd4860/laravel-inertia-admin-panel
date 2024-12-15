import { csv } from "d3";
import { useEffect, useState } from "react";

export const useDataFromCSV = (csvUrl, parsFunc) => {
    const [csvData, setCsvData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const row = parsFunc;
        await csv(csvUrl, row).then(setCsvData);
      };
  
      fetchData();
    }, []);
  
    return csvData;
  };
  