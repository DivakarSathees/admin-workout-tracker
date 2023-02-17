import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.gender}</td>
    <td>{props.exercise.age}</td>
    <td>{props.exercise.height}</td>
    <td>{props.exercise.weight}</td>
    <td>{props.exercise.bmi}</td>
    <td>{props.exercise.bmr}</td>
    <td>{props.exercise.bmiCategory}</td>

    {/* <td>
      <Link to={"/exercise/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
      super(props);
  
    //   this.deleteExercise = this.deleteExercise.bind(this)
      this.state = {exercises: []};
    }
  
    componentDidMount() {
      axios.get('https://workout-backend-714h.onrender.com/userdetails/')
        .then(response => {
          this.setState({ exercises: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }
    
      render() {
        return (
          <div>
            <h3>Users</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>User Name</th>
                  <th>gender</th>
                  <th>Age</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>bmi</th>
                  <th>bmr</th>
                  <th>bmiCategory</th>
                </tr>
              </thead>
              <tbody>
                { this.exerciseList() }
              </tbody>
            </table>
          </div>
        )
      }
    }
    