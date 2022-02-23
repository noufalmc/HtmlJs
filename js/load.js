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
    for(const Json of Json1)
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
const update=(node)=>
{
    let employeePayroll=JSON.parse(localStorage.getItem('EmployeePayroll'));
   let emp= employeePayroll.find(emp=>emp._id==node.id);
   if(!emp) return;
   let editData=JSON.stringify(emp);
   localStorage.setItem("EditEmp",editData);
   window.location.replace(siteProperties.add_employee);
}
window.addEventListener('DOMContentLoaded',(event)=>
{
    document.querySelector("#name");
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
const checkForUpdate=()=>{
    employeePayrollObj=localStorage.getItem("EditEmp");
    isUpdate=editEmployeePayrollJson ? true : false;
    if(!isUpdate) return;
    setForm(JSON.parse(editEmployeePayrollJson));
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