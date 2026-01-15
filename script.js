// Load Google Charts
google.charts.load('current', { packages: ['corechart'] });

// When charts library is ready
google.charts.setOnLoadCallback(function() {
    // Attach event listener to button
    const btn = document.getElementById('calculateBtn');
    btn.addEventListener('click', function() {

        // Read values from inputs
        let transport = Number(document.getElementById('transport').value) || 0;
        let food = document.getElementById('food').value;
        let ac = Number(document.getElementById('ac').value) || 0;
        let water = Number(document.getElementById('water').value) || 0;

        // Calculate emissions (simple factors)
        let transportCO2 = transport * 0.21;
        let foodCO2 = (food === 'veg') ? 1.5 : 3.3;
        let acCO2 = ac * 1.2;
        let waterCO2 = water * 0.04;

        let total = transportCO2 + foodCO2 + acCO2 + waterCO2;

        // Display total
        document.getElementById('result').innerText =
            'Your total carbon footprint: ' + total.toFixed(2) + ' kg CO₂';

        // Find the biggest contributor
        let max = Math.max(transportCO2, foodCO2, acCO2, waterCO2);
        let suggestion = '';
        if (max === transportCO2) suggestion = 'Try using public transport, walking, or cycling.';
        else if (max === foodCO2) suggestion = 'Consider eating more vegetarian meals.';
        else if (max === acCO2) suggestion = 'Reduce AC usage to save electricity.';
        else if (max === waterCO2) suggestion = 'Take shorter showers to save water.';

        document.getElementById('suggestion').innerText = suggestion;

        // Draw chart
        drawChart(transportCO2, foodCO2, acCO2, waterCO2);
    });
});

// Function to draw Google Pie Chart
function drawChart(transport, food, ac, water) {
    var data = google.visualization.arrayToDataTable([
        ['Activity', 'CO₂ Emissions'],
        ['Transport', transport],
        ['Food', food],
        ['Electricity', ac],
        ['Water', water]
    ]);

    var options = {
        title: 'Carbon Footprint Breakdown',
        pieHole: 0.4,
        colors: ['#43a047', '#81c784', '#c8e6c9', '#a5d6a7']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
}
