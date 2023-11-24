import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddNew = ({ api,setRefresh}) =>{
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  
  const [data,setData] = useState({
    name:"",
    total:0,
    months:""
  });

  const Submit = (e) =>{
    e.preventDefault();
    setLoading(true);
    axios.post(`${api}/api/loans/add-new`, data).then((res) =>{
      setLoading(false);
      if (res.data.status) {
        setSuccess(true);
        setRefresh(prev => prev + 1);
        setData({
          name: "",
          total: 0,
          months: ""
        })
        error ? setError(false) : null;
      }
    }).catch((err) =>{
      if (err) {
        setLoading(false);
        setError(err.response.data);
      }
    })
  }

  const onChange = (value,key) =>{

    if (key === "total") {
      // Remove non-numeric and non-dot characters
      let new_price = value.replace(/[^0-9.]/g, '');

      // Remove multiple dots in a row
      new_price = new_price.replace(/(\..*)\./g, '$1');
      value = new_price;

      if (value > 80000) {
        value = 80000;
      }
      
    }

    setData({
      ...data,
      [key]:value
    })
  }

  const Action = () =>{
    if (loading) {
      return <div className="alert alert-info">Loading...</div>
    }

    if (error) {
      return <div className="alert alert-danger">{error}</div>
    }

    if (success) {
      return (
        <div className="alert alert-success">
          Success
          <hr />
          <span style={{cursor:'pointer'}} onClick={() => setSuccess(false)} className="text-primary">Add another loan</span>
        </div>
      )
    }

    return <Button type="submit" variant="outlined" color="primary">Submit</Button>
  }

  return(
    <div>
      <form onSubmit={Submit}>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label" htmlFor="name">Name</label>
            <input required onChange={(e) => onChange(e.currentTarget.value,"name")} value={data.name} className="form-control" type="text" />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="name">Price</label>
            <input required onChange={(e) => onChange(e.currentTarget.value,"total")} value={data.total} className="form-control" type="text" title="Please enter only numbers from 0 to 9"  />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="name">Months</label>
            <select required onChange={(e) => onChange(e.currentTarget.value,"months")} value={data.months} className="form-select">
              <option value="">Select</option>
              {
                [...Array(118)].map((__,index) =>{
                  let start = 3 + index;
                  
                  return(
                    <option key={index} value={start}>{start} м.</option>
                  )
                })
              }
            </select>
          </div>
        </div>

        <div className="col-md-12 mt-4">
          <Action />
        </div>
      </form>
    </div>
  )
}

export default AddNew;