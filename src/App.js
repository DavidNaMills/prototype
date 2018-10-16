import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName: '',
      email: '',
      selectedFile:''
    };
    this.onValueChange=this.onValueChange.bind(this);
    this.fileChangedHandler=this.fileChangedHandler.bind(this);
    this.uploadHandler=this.uploadHandler.bind(this);
  }



  uploadHandler(e){
    e.preventDefault();


    axios.post('Somedomain', {
      headers:{},
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      })
    });    

    const formData = new FormData()
    formData.append('Resume', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('SomeDomain', formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });

  }

  onValueChange(type, val){
    this.setState({[type]:val.target.value});
  }


  fileChangedHandler (event){
    this.setState({selectedFile: event.target.files[0]});
  }


  render() {

    return (
      <div>
        <form>
            <div>
              <label for='firstName'>First Name </label>
              <input type='text' id='firstName' value={this.state.firstName} onChange={(val)=>{this.onValueChange('firstName', val)}} />
            </div>

            <div>
              <label for='lastName'>Last Name </label>
              <input type='text' id='lastName' value={this.state.lastName} onChange={(val)=>{this.onValueChange('lastName', val)}} />
            </div>
            
            <div>
              <label for='email'>Email </label>
              <input type='text' id='email' value={this.state.email} onChange={(val)=>{this.onValueChange('email', val)}} />
            </div>

            <div>
              <label for='resume'>Resume </label>
              <input type='file' resume='resume' accept='.pdf' onChange={(e)=>this.fileChangedHandler(e)}/>
            </div>

            <div>
            <button onClick={(e)=>this.uploadHandler(e)}>Submit</button>
            </div>


        </form>
      </div>
    );
  }
}

export default App;
