import React, { Component } from "react";
import { burl } from '../axios'

export default class recruitment extends Component {
  state = {}
  
  _submit_form = e => {
    e.preventDefault()
    const form = e.target

    // check validity
    const validity = form.checkValidity()
    console.log({validity})

    if(!validity){
      form.classList.add('show_invalid')
      this.setState({
        errmsg: 'Please fill all the fields!'
      })
      return
    }else{
      form.classList.remove('show_invalid')
    }

    // send the recuritment data
    var data = new FormData();
    var request = new XMLHttpRequest();
    const formdata = this.state.formdata
    
    for(const x in formdata){
      data.append(x,formdata[x])
    }

    data.append('passport_photo',this.passport_photo.files[0])
    data.append('resume',this.resumefile.files[0])

    request.responseType = 'json';
    request.open('post', burl + 'api/recuritment/');
    request.send(data);
    
    // event listeners
    request.addEventListener('load', (e) => {
      alert("We will get back to you soon!")
      this.props.history.push('/')
    })

    request.addEventListener('abort', (e) => {
      alert('Please try again after sometime or contact via email!')
    })
  }
  
  _input_change = e => {
    if(e.target.type==='file'){
      return
    }
    
    this.setState({
      formdata: {
        ...this.state.formdata,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const errmsg_html = <div className="my-3 text-center text-danger">{this.state.errmsg}</div>
    

    return (
      <div className='recruitment p-5'>
        <div className="container p-5 white">
          <form onSubmit={this._submit_form}>
            <h1 className=" text-center">Recruitment Form</h1>
            <p className="mt-2 cite text-center text-muted mb-5">Lets us know about you!</p>
            
            {errmsg_html}

            <div className="form-group">
              <div className="row">
                <div className="col-md-3">
                  <label>Name:</label>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-4"><input onChange={this._input_change} type="text" required minLength='1' name='firstname' placeholder='First name' className="form-control"/></div>
                    <div className="col-4"><input onChange={this._input_change} type="text" required minLength='1' name='middlename' placeholder='Middle name' className="form-control"/></div>
                    <div className="col-4"><input onChange={this._input_change} type="text" required minLength='1' name='lastname' placeholder='Last name' className="form-control"/></div>
                  </div>
                </div>
              </div>
            </div>
            
 
             <div className="row">
               <div className="col-md-3">
               <label>Gender</label>
               </div>
               <div className="col-md-9 form-inline">
                   <div className="mr-4 form-check">
                       <input className="form-check-input" onChange={this._input_change} required type="radio" name="gender" value="male"/>
                       <label className="form-check-label">
                           Male
                       </label>    
                   </div>
                   <div className="form-check">
                       <input className="form-check-input" onChange={this._input_change} required type="radio" name="gender" value="female"/>
                       <label className="form-check-label">
                           Female
                       </label>    
                   </div>
               </div>
             </div>


             <div className="row mt-3">
               <div className="col-md-3">
                 <label >Phone no.</label>
               </div>
               <div className="col-md-9">
                 <input type="phone" required minLength='10' onChange={this._input_change} name='phone' className="form-control" placeholder="Phone no."/>
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >Email</label>
               </div>
               <div className="col-md-9">
                 <input type="email" required onChange={this._input_change} name='email' className="form-control" placeholder="Email"/>
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >Address</label>
               </div>
               <div className="col-md-9">
                 <textarea type="text" onChange={this._input_change}  name='address' required minLength='10' rows='3' className="form-control" placeholder="Address"/>
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >District</label>
               </div>
               <div className="col-md-9">
                 <input type="text" required minLength='1' onChange={this._input_change}  name='district' className="form-control" placeholder="District"/>
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >State</label>
               </div>
               <div className="col-md-9">
                 <input type="text" required minLength='1' onChange={this._input_change}  name='state' className="form-control" placeholder="State"/>
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >Nationality</label>
               </div>
               <div className="col-md-9">
                 <input type="text" required minLength='1' className="form-control" onChange={this._input_change}  name='nationality' placeholder="Nationality"/>
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >Pincode</label>
               </div>
               <div className="col-md-9">
                 <input type="text" required minLength='1' className="form-control" onChange={this._input_change} name='pincode' placeholder="Pincode"/>
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >Passport Photo</label>
               </div>
               <div className="col-md-9">
                 <input type="file" required className="form-control" ref={ele=>this.passport_photo = ele} onChange={this._input_change} name='passport_photo' accept="image/x-png,image/gif,image/jpeg" />
               </div>
             </div>

             <div className="row mt-3">
               <div className="col-md-3">
                 <label >Resume pdf</label>
               </div>
               <div className="col-md-9">
                 <input type="file" onChange={this._input_change} ref={ele=>this.resumefile = ele} name='resume' required className="form-control" accept="application/pdf"/>
               </div>
             </div>

            <div className="text-center mt-5">
              <input type="submit" className='btn btn-primary' onSubmit={this._submit_form} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
