//calculate total monthly payments 
function calculateRemaingBalance() { //remaining balance before very first month
    let loanAmount = document.getElementById('loanAmount').value;

    let totalPrincipal = document.getElementById('totalPrincipalResults');

    loanAmount = parseInt(loanAmount);

    if (isNaN(loanAmount)) {
        alert("Numbers only, please!");
    } else {
        let totalPrincipalResults = loanAmount;
        totalPrincipalResults.textContent = totalPrincipal;

        // document.getElementById('totalPrincipalResults').textContent = totalPrincipal.toLocaleString();
    }return totalPrincipal

}

function calculateTotalMonthlyPayments() {

    let loanAmount = document.getElementById('loanAmount').value;
    let interestRate = document.getElementById('interestRate').value;
    let termLength = document.getElementById('termLength').value

    loanAmount = parseInt(loanAmount);
    interestRate = parseInt(interestRate);
    termLength = parseInt(termLength);


    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(interestRate)) {
        alert("Numbers only, please!");
    } else {
        let monthlyPayment = (loanAmount * (interestRate / 1200)) / (1 - ((1 + interestRate / 1200) ** -termLength))
        document.getElementById('yourMonthlyPaymentResults').textContent = Number(monthlyPayment).toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });
        return monthlyPayment;
    }
}



//calculate interest payment
function calculateInterestPayment(remBalance) {
    let loanAmount = document.getElementById('loanAmount').value;
    let interestRate = document.getElementById('interestRate').value;

    loanAmount = parseInt(loanAmount);
    interestRate = parseInt(interestRate);

    if (isNaN(loanAmount) || isNaN(interestRate)) {
        alert("Numbers only, please!");
    } else {
        return remBalance * (interestRate / 1200)
    }
}
//calculating total cost? 
function calculateTotalCost() {
    let loanAmount = document.getElementById('loanAmount').value;
    let interestRate = document.getElementById('interestRate').value;

    let totalCost = loanAmount + interestRate * 1200;
    document.getElementById('totalCostResults').textContent = totalCostResults.toLocaleString("en-US", {
        style: 'currency',
        currency: 'USD',
    });
    return totalCost;


}


//get loan payment schedule by month 
function createPaymentSchedule() {
    let loanAmount = document.getElementById('loanAmount').value;
    let interestRate = document.getElementById('interestRate').value;
    let termLength = document.getElementById('termLength').value

    loanAmount = parseFloat(loanAmount);
    interestRate = parseFloat(interestRate);
    termLength = parseInt(termLength);


    //make table 
    let outputTableBody = document.getElementById('outputTableBody');
    const outputTableRowTemplate = document.getElementById('outputTableRowTemplate');


    //clear table body 
    outputTableBody.innerHTML = '';

    //variables for the monthly payment schedule - start from 0
    let totalMonthlyPayment = calculateTotalMonthlyPayments();
    let remBalance = loanAmount;
    let totalInterest = 0;
    let principalPayment = 0;
    let monthlyInterest = 0;





    //create a for loop to break up into EACH month
    for (month = 1; month <= termLength; month++) {
        monthlyInterest = calculateInterestPayment(remBalance);
        totalInterest += monthlyInterest;
        principalPayment = totalMonthlyPayment - monthlyInterest;
        remBalance = remBalance - principalPayment;



        let monthlyRow = document.importNode(outputTableRowTemplate.content, true);



        let tableCells = monthlyRow.querySelectorAll('td');

        tableCells[0].textContent = month;
        tableCells[1].textContent = totalMonthlyPayment.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });
        tableCells[2].textContent = principalPayment.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });
        tableCells[3].textContent = monthlyInterest.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });
        tableCells[4].textContent = totalInterest.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });
        tableCells[5].textContent = remBalance.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });

        outputTableBody.appendChild(monthlyRow);


    }

     document.getElementById('totalPrincipalResults').textContent = loanAmount.toLocaleString("en-US", {
        style: 'currency',
        currency: 'USD',
    });
    document.getElementById('totalInterestResults').textContent = totalInterest.toLocaleString("en-US", {
        style: 'currency',
        currency: 'USD',
    });
    document.getElementById('totalCostResults').textContent = totalCostResults.toLocaleString("en-US", {
        style: 'currency',
        currency: 'USD',
    });


}

//display the totals
// function displayTotals() {
//     document.getElementById('totalPrincipalResults').textContent = totalPrincipalResults.toLocaleString();
//     document.getElementById('totalInterestResults').textContent = totalInterestResults.toLocaleString();
//     document.getElementById('yourMonthlyPaymentResults').textContent = yourMonthlyPaymentResults.toLocaleString();
//     document.getElementById('totalCostResults').textContent = totalCostResults.toLocaleString();
// }
