import './App.css';
import React , {useState , Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';

class App extends Component
{
    render()
    {
        return (
          < MyEmployeesApp/>
        );
    }
}

class MyEmployeesApp extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            employees:[],
        }
    }

    updateEmployees = (new_employee) =>
    {
        this.setState({
                        employees:[...this.state.employees,new_employee]
                        });
    }

    render()
    {
        return (<div className="container mt-3">
                    <EmployeesForm addEmployee={this.updateEmployees}/>
                    <ListOfEmployees data={this.state.employees}/>
                </div>);
    }
}

let id = 0;

class EmployeesForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            id:0,
            name:"",
            position:"",
            number:"",
        }
        this.adjustPostion = this.adjustPostion.bind(this);
    }

    //to use useState , you either do this :
    adjustName = e =>
    {
        this.setState({name:e.target.value});
    }

    //or this , and if you do this you have to put
    //this.adjustPostion = this.adjustPostion.bind(this);
    //in the constructor
    adjustPostion(e)
    {
        this.setState({position:e.target.value});
    }

    adjustNumber = e =>
    {
        if(document.getElementById('mySwitch').checked)
        {
            this.setState({number:e.target.value});
        }
    }

    add = e =>
    {
        e.preventDefault();

        let obj = {
            "id":++id,
            "name":this.state.name,
            "position":this.state.position,
            "number":document.getElementById('mySwitch').checked?this.state.number:"",
        }
        let el = <Employee data={obj} key={id}/>;

        this.props.addEmployee(el);
        document.getElementById('name').innerHTML="";
        document.getElementById('position').innerHTML ="";
        document.getElementById('number').innerHTML ="";
    }

    render()
    {
        return (<form classNameName="was-validated form-check form-switch container align-items-center justify-content-center" onSubmit={this.add}>
                    <div className="row">
                        <div className="col form-floating mb-3 mt-3">
                          <input type="text" className="form-control" id="name" placeholder="Enter your name" name="name" required onChange={this.adjustName}/>
                          <label htmlFor="name" className="form-label">Your Name</label>
                          <div className="valid-feedback">Valid.</div>
                          <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                        <div className="col form-floating mb-3 mt-3">
                          <input type="text" className="form-control" id="position" placeholder="Enter your position" name="position" required onChange={this.adjustPostion}/>
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
                            <input type="text" className="form-control" id="number" placeholder="Enter your number" name="number" required onChange={this.adjustNumber} disabled/>
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
}

class ListOfEmployees extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let el=<div className="container mt-3 row align-items-center justify-content-center">{this.props.data}</div>;

        return (el);
    }
}

class Employee extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let el;
        if(this.props.data.number=="")
        {
            el=<div className="col-md-4 col-sm-6 m-auto my-1">
                  <div className="card bg-dark text-white">
                    <img className="card-img-top w-100" src="https://picsum.photos/400" alt="Card image" />
                    <div className="card-body">
                        <h4 className="card-title">{this.props.data.name}</h4>
                        <p className="card-text">{this.props.data.position}</p>
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
                  <h4 className="card-title">{this.props.data.name}</h4>
                  <p className="card-text">{this.props.data.position}</p>
                  <p className="card-text">{this.props.data.number}</p>
                  <a href="#" className="btn btn-primary">See Profile</a>
                </div>
              </div>
          </div>;
        }
        return (el);
    }
}

function disables()
{
    document.getElementById('number').disabled= !(document.getElementById('number').disabled);
}

export default App;
