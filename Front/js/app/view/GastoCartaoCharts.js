google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(GastoCartao);
function GastoCartao() {
  var data = google.visualization.arrayToDataTable([
    ['Banco', 'Gasto cartão'],
    ['Itau',  5000.85],
    ['Nu',  450.66],
    ['Bradesco', 1200.31],
  
  ]);

var options = {
  legend: 'none',
  pieSliceText: 'label',
  title: '',
  pieStartAngle: 50,
};

  var chart = new google.visualization.PieChart(document.getElementById('GastoCartao'));
  chart.draw(data, options);
}