import './App.css';
import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';


function App() {
  return (
    < MyEmployeesApp/>
  );
}

function MyEmployeesApp()
{
    const [employees, setEmployee] = useState([]);

    function updateEmployees(new_employee)
    {
        setEmployee([...employees,new_employee]);
    }

    return (<div className="container mt-3">
                <EmployeesForm addEmployee={updateEmployees}/>
                <ListOfEmployees data={employees}/>
            </div>);
}

let id = 0;

function EmployeesForm(props)
{
    const[name,setName] = useState("");
    const[position,setPosition] = useState("");
    const[number,setNumber] = useState("");

    function adjustName(e)
    {
        setName(e.target.value);
    }

    function adjustPostion(e)
    {
        setPosition(e.target.value);
    }

    function adjustNumber(e)
    {
        if(document.getElementById('mySwitch').checked)
        {
            setNumber(e.target.value);
        }
    }

    function add(e)
    {
        let obj = {
            "id":++id,
            "name":name,
            "position":position,
            "number":document.getElementById('mySwitch').checked?number:"",
        }
        let el = <Employee data={obj} key={id}/>;

        props.addEmployee(el);
        document.getElementById('name').innerHTML="";
        document.getElementById('position').innerHTML ="";
        document.getElementById('number').innerHTML ="";

        e.preventDefault();
    }

    return (<form classNameName="was-validated form-check form-switch container align-items-center justify-content-center" onSubmit={add}>
                <div className="row">
                    <div className="col form-floating mb-3 mt-3">
                      <input type="text" className="form-control" id="name" placeholder="Enter your name" name="name" required onChange={adjustName}/>
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="col form-floating mb-3 mt-3">
                      <input type="text" className="form-control" id="position" placeholder="Enter your position" name="position" required onChange={adjustPostion}/>
                      <label htmlFor="position" className="form-label">Your position</label>
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-3">
                      <input className="form-check-input mx-auto" type="checkbox" id="mySwitch" name="darkmode" value="yes" onChange={disables}/>
                      <label className="form-check-label mx-auto" htmlFor="mySwitch">I have a phone number</label>
                    </div>
                    <div className="col form-floating mb-3 mt-3">
                        <input type="text" className="form-control" id="number" placeholder="Enter your number" name="number" required onChange={adjustNumber} disabled/>
                        <label htmlFor="number" className="form-label">Your number</label>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-grid">
                        <button type="submit" className="btn btn-dark btn-block btn-lg">Add Employee</button>
                    </div>
                </div>
            </form>);
}

function ListOfEmployees(props)
{
    let el=<div className="container mt-3 row align-items-center justify-content-center">{props.data}</div>;

    return (el);
}

function Employee(props)
{
    let el;
    if(props.data.number=="")
    {
        el=<div className="col-md-4 col-sm-6 m-auto my-1">
              <div className="card bg-dark text-white">
                <img className="card-img-top w-100" src="https://picsum.photos/400" alt="Card image" />
                <div className="card-body">
                    <h4 className="card-title">{props.data.name}</h4>
                    <p className="card-text">{props.data.position}</p>
                    <p className="card-text text-dark">.</p>
                  <a href="#" className="btn btn-primary">See Profile</a>
                </div>
              </div>
          </div>;
    }
    else
    {
        el=<div className="col-md-4 col-sm-6 m-auto my-1">
          <div className="card">
            <img className="card-img-top w-100" src="https://picsum.photos/400" alt="Card image"/>
            <div className="card-body">
              <h4 className="card-title">{props.data.name}</h4>
              <p className="card-text">{props.data.position}</p>
              <p className="card-text">{props.data.number}</p>
              <a href="#" className="btn btn-primary">See Profile</a>
            </div>
          </div>
      </div>;
    }
    return (el);
}

function disables()
{
    document.getElementById('number').disabled= !(document.getElementById('number').disabled);
}

export default App;
