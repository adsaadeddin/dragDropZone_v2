import React, { Component } from 'react';

import './Dropzone.css';
import './App.css';
import logo from './logo.svg';
import Item from './ItemEdit.js'

class Dropzone extends Component {

  constructor(props) {
    super(props);

    this.state = {
      DataStorageFiles: [],
      filesToUpload : [],
      isLoading : false
    };


    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    //ondrop="drop_handler(event);"
    this.onDrop = this.onDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);

  }

  allowDrop(event){
    event.preventDefault();
  }


  onSubmit(event){
    event.preventDefault();
    this.setState({isLoading : true});




    this.setState({
      DataStorageFiles : this.state.DataStorageFiles.concat(this.state.filesToUpload),
      filesToUpload : [],
      isLoading : false});
  }

  onChange(event){

     let nFilesToUpload = this.state.filesToUpload;

     for(var i = 0 ; i < this.fileInput.files.length ; i++ )
     nFilesToUpload.push(this.fileInput.files[i]);

     this.setState({
       files : this.state.files,
       filesToUpload : nFilesToUpload
     });
  }


  onDrop(event) {

    let nFilesToUpload = this.state.filesToUpload;

    event.preventDefault();
    console.log("dropped!");

    console.log(event.dataTransfer.items);
    console.log(event.dataTransfer.files);

    if (event.dataTransfer.items) {

    for (var i = 0; i < event.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (event.dataTransfer.items[i].kind === 'file') {
        nFilesToUpload.push(event.dataTransfer.items[i].getAsFile());

      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      nFilesToUpload.push(event.dataTransfer.files[i].name);
    }
  }

  this.setState({filesToUpload : nFilesToUpload});

}

onEditSubmit(fileNewName,fileName){

console.log('in main! ' + fileNewName);


    let filesToUpload = this.state.filesToUpload.map(item => {
        if(item.name === fileName){
            item.AlternativeName = fileNewName;
        }

        return item;
    });

    this.setState({filesToUpload:filesToUpload});

}




  render() {
    return (
      <div className="Dropzone" >
        <form  onSubmit={this.onSubmit} onDrop={this.onDrop} onDragOver={this.allowDrop}>
            <div className="box__input">
            <label htmlFor="fileselect">Files to upload: </label>
            <input className="box__file" type="file" name="files[]" id="file" multiple onChange={this.onChange}  ref={fileInput => this.fileInput = fileInput} />
            <div id="filedrag">or drop files here</div>
            <button className="box__button">Upload</button>
            </div>
        </form>

            <br />


              {
                this.state.filesToUpload.length > 0 ?
                <div className="fileList">Files to Upload : {
                  this.state.filesToUpload.map(file => {
                    return(<Item
                      key={file.name}
                      file={file}
                      onEditSubmit={this.onEditSubmit} />)
                  })
                    }</div>
                : <br />
              }


          <div className="datamock">
          { this.state.isLoading ? <div><img className="loading" alt="loading"  src={logo} /></div>
          :
            this.state.DataStorageFiles.length > 0 ?
          <div className="fileList">Uploaded Files : {this.state.DataStorageFiles.map(file => {
            return(<li key={file.name}> Name : {file.AlternativeName? file.AlternativeName : file.name} | Type : {file.type}</li>)})}</div>
          : <br />
        }


         </div>
        </div>

    );
  }
}

export default Dropzone;
