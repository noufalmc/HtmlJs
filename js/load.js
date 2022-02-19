window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
})



const createInnerHtml=()=>
{
    const headerHtml='<thead><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Action</th></thead>';
innertHtml=`${headerHtml}<tr><td><img src="/assets/Ellipse -1.png"></td><td>Sangeetha</td><td>Female</td><td>
<label class="dept-label">Hr,Sales</label></td><td>10000</td><td>29 Oct 2020</td><td>
<img src="/assets/create-black-18dp.svg" onclick="update(this)" id="1">
<img src="/assets/delete-black-18dp.svg" onclick="remove(this)" id="1"></td></tr>`;
        alert(innertHtml);
document.querySelector("#table").innerHTML=innertHtml;
}