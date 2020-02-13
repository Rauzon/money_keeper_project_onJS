'use strict';


let btnStart = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    daybudgetValue = document.getElementsByClassName("daybudget-value")[0],
    monthsavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalexpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0],
    expensesItem = document.getElementsByClassName("expenses-item"),
    btnOptionalexpenses = document.getElementsByTagName("button"),
    btnCountBudget = document.getElementsByTagName('button')[2],
    optionalExpenses = document.querySelectorAll(".optionalexpenses-item"),
    chooseExpenses = document.querySelector(".choose-expenses"),
    countBudget = document.querySelector(".count-budget"),
    chooseIncome = document.querySelector(".choose-income"),
    savings = document.querySelector("#savings"),
    sumValue = document.querySelector("#sum"),
    percentValue = document.querySelector("#percent"),
    start = document.querySelector("start"),
    yearValue = document.querySelector(".year-value"), 
    monthValue = document.querySelector(".month-value"),  
	dayValue = document.querySelector(".day-value");
	


let money,time;

btnStart.addEventListener('click', function() {
	btnOptionalexpenses[0].removeAttribute('disabled','false');
	btnOptionalexpenses[1].removeAttribute('disabled','false');
	btnCountBudget.removeAttribute('disabled','false');


	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt("Ваш бюджет на месяц?", '');

	while(isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDay();

});

btnOptionalexpenses[0].addEventListener('click', function() {

	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
	
		let	a = expensesItem[i].value,
			b = expensesItem[++i].value;
	
		if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null 
		   && a != '' && b != '' && a.length < 50) {
			
			appData.expenses[a] = b;
			sum += +b;

		}	else {
				
				i--;
	
		}
	}
	expensesValue.textContent = sum;
	appData.budget = appData.budget - sum;

});

btnOptionalexpenses[1].addEventListener('click', function() {
	for(let i = 0; i < optionalExpenses.length; i++){
		let optExpense = optionalExpenses[i].value;

		appData.optionalExpenses[i] = optExpense;
		optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});


btnCountBudget.addEventListener('click', function() {

	if(appData.budget != undefined) {
		appData.PerDay = ((appData.budget)/30).toFixed();
		daybudgetValue.textContent = appData.PerDay;

		if (appData.PerDay < 100) {
			levelValue.textContent = "Низкий уровень достатка";
		} else if (100 < appData.PerDay < 200) {
			levelValue.textContent = "Средний уровень достатка";
		} else if (appData.PerDay < 200) {
			levelValue.textContent = "Высокий уровень достатка";
		} else {
			console.log("Произошла ошибка");
		}
	}	else {
		levelValue.textContent = "Произошла ошибка!";
	}

});

chooseIncome.addEventListener('change', function() {

	let items = chooseIncome.value;
	appData.income = items.split(", ");
	incomeValue.textContent = appData.income;

});

savings.addEventListener('click', function() {

	if(appData.savings == false){
		appData.savings = true;
	} else {
		appData.savings = false;
		}
});

sumValue.addEventListener('input', function() {

	if(appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.mounthIncome = sum*(percent/100)/12;
		appData.yearIncome = sum*(percent/100);

		monthsavingsValue.textContent = appData.mounthIncome.toFixed(1);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
	}

});

percentValue.addEventListener('input', function() {

	if(appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.mounthIncome = sum*(percent/100)/12;
		appData.yearIncome = sum*(percent/100);

		monthsavingsValue.textContent = appData.mounthIncome.toFixed(1);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
	}

});


let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	mounthIncome : {},
	timeData: time,
	savings: false, // связано с checkSavings();
	optionalExpenses: {},
	ChooseExpenses :  {},
	ChooseOptExpenses : {},
	detectDayBudget : {},
	detectLevel :  {},
};