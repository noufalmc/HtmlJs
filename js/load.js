window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
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
    innertHtml=`${innertHtml}<tr><td><img src="${Json._profilePic}"></td><td>${Json._name}</td><td>${Json._gender}</td><td>
<label class="dept-label">${getDept(Json._department)}</label></td><td>${Json._salary}</td><td>${Json._startDate}</td><td>
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