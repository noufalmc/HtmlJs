/**
 * Author :Noufal mc
 * Date   :13-Feb-2022
 * Employee Payroll
 */
class EmployeePayrollData {



    //getter
    get name() {
        return this._name;
    }
    //setter
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$')
        if (nameRegex.test(name))
            this._name = name;
        else
            throw "Name is Incorrect";
    }
    set id(id) {
        let nameRegex = RegExp('^[1-9]$')
        if (nameRegex.test(id))
            this._id = id;
        else
            throw "Id is Invalid";
    }
    get id() {
        return this._id;
    }
    set salary(salary) {
        let nameRegex = RegExp('^[1-9]{1}[0-9]{3,}$')
        if (nameRegex.test(salary))
            this._salary = salary;
        else
            throw "Salary Is Inavlid";
    }
    get salary() {
        return this._salary;
    }
    set gender(gender) {
        let nameRegex = RegExp('^[F,M]{1}')
        if (nameRegex.test(gender))
            this._gender = gender;
        else
            throw "Gender Is Inavlid";
    }
    get gender() {
        return this._gender;
    }
    set startDate(startDate) {
        let now=new Date();
        startDate=new Date(startDate);
        if(now<startDate) throw "Future Date";
        let d=Math.abs(now.getTime()-startDate.getTime());
        if((d/1000*60*60*24)>30) throw "Start Date Is Beyond 30 Days"
        this._startDate = startDate;
    }
    get startDate() {
        return this._startDate;
    }
    set department(department) {
        this._department = department;
    }
    get department() {
        return this._department;
    }
    set employeeNotes(employeeNotes) {
        this._employeeNotes = employeeNotes;
    }
    get employeeNotes() {
        return this._employeeNotes;
    }
    set profilePic(profilePic) {
        this._profilepic = profilePic;
    }
    get profilePic() {
        return this._profilepic;
    }
    toString() {

        return "\n Id => " + this.id + " Name =>" + this.name +
            " Salary =>" + this.salary + " Gender => " + this.gender + " Start date =>" + this._startDate +
            "Department =>" + this._department + "Employee Notes =>" + this._employeeNotes + "Profile Pic =>" + this._profilepic;
    }
}
