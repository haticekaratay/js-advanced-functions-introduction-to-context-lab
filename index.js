function createEmployeeRecord([firstName,familyName,title,payRate]){
    return{
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payRate,
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(allEmployees){
    return allEmployees.map(createEmployeeRecord)
};
function createTimeInEvent(employeeObject,time){
    //let employeeObject = createEmployeeRecord(employeeInfo)
    let hour = time.split(" ")[1]
    let date = time.split(" ")[0]
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employeeObject;
};

function createTimeOutEvent(employeeObject,time){
   //let employeeObject = createEmployeeRecord(employeeInfo)
   let hour = time.split(" ")[1]
   let date = time.split(" ")[0]
   employeeObject.timeOutEvents.push({
       type: "TimeOut",
       date: date,
       hour: parseInt(hour)
   })
   return employeeObject;
};

function hoursWorkedOnDate(employeeObject,date){
    let timeIn = employeeObject.timeInEvents.find(timeIn=>timeIn.date === date).hour
    let timeOut = employeeObject.timeOutEvents.find(timeOut=>timeOut.date === date).hour
    return (timeOut- timeIn)/100
};

function wagesEarnedOnDate(employeeObject,date){
    return hoursWorkedOnDate(employeeObject,date) * employeeObject.payPerHour
};

function allWagesFor(employeeObject){
   return employeeObject.timeOutEvents.reduce((sum,timeOutEvent) => sum + wagesEarnedOnDate(employeeObject,timeOutEvent.date),0)
};

function calculatePayroll(employees){
    return employees.reduce((sum,employee) => sum + allWagesFor(employee),0)
};

function findEmployeeByFirstName(employeesArray,name){
   return employeesArray.find(employee => employee.firstName === name);
}