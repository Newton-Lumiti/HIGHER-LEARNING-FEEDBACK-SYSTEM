
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Define the chart data
var feedbackData = [0, 0, 0, 0, 0];

// Pie Chart Example
var ctx = document.getElementById("feedback-chart-canvas");
var feedbackChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [{
      data: feedbackData,
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#dda20b', '#c92017'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

// Add event listeners to rating icons
var ratingIcons = document.querySelectorAll('.feedback-rating i');
ratingIcons.forEach(function(icon) 
{    icon.addEventListener('click', function() {
// Get the selected rating
var rating = icon.getAttribute('data-rating');// Update the active class on rating icons
ratingIcons.forEach(function(icon) {
  if (icon.getAttribute('data-rating') <= rating) {
    icon.classList.add('active');
  } else {
    icon.classList.remove('active');
  }
});

// Update the feedback data array
feedbackData[rating - 1]++;
feedbackChart.update();
});
});

// Add event listener to submit button
var submitButton = document.getElementById('feedback-submit-btn');
submitButton.addEventListener('click', function() {
// TODO: Send feedback data to server and display a success message

// Reset the rating icons and feedback data array
ratingIcons.forEach(function(icon) {
icon.classList.remove('active');
});
feedbackData = [0, 0, 0, 0, 0];
feedbackChart.update();
});
}
// Update the feedback data array
feedbackData[rating - 1]++;
var feedbackCount = feedbackData.reduce(function(acc, val) {
  return acc + val;
}, 0);
var feedbackSum = feedbackData.reduce(function(acc, val, i) {
  return acc + (val * (i + 1));
}, 0);
var averageRating = feedbackSum / feedbackCount;
document.getElementById('feedback-average-rating').textContent = averageRating.toFixed(1);
var progressWidth = (averageRating / 5) * 100;
document.querySelector('.progress-bar').style.width = progressWidth + '%';
document.querySelector('.progress-bar').setAttribute('aria-valuenow', averageRating);
