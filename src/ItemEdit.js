import React, { Component } from 'react';

class Item extends Component {

  constructor(props) {
    super(props);

    this.state={
      isEdit : false
    };

    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  onEdit() {
    this.setState({isEdit : true});
  }
  onEditSubmit(event){
    event.preventDefault();
    let {file, onEditSubmit} = this.props;
    onEditSubmit(this.nameInput.value,file.name);
    this.setState({isEdit : false});
  }


  render() {
    let {file} = this.props;

    return (
      <div>
      {
        this.state.isEdit
        ?(
            <form onSubmit={this.onEditSubmit}>
            <input type="text" placeholder="Name" ref={nameInput => this.nameInput = nameInput} defaultValue={file.name} />
            <button>Save</button>
            </form>
          )

        : (
          <il>
            <span>{file.AlternativeName? file.AlternativeName : file.name}</span>
            {` | `}
            <span>{file.type}</span>
            {` | `}
            <button onClick={this.onEdit}> Edit </button>
          </il>
        )
      }

      </div>
    );
  }
}

export default Item;
