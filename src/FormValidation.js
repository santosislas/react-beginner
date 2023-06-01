import React, { Component } from 'react';

class FormValidation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      feedback: '',
      acceptedTerms: false,
      validationErrors: {},
      submitted: 0
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }

  handleOnChange(e) {
    const target = e.target
    const name = target.name
    const value = (
      target.type === 'text'
      ? target.value
      : target.checked // !this.state.acceptedTerms
    )

    this.setState({
      [name]: value
    })
  }

  handleOnSubmit(e) {
    e.preventDefault()
    const isValidForm = this.validateFields()

    if(isValidForm){
        this.setState({
            submitted: this.state.submitted + 1
        })
    }
  }

  validateFields(){
    
    const {
        firstName,
        feedback,
        acceptedTerms
   } = this.state

   const errors = {}

   if(!firstName){
    errors['firstName'] = 'First Name cannot be empty'
   }

   if(!feedback){
    errors['feedback'] = 'Feedback cannot be empty'
   }
   
   if(!acceptedTerms){
    errors['acceptedTerms'] = 'Please accept terms'
   }

   this.setState({
    validationErrors : errors
   })

   return Object.keys(errors).length === 0

  }

  render() {
    return (
      <>
      <section>
        <h3>Form Submit events:</h3>
        <form onSubmit={this.handleOnSubmit}>
          <label>
            <span class="error">{this.state.validationErrors.firstName}</span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleOnChange}
            />
          </label>

          <label>
          <span class="error">{this.state.validationErrors.feedback}</span>
            <input
              type="text"
              name="feedback"
              placeholder="Feedback"
              value={this.state.feedback}
              onChange={this.handleOnChange}
            />
          </label>

          <label>
          <span class="error">{this.state.validationErrors.acceptedTerms}</span>
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={this.state.acceptedTerms}
              onChange={this.handleOnChange}
            /> I accept the terms
          </label>

          <button type="submit">Submit</button>

          <p>Submitted {this.state.submitted} times!</p>
        </form>
      </section>
      </>
    )
  }
}

export default FormValidation;