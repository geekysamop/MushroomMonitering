// Define the API endpoint
var api = 'https://defiant-hare-scarf.cyclic.app/scd';
var api_soil = 'https://defiant-hare-scarf.cyclic.app/soil';
var mux = "mux-1";
var count = "a";
var tempe = "0";

$.get(`${api_soil}/devices`)
    .then(response => {
        response.forEach(devices => {
            count += "a";
            $('#devicelist').append(`
            <script>

            
               const ${count} = document.getElementById('${devices.device}');
               ${count}.addEventListener('click',()=>{
                   mux = "${devices.device}";
               })
            </script>
            <li>
                <button class="devices" id="${devices.device}">${devices.device}</button>
            </li><hr>`

            );
        });
    })


$.get(`${api}/devices`)
    .then(response => {
        response.forEach(devices => {
            if (devices.device === 'SCD-30') {
                const sensorData = devices.sensorData;                                                                      
                const arr = [];
                arr.push(sensorData.map(data => data.temp));
                console.log(arr);
                tempe = arr[arr.length-1];
                var value = tempe[tempe.length - 1]
                console.log(value);
                $('#temprature').append(
                    `${value}°C`
                )
            }
        });
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });

$.get(`${api}/devices`)
    .then(response => {
        response.forEach(devices => {
            if (devices.device === 'SCD-30') {
                const sensorData = devices.sensorData;                                                                      
                const arr = [];
                arr.push(sensorData.map(data => data.co2));
                console.log(arr);
                tempe = arr[arr.length-1];
                var value = tempe[tempe.length - 1]
                console.log(value);
                $('#co2').append(
                    `${value} ppm`
                )
            }
        });
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });

$.get(`${api}/devices`)
    .then(response => {
        response.forEach(devices => {
            if (devices.device === 'SCD-30') {
                const sensorData = devices.sensorData;                                                                      
                const arr = [];
                arr.push(sensorData.map(data => data.hum));
                console.log(arr);
                tempe = arr[arr.length-1];
                var value = tempe[tempe.length - 1]
                console.log(value);
                $('#humidity').append(
                    `${value} %`
                )
            }
        });
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });
$.get(`${api_soil}/devices`)
    .then(response => {
        response.forEach(devices => {
            if (devices.device === 'mux-1') {
                const sensorData = devices.sensorData;                                                                      
                const arr = [];
                arr.push(sensorData.map(data => data.soil));
                console.log(arr);
                tempe = arr[arr.length-1];
                var value = tempe[tempe.length - 1]
                console.log(value);
                $('#soil').append(
                    `${value} %`
                )
            }
        });
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });

const complete = document.getElementById('complete');
complete.addEventListener('click', () => {
    // setInterval(() => {
    drawGraph0_C("SCD-30");
    drawGraph1_C("SCD-30");
    drawGraph2_C("SCD-30");
    drawGraph3_C(mux);
    // }, 10000);
});




const sixhour = document.getElementById('six');
sixhour.addEventListener('click', () => {
    // setInterval(() => {
    const now = new Date();
    const time = new Date(now.getTime() - (6 * 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H(mux, time);
    // }, 10000);
});

const day = document.getElementById('day');
day.addEventListener('click', () => {
    // setInterval(() => {
    const now = new Date();
    const time = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H(mux, time);
    // }, 10000);
});

const week = document.getElementById('week');
week.addEventListener('click', () => {
    // setInterval(() => {
    const now = new Date();
    const time = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H(mux, time);
    // }, 10000);
});

const month = document.getElementById('month');
month.addEventListener('click', () => {
    // setInterval(() => {
    const now = new Date();
    const time = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    drawGraph0_H("SCD-30", time);
    drawGraph1_H("SCD-30", time);
    drawGraph2_H("SCD-30", time);
    drawGraph3_H(mux, time);
    // }, 10000);
});

function drawGraph0_C(name) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const dataPoints = sensorData.map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.temp]); // Use moment-timezone.js to convert to IST
                    const title = sensorData.map(data => data.temp)
                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Temperature'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>Temperature: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Temperature',
                            data: dataPoints
                        }]
                    };
                    Highcharts.chart('container3', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph1_C(name) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const intensities = sensorData.map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.hum]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Humidity'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Humidity'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>Humidity: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Humidity',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container4', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph2_C(name) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const intensities = sensorData.map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.co2]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Co2'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Co2'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>CO2: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Co2',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container2', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph3_C(name) {
    $.get(`${api_soil}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    const intensities = sensorData.map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.soil]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Soil Moisture'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Moisture Level (%)'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>Moisture: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Soil Moisture',
                            data: intensities
                        }]
                    };
                    // Call********************************** the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container5', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph0_H(name, time) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    // Filter the sensorData array to include only the data points from the previous hour
                    const intensities = sensorData
                        .filter(data => moment(data.time).isAfter(moment(time)))
                        .map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.temp]);


                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Temperature'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>Temperature: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Temperature',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container3', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}
function drawGraph1_H(name, time) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    // Filter the sensorData array to include only the data points from the previous hour
                    const intensities = sensorData
                        .filter(data => moment(data.time).isAfter(moment(time)))
                        .map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.hum]);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Humidity'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Humidity'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>Humidity: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Humidity',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container4', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}


function drawGraph2_H(name, time) {
    $.get(`${api}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    // Filter the sensorData array to include only the data points from the previous hour
                    const intensities = sensorData
                        .filter(data => moment(data.time).isAfter(moment(time)))
                        .map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.co2]);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'CO2'
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'CO2'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>CO2: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'CO2',
                            data: intensities
                        }]
                    };
                    // Call the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container2', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function drawGraph3_H(name, time) {

    $.get(`${api_soil}/devices`)
        .then(response => {
            response.forEach(devices => {
                if (devices.device === name) {
                    const sensorData = devices.sensorData;
                    // Filter the sensorData array to include only the data points from the previous hour
                    const intensities = sensorData
                        .filter(data => moment(data.time).isAfter(moment(time)))
                        .map(data => [moment.tz(data.time, 'Asia/Kolkata').valueOf(), data.soil]);

                    const chartOptions = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Soil Moisture '
                        },
                        xAxis: {
                            type: 'datetime',
                            title: {
                                text: 'Time'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Moisture Level (%)'
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return `Time: ${Highcharts.dateFormat('%Y-%m-%d %I:%M:%S %p', this.x)}<br>Moisture: ${this.y}`;
                            }
                        },
                        series: [{
                            name: 'Soil Moisture',
                            data: intensities
                        }]
                    };
                    // Call********************************** the Highcharts function to render the chart using chartOptions
                    Highcharts.chart('container5', chartOptions);
                }
            });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}


// const devices = document.querySelector(".devices");
// devices.addEventListener('click',()=>{
//     console.log("yooo");
//     drawGraph3_C("mux-2");
// })
drawGraph0_C("SCD-30");
drawGraph1_C("SCD-30");
drawGraph2_C("SCD-30");
drawGraph3_C("mux-1");