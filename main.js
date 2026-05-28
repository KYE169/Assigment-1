function markToGrade() {
    const numberInput = document.getElementById('numberInput');
    const gradeError = document.getElementById('gradeError');
    const gradeOutput = document.getElementById('gradeOutput');

 // reset message
    gradeError.textContent = '';
    gradeOutput.textContent = '';

    const mark = numberInput.value;

    if (mark === '' || mark === null) {
        gradeError.textContent = 'Please enter a mark.';
        return;
    }
    
    if (mark < 0 || mark > 100) {
        gradeError.textContent = 'Mark cannot be negative. Please enter a value between 0 and 100.';
        return;
    }

    let grade;
    if (mark >= 90) {
        grade = 'A';
    }
    else if (mark >= 80) { 
        grade = 'B';
    }
    else if (mark >= 70) { 
        grade = 'C';
    }
    else if (mark >= 60) { 
        grade = 'D';
    }
    else if (mark >= 50) { 
        grade = 'E';
    }
    else {
        grade = 'F';
    }
    

    gradeOutput.textContent = `Your mark is ${mark}/100 - Grade: ${grade}`;
}

let staffData = [];
let currentData = [];
let sortedByName = false;
let sortedBySalary = false;


fetch('staff.txt')
    .then(response => response.text())
    .then(data => {

        const lines = data.replace('var dataSet = [', '').replace('];', '').trim().split('\n');
        
        staffData = lines.map(line => {

            const cleaned = line.replace(/[\[\]"]/g, '').replace(/\//g, '').trim();
            if (!cleaned) return null;
            return cleaned.split(',').map(item => item.trim());
        }).filter(item => item !== null && item.length >= 6);

        currentData = [...staffData];
        displayStaff(currentData);
    })
    .catch(err => console.error("Error loading staff data:", err));


function displayStaff(data) {
    const staffBody = document.getElementById('staffBody');
    staffBody.innerHTML = '';

    data.forEach(staff => {
        const row = document.createElement('tr');
  
        row.innerHTML = `
            <td>${staff[0]}</td>
            <td>${staff[1]}</td>
            <td>${staff[2]}</td>
            <td>${staff[3]}</td>
            <td>${staff[4]}</td>
            <td>${staff[5]}</td>
        `;
        staffBody.appendChild(row);
    });
}


function sortByName() {
    sortedBySalary = false;
    if (sortedByName) {
        currentData.sort((a, b) => b[0].localeCompare(a[0]));
    } else {
        currentData.sort((a, b) => a[0].localeCompare(b[0]));
    }
    sortedByName = !sortedByName;
    displayStaff(currentData);
}

function sortBySalary() {
    sortedByName = false;
    if (sortedBySalary) {
        currentData.sort((a, b) => {
            const salaryA = parseInt(a[5].replace(/[$,]/g, ''));
            const salaryB = parseInt(b[5].replace(/[$,]/g, ''));
            return salaryB - salaryA;
        });
    } else {
        currentData.sort((a, b) => {
            const salaryA = parseInt(a[5].replace(/[$,]/g, ''));
            const salaryB = parseInt(b[5].replace(/[$,]/g, ''));
            return salaryA - salaryB;
        });
    }
    sortedBySalary = !sortedBySalary;
    displayStaff(currentData);
}

function convertTemperature() {
    const tempInput = document.getElementById('tempInput').value;
    const tempUnit = document.getElementById('tempUnit').value;
    const outputDiv = document.getElementById('converterOutput');

    const val = parseFloat(tempInput);

    let c, f, k;

    if (tempUnit === 'C') {
        c = val;
        f = val * 9 / 5 + 32;
        k = val + 273.15
    }
    else if (tempUnit === 'F') {
        f = val;
        c = (val - 32) * 5/9;
        k = (val - 32) * 5/9 + 273.15;
    }

    else if (tempUnit === 'k') {
        k = val;
        c = val - 273.15;
        f = (val - 273.15) * 9/5 + 32;
    }
    converterOutput.textContent = `Celsius = ${c} Fahrenheit = ${f} Kelvin = ${k}`;
}



