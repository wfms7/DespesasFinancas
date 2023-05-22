

  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['bar']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(TotalDegastos);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function TotalDegastos() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    data.addRows([
      ['Jan.', 3500.00],
      ['Fev.', 1859.50],
      ['Mar.', 4200.00],
      ['Abr.', 1000.00],
     
    ]);

    // Set chart options
    var options = {};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.charts.Bar(document.getElementById('totalGasto'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }






