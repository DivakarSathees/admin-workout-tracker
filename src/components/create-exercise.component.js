import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.onChangeWorkoutDate = this.onChangeWorkoutDate.bind(this);

    this.onChangeExercisename = this.onChangeExercisename.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDiscription = this.onChangeDiscription.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      workoutdate: new Date(),
        exercisename: '',
        type: 'Repetition',
        category: 'Strength',
        discription: '',
        progressionId: '',
        userId: '',
        users: []
    }
  }

  componentDidMount() {
    axios.get('https://workout-backend-714h.onrender.com/userdetails/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => ({'username': user.username, 'userid': user.userid})),
          userName: response.data.username,
          userId: response.data[0].userid
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeWorkoutDate(e) {
    this.setState({
      workoutdate: e.target.value
    });
  }

  onChangeExercisename(e) {
    this.setState({
        exercisename: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
        type: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
        category: e.target.value
    });
  }

  onChangeDiscription(e) {
    this.setState({
        discription: e.target.value
    });
  }

  onChangeUserId(e) {
    this.setState({
        userId: e.target.value
    });
  }
  // onChangeUsers(e) {
  //   this.setState({
  //       users: e.target.value
  //   });
  // }

  onSubmit(e) {
    e.preventDefault();
  
    const exercise = {
      workoutdate: this.state.workoutdate,
      exercisename: this.state.exercisename,
      type: this.state.type,
      category: this.state.category,
      discription: this.state.discription,
      progressionId: this.state.progressionId,
      userId: this.state.userId, 
    };
  console.log(this.state.workoutdate)
    console.log(exercise);

    axios.post('https://workout-backend-714h.onrender.com/exercises/add', exercise)
      .then(res => console.log(res.data));
    
    window.location = '/exercise';
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Workout Date: </label>
            <div>
              {/* <DatePicker
                selected={this.state.workoutdate}
                onChange={this.onChangeWorkoutDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="LLL"
              /> */}
              <input 
              type="date"
              required
              className="form-control"
              selected={this.state.workoutdate}
              // value={this.state.workoutdate}
              onChange={this.onChangeWorkoutDate}
              />
            </div>
          </div>
          <div className="form-group"> 
            <label>Exercise Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.exercisename}
                onChange={this.onChangeExercisename}
                />
          </div>
          <div className="form-group">
            <label>Type: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.type}
                onChange={this.onChangeType}>
                    <option value="Repetition">Repetition</option>
                    <option value="Duration">Duration</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.category}
                onChange={this.onChangeCategory}>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Mobility">Mobility</option>
                    <option value="Others">Others</option>  
            </select>
          </div>          
          <div className="form-group">
            <label>Discription: </label>
            <input 
                type="textarea" 
                className="form-control"
                value={this.state.discription}
                onChange={this.onChangeDiscription}
                />
          </div>
          <div className="form-group">
            <label>User: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.userId}
                onChange={this.onChangeUserId}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user.username}
                      value={user.userid}>{user.username}
                      </option>;
                  })
                }  
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Exercise" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}