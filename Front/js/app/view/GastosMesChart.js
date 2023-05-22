google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(GastosMes);

function GastosMes() {
  var data = google.visualization.arrayToDataTable([
    ['Mes', 'Gasto'],
    ['jan.',  5000.00      ],
    ['fev.',  2756.00      ],
    ['mar.',  4500.52       ],
    ['abr.',  1200.00]
  ]);

  var options = {
    title: '',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('GastosMes'));

  chart.draw(data, options);
}