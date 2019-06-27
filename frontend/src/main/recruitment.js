import React, { Component } from "react";

export default class recruitment extends Component {
  render() {
    return (
      <div className='recruitment'>
        <div className="container white">
          <form className='my-5'>
              <h1 className="mt-5 text-center">Recruitment Form</h1>
              <h3 className="mt-2 cite text-center">Lets us know about you!</h3>
              <div className="form-group">
                <label>Name:</label>
                <div className="row">
                <div className="col-4"><input type="text" placeholder='First name' className="form-control"/></div>
                <div className="col-4"><input type="text" placeholder='Middle name' className="form-control"/></div>
                <div className="col-4"><input type="text" placeholder='Last name' className="form-control"/></div>
                </div>
              </div>
            
            <div className="form-inline">
                <label>Gender</label>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="gender" value="male"/>
                    <label class="form-check-label">
                        Male
                    </label>    
                </div>
                <div class="ml-4 form-check">
                    <input class="form-check-input" type="radio" name="gender" value="female"/>
                    <label class="form-check-label">
                        Female
                    </label>    
                </div>
            </div>

            <div class="form-group mt-2">
                <label >Phone no.</label>
                <input type="phone" class="form-control" placeholder="Phone no."/>
            </div>

            <div class="form-group mt-2">
                <label >Email</label>
                <input type="phone" class="form-control" placeholder="Email"/>
            </div>

            <div class="form-group mt-2">
                <label >Address</label>
                <textarea type="text" rows='3' class="form-control" placeholder="Address"/>
            </div>

            <div class="form-group mt-2">
                <label >District</label>
                <input type="text" class="form-control" placeholder="District"/>
            </div>

            <div class="form-group mt-2">
                <label >State</label>
                <input type="text" class="form-control" placeholder="State"/>
            </div>

            <div class="form-group mt-2">
                <label >Nationality</label>
                <input type="text" class="form-control" placeholder="Nationality"/>
            </div>

            <div class="form-group mt-2">
                <label >Pincode</label>
                <input type="text" class="form-control" placeholder="Pincode"/>
            </div>

            <div class="form-group mt-2">
                <label >Passport Photo</label>
                <input type="file"  class="form-control" accept="image/x-png,image/gif,image/jpeg" />
            </div>

            <div class="form-group mt-2">
                <label >Resume pdf</label>
                <input type="file"  class="form-control" accept="application/pdf"/>
            </div>

            <div className="text-center">
              <button className="btn btn-primary mx-2">Submit</button>
              <button className="btn btn-danger mx-2">Reset</button>
            </div>
            
          </form>
        </div>
      </div>
    );
  }
}
