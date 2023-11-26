import Chart from 'chart.js/auto'

export const createChart = () => {
  const data = {
    labels: ['1', '2', '3'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3],
      },
      {
        label: 'Dataset 2',
        data: [4,5,6],
      }
    ]
  };

  return new Chart(
    document.getElementById('myChart'),
    {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      },
    }
  );

}
