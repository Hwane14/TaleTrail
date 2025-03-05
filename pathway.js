document.addEventListener('DOMContentLoaded', () => {
    // some manual logs for testing
    const logData = [
        { date: '2025-03-01', pagesRead: 10, timeSpent: 30 },
        { date: '2025-03-02', pagesRead: 20, timeSpent: 45 },
        { date: '2025-03-03', pagesRead: 15, timeSpent: 60 },
        { date: '2025-03-04', pagesRead: 25, timeSpent: 50 },
        { date: '2025-03-05', pagesRead: 30, timeSpent: 70 },
        { date: '2025-03-06', pagesRead: 10, timeSpent: 20 },
        { date: '2025-03-07', pagesRead: 5, timeSpent: 10 }
    ]

    let cumulativePages = 0
    let cumulativeTime = 0
    const labels = []
    const pagesReadData = []
    const timeSpentData = []
   
    //makes the graph accumulative 
    logData.forEach(entry => {
        cumulativePages += entry.pagesRead
        cumulativeTime += entry.timeSpent

        labels.push(entry.date);
        pagesReadData.push(cumulativePages)
        timeSpentData.push(cumulativeTime)
    });
    //First graph
    const pagesReadCtx = document.getElementById('pagesReadChart').getContext('2d')
    new Chart(pagesReadCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Pages Read',
                data: pagesReadData,
                borderColor: 'rgba(39, 164, 217, 1)',
                backgroundColor: 'rgba(39, 164, 217, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },//scales
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Pages Read'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
    //Second graph
    const timeSpentCtx = document.getElementById('timeSpentChart').getContext('2d')
    new Chart(timeSpentCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Time Spent (minutes)',
                data: timeSpentData,
                borderColor: 'rgba(198, 0, 0, 1)',
                backgroundColor: 'rgba(198, 0, 0, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {//scales
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Time Spent (minutes)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
});
