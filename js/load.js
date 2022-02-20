window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
})



const createInnerHtml=()=>
{
    
    let Json=createJson()[1];
    const headerHtml='<thead><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Action</th></thead>';
const innertHtml=`${headerHtml}<tr><td><img src="${Json._profilePic}"></td><td>${Json._name}</td><td>${Json._gender}</td><td>
<label class="dept-label">${getDept(Json._department)}</label></td><td>${Json._salary}</td><td>${Json._startDate}</td><td>
<img src="/assets/create-black-18dp.svg" onclick="update(this)" id="${Json._id}">
<img src="/assets/delete-black-18dp.svg" onclick="remove(this)" id="${Json._id}"></td></tr>`;

document.querySelector("#table").innerHTML=innertHtml;
}
const createJson=()=>
{
    let json=[
        {
        _name:"Noufal",
        _gender:"Male",
        _department:["Hr","IT"],
        _salary:["20000"],
        _startDate:['29 oct 2019'],
        _note:[''],
        _id:new Date().getTime(),
        _profilePic:'/assets/Ellipse -1.png'
    },
    {
        _name:"Jamal",
        _gender:"Male",
        _department:["Hr"],
        _salary:["200000"],
        _startDate:['19 oct 2019'],
        _note:[''],
        _id:new Date().getTime(),
        _profilePic:'/assets/Ellipse -2.png'
    }
]
return json;
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