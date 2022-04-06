import { useState, useEffect } from 'react';
import {
    Box,
    HStack
} from "@chakra-ui/react"
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts';
const PortfolioForecast = () => {

    const state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };


    return (
        <Box>
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="400"
            />
        </Box>
    )
}

export default PortfolioForecast