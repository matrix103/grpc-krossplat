import Chart from 'chart.js/auto';

export const createChart = (message) => {
  if (!message.message) {
    return;
  }
  const labelsData = message.message.map(({ x, y }) => {
    return { x, y }
  });
  const labelsSorted = message.message.sort((a, b) => a.z - b.z);
  const minZ = labelsSorted[0].z, maxZ = labelsSorted[labelsSorted.length - 1].z;
  const labelsColors  = message.message?.map(({ z }) => {
    return getColorForZ(z, minZ, maxZ);
  });


  return new Chart(
    document.getElementById('myChart'),
    {
      type: 'bubble',
      data: {
        datasets: [{
          data: labelsData,
          backgroundColor: labelsColors,
          label: 'Bubble Chart',
        }]
      },
    }
  );

}

function getColorForZ(z, minZ, maxZ) {
  const blueHex = 0x0000FF;
  const redHex = 0xFF0000;

  const interpolatedColor = interpolateColor(blueHex, redHex, z, minZ, maxZ);
  return '#' + interpolatedColor.toString(16);
}

function interpolateColor(color1, color2, value, minValue, maxValue) {
  const percent = (value - minValue) / (maxValue - minValue);
  return Math.round(color1 + percent * (color2 - color1));
}
