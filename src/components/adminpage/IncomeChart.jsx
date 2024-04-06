import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const IncomeChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: '營收趨勢',
          data: [1000, 2000, 1500, 3000, 2500, 4000, 3500], // 这里替换成你的实际数据
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    return () => {
      chartInstanceRef.current.destroy();
    };
  }, []); // 移除 chart 和 chartRef 作為依賴
  
  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default IncomeChart;