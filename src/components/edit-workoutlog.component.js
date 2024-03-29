import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditeWorkoutLog extends Component {
  constructor(props) {
    super(props);

    this.onChangeWorkoutDate = this.onChangeWorkoutDate.bind(this);
    this.onChangeRoutineName = this.onChangeRoutineName.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      workoutdate: new Date(),
      routinename: '',
      routines: [],
      duration: 0,
      username: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('https://workout-backend-714h.onrender.com/workoutlogs/'+this.props.match.params.id)
    .then(response => {
      this.setState({
        workoutdate: new Date(response.data.workoutdate),
        routinename: response.data.routinename,
        duration: response.data.duration,
        username: response.data.username,
      })   
    })
    .catch(function (error) {
      console.log(error);
    })

    axios.get('https://workout-backend-714h.onrender.com/users/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get('https://workout-backend-714h.onrender.com/routines/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          routines: response.data.map(routine => routine.routinename),
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeWorkoutDate(date) {
    this.setState({
      workoutdate: date
    });
  }

  onChangeRoutineName(e) {
    this.setState({
      routinename: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const workoutlog = {
      workoutdate: new Date(this.state.workoutdate),
      routinename: this.state.routinename,
      duration: this.state.duration,
      username: this.state.username,
    };
  
    console.log(workoutlog);

    axios.post('https://workout-backend-714h.onrender.com/workoutlogs/update/' + this.props.match.params.id, workoutlog)
    .then(res => console.log(res.data)); 
    console.log('Workout Log Updated!');   
    
    window.location = '/workout';

  }

  render() {
    return (
      <div>
        <h3>Edit Workout</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Workout Date: </label>
            <div>
              <DatePicker
                selected={this.state.workoutdate}
                onChange={this.onChangeWorkoutDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
              />
            </div>
          </div>
        <div className="form-group"> 
            <label>Routine Name: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.routinename}
                onChange={this.onChangeRoutineName}>
                {
                  this.state.routines.map(function(routine) {
                    return <option 
                      key={routine}
                      value={routine}>{routine}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Edit Workout" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}