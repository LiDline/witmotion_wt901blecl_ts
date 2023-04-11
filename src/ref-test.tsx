import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import React, { useRef } from "react";

import { Doughnut } from "react-chartjs-2";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// interface Props {}

// export class App extends Component {
//   private chartReference: React.RefObject;

//   constructor(props: Props) {
//     super(props);

//     this.chartReference = React.createRef();
//     this.state = {
//       name: "React",
//       data: {
//         labels: ["Red", "Green", "Blue"],
//         datasets: [
//           {
//             data: [5, 7, 6],
//             backgroundColor: ["red", "green", "blue"],
//           },
//         ],
//       },
//     };

//     setInterval(() => {
//       const chart = this.chartReference.current?.chartInstance;
//       chart.data.datasets[0].data = [
//         Math.floor(Math.random() * 10) + 1,
//         Math.floor(Math.random() * 10) + 1,
//         Math.floor(Math.random() * 10) + 1
//       ];
//       chart.update();
//     }, 2000);

// this.chartReference.current?.append(document.createElement("button"));
// }

// componentDidMount() {
//   if (this.chartReference.current) {
//     const child = document.createElement("div");
//     this.chartReference.current.appendChild(child);
//   }
// }

// render() {
//   return (
// <>
//   <Box ref={this.chartReference} children="yo" />
// </>
//       <Doughnut ref={this.chartReference} data={this.state.data} />
//     );
//   }
// }

// export function App() {
//   useEffect(() => {
//     if (chartReference.current) {
//       const child = document.createElement("div");
//       chartReference.current.appendChild(child);
//     }
//   });

//   const chartReference = React.createRef<HTMLButtonElement>();
//   return <Box ref={chartReference} children="yo" />;
// }

export const App: React.FC = () => {
  const chartReference = useRef<ChartJSOrUndefined<"doughnut">>(null);
  // const chartReference = React.createRef<ChartJSOrUndefined<"doughnut">>();

  const state = {
    name: "React",
    data: {
      labels: ["Red", "Green", "Blue"],
      datasets: [
        {
          data: [5, 7, 6],
          backgroundColor: ["red", "green", "blue"],
        },
      ],
    },
  };

  setInterval(() => {
    if (chartReference) {
      const chart = chartReference.current;
      if (chart) {
        chart.data.datasets[0].data = chart.data.datasets[0].data.map(
          (val) => val + Math.floor(Math.random() * 10)
        );

        chart.update();
      }
    }
  }, 2000);

  return <Doughnut ref={chartReference} data={state.data} />;
};
