let isUpdate=false;
let employeePayrollObj={};
window.addEventListener('DOMContentLoaded',(event)=>{
    employeePayroll=
    createInnerHtml();
// localStorage.removeItem('EmployeePayroll');
})



const createInnerHtml=()=>
{
    
    let Json1=createJson();
    if(Json1.length===0) return;
    document.querySelector("#table-count").textContent=Json1.length;
    const headerHtml='<thead><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Action</th></thead>';
let innertHtml=`${headerHtml}`;
    for(let Json of Json1)
    {

    innertHtml=`${innertHtml}<tr><td><img src="${Json['_profilepic']}"></td><td>${Json._name}</td><td>${Json._gender}</td><td>
<label class="dept-label">${getDept(Json._department)}</label></td><td>${Json._salary}</td><td>${stringify(Json._startDate)}</td><td>
<img src="/assets/create-black-18dp.svg" onclick="update(this)" id="${Json._id}">
<img src="/assets/delete-black-18dp.svg" onclick="remove(this)" id="${Json._id}"></td></tr>`;
    }
document.querySelector("#table").innerHTML=innertHtml;
}
const createJson=()=>
{
    return localStorage.getItem("EmployeePayroll") ? JSON.parse(localStorage.getItem('EmployeePayroll')):[];
}
const getDept=(list)=>
{
    let dept='';
    for(const x of list)
    {
        dept=`${dept} ${x}`;
    }
    return dept;
}
const remove=(node)=>
{
    let employeePayroll=JSON.parse(localStorage.getItem('EmployeePayroll'));
    let mapdata=employeePayroll.find(emplList=>emplList._id==node.id);
    const index=employeePayroll.map(emp=>emp._id).indexOf(mapdata._id);
    employeePayroll.splice(index,1);
    localStorage.setItem("EmployeePayroll",JSON.stringify(employeePayroll));
    createInnerHtml();
}
window.addEventListener('DOMContentLoaded',(event)=>
{
   let editDate=document.querySelector("#date1");
        editDate.addEventListener('input',function(){
            let startDate=getInputValue("#day")+' '+getInputValue("#month")+' '+getInputValue("#year");
            let error=document.querySelector(".error-date");
            try
            {
                alert(new Date(Date.parse(startDate)));
                new EmployeePayrollData().startDate=new Date(Date.parse(startDate));
                error.textContent='';
                
            }catch(e)
            {
                alert(e);
                error.textContent=e;
            }

        });

    const name = document.querySelector("#name");
        const error = document.querySelector('.error-output');
        name.addEventListener('input', function () {
            if (name.value.length == 0) {
                error.textContent = '';
                return;
            }
            try
            {
                (new EmployeePayrollData()).name=name.value;
                error.textContent = '';
            }catch(e)
            {
                error.textContent =e;
            }
        })

        
        const salary=document.querySelector("#salary");
        const range=document.querySelector(".salary");
        salary.addEventListener('input',function(){
            range.textContent=salary.value;
        })
        checkForUpdate();  
})
const update=(node)=>
{
    let employeePayroll=JSON.parse(localStorage.getItem('EmployeePayroll'));
   let emp= employeePayroll.find(emp=>emp._id==node.id);
   if(!emp) return;
   let editData=JSON.stringify(emp);
   localStorage.setItem("EditEmp",editData);
   window.location.replace(siteProperties.add_employee);
}

const checkForUpdate=()=>{
  let employeePayrollJson=localStorage.getItem("EditEmp");
    isUpdate=employeePayrollJson ? true : false;
    if(!isUpdate) return;
    setForm(JSON.parse(employeePayrollJson));
}
const setForm=(editEmployeeList)=>
{
    setValue('#name',editEmployeeList._name);
    setGroupValue('[name=profile]',editEmployeeList._profilepic);
    setGroupValue('[name=gender]',editEmployeeList._gender);
    setGroupValue('[id=department]',editEmployeeList._department);
    setValue('#salary',editEmployeeList._salary);
    const range=document.querySelector(".salary");
    range.innerText=editEmployeeList._salary;
    let date=stringify(editEmployeeList._startDate).split(' ');
    setValue("#day",date[0]);
    setValue("#month",date[1]);
    setValue("#year",date[2]);
    setValue("#notes",editEmployeeList._employeeNotes);
}
const setValue=(id,value)=>
{
    document.querySelector(id).value=value;
}
const setGroupValue=(name,value)=>
{
    let allItems=document.querySelectorAll(name);
    allItems.forEach(items=>{
        if(Array.isArray(value))
        {
            if(value.includes(items.value))
            {
                items.checked=true;
            }
        }
        else if(items.value===value)
        {
            name.checked=true;
        }
    })
}
const save = () => {
  
    try
    {  
        setEmployeePayrollObj();
        createAndUpdateJson();
        resetForm();
        window.location.replace(siteProperties.home_page);

    }catch(e)
    {
        alert(e);
        return;
    }
}
const setEmployeePayrollObj=()=>
{
   

    if(localStorage.getItem("EditEmp")!=null)
    {
        let editInfo=JSON.parse(localStorage.getItem("EditEmp"));
        employeePayrollObj._id=editInfo._id;
    }
    employeePayrollObj._name =getInputValue('#name');
    employeePayrollObj._profilePic =getSelectedvalues('[name=profile]');
    employeePayrollObj._gender = getSelectedvalues('[name=gender]');
    employeePayrollObj._department = getSelectedvalues('[id=department]');
    employeePayrollObj._salary = getInputValue('#salary');
    employeePayrollObj._employeeNotes = getInputValue('#notes');
            let date = getInputValue('#day') + ' ' +
                getInputValue('#month') + ' ' + getInputValue('#year');
                employeePayrollObj._startDate=stringify(date);
                
}

function createAndUpdateJson() {
    let employeePayroll = JSON.parse(localStorage.getItem("EmployeePayroll"));
    if (employeePayroll) {
        let editInfo=employeePayroll.find(empList=>empList._id==employeePayrollObj._id); 
        if(!editInfo)
        {
            employeePayroll.push(createEmployeePayrollData());
        }
        else
        {
            
            let index1=employeePayroll.map(emp=>emp._id).indexOf(editInfo._id);
            employeePayroll.splice(index1,1,createEmployeePayrollData(editInfo._id));
        }
    }
    else {
        employeePayroll = [createEmployeePayrollData()]
    }

    localStorage.setItem("EmployeePayroll", JSON.stringify(employeePayroll));
}
const createEmployeePayroll = (employeePayrollData) => {

        try {
            employeePayrollData.name = employeePayrollObj._name;
           
        }catch(e)
        {
            setValue(".error-output",e);
            throw e; 
        }
            employeePayrollData.profilePic =employeePayrollObj._profilePic;
            employeePayrollData.gender = employeePayrollObj._gender;
            employeePayrollData.department = employeePayrollObj._department;
            employeePayrollData.salary =employeePayrollObj._salary;
            employeePayrollData.employeeNotes =employeePayrollObj._employeeNotes;
            employeePayrollData.startDate=employeePayrollObj._startDate;
            alert(employeePayrollData.toString());
            
        

    }
 const createEmployeePayrollData=(id)=>
 {
     let emp=new EmployeePayrollData();
     if(!id) emp.id=createNewEmpId();
     else emp.id=id;
      createEmployeePayroll(emp);
      localStorage.removeItem('EditEmp');
    return emp;
     
 }
 const createNewEmpId=()=>
 {
    let EmpId=localStorage.getItem("EmployeeId");
    EmpId= !EmpId ? 1: (parseInt(EmpId)+1).toString();
    localStorage.setItem("EmployeeId",parseInt(EmpId)+1);
    return EmpId;
 }
 const resetForm = () => {
    unsetvalue('#name', '');
    unsetGroupInput('[name=profile]');
    unsetGroupInput('[name=gender]');
    unsetGroupInput('[id=department]');
    unsetvalue('#salary', '');
    unsetvalue('#notes', '');
    unsetValueIndex('#day',0);
    unsetValueIndex('#month',0);
    unsetValueIndex('#year', 0);
}
const unsetValueIndex=(id,index)=>
{
    const element=document.querySelector(id);
    element.selectedIndex=index;
}
const unsetGroupInput = (value) => {
    let items = document.querySelectorAll(value);
    items.forEach(item => {
        item.checked = false;
    })
}
const unsetvalue = (id, value) => {
    document.querySelector(id).value = value;
}