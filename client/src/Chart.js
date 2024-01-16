import Chart from 'chart.js/auto';

export const createChart = (message) => {
  if (!message.message) {
    return;
  }
  const labelsData = message.message.map(({ x, y, z }) => {
    return {
      x,
      y,
      // r: Math.abs(z * 2)
      r: 20
    }
  });

  const labelsSorted = message.message.slice().sort((a, b) => a.z - b.z);
  const minZ = labelsSorted[0].z, maxZ = labelsSorted[labelsSorted.length - 1].z;
  ['gradMinValue', 'gradMaxValue'].forEach(el => {
    document.getElementById(el).innerText = el === 'gradMinValue' ? minZ : maxZ;
  });
  const labelsColors  = message.message?.map(({ z }) => {
    return getColorForZ(z, minZ, maxZ);
  });


  return new Chart(
    document.getElementById('myChart'),
    {
      type: 'bubble',
      data: {
        datasets: [{
          data: labelsData.reverse(),
          backgroundColor: labelsColors.reverse(),
          label: 'Chart',
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
