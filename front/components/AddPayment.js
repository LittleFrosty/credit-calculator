import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddPayment = ({ setRefresh,setLoan,api, loanData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [leftOver,setLeftOver] = useState(false);
  const [paymentAmount,setPaymentAmount] = useState(0);

  const Submit = (e) => {
    e.preventDefault();
    setLoading(true);
    let post_data = {
      id: loanData.id,
      paymentAmount: paymentAmount,
    }
    return axios.post(`${api}/api/loans/submit-payment`, post_data).then((res) => {
      setLoading(false);
      if (res.data) {
        setSuccess(true);
        setPaymentAmount(0)
        setRefresh((prev) => prev + 1)

        if (res.data.leftover > 0) {
          setLeftOver(res.data.leftover)
        }

        error ? setError(false) : null;
      }
    }).catch((err) => {
      if (err) {
        setLoading(false);
        setError(true);
      }
    })
  }

  const onChange = (value) => {

    let new_price = value.replace(/[^0-9.]/g, '');
    new_price = new_price.replace(/(\..*)\./g, '$1');
    value = new_price;

    setPaymentAmount(value);
  }

  const Action = () => {
    if (loading) {
      return <div className="alert alert-info">Loading...</div>
    }

    if (error) {
      return <div className="alert alert-danger">Error</div>
    }

    if (success) {
      return (
        <div className="alert alert-success">
          Success
          <hr />
          {
            leftOver ? 
            <div>
              You have overpaid, refund amount {leftOver} лв.
            </div>
            :
            <span style={{ cursor: 'pointer' }} onClick={() => setSuccess(false)} className="text-primary">Place another payment</span>
          }
        </div>
      )
    }

    return <Button type="submit" variant="outlined" color="primary">Submit</Button>
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label" htmlFor="name">Select Loan</label>
            <select required onChange={(e) => setLoan(e.currentTarget.value) } value={loanData.id} className="form-select">
              {
                loanData.related_loans.map((related_loans, index) => {
                  return (
                    <option key={index} value={related_loans.id}>#{related_loans.id} | {related_loans.total_with_interest} лв.</option>
                  )
                })
              }
            </select>
          </div>
          
          <div className="col-md-4">
            <label className="form-label" htmlFor="name">Pay amount / Price</label>
            <input required onChange={(e) => onChange(e.currentTarget.value)} value={paymentAmount} className="form-control" type="text" title="Please enter only numbers from 0 to 9" />
          </div>
        </div>

        <div className="col-md-12 mt-4">
          <Action />
        </div>
      </form>
      <div className="card mt-4">
        <div className="card-header bg-white">
          History
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Paid amount</th>
                <th scope="col">Remaining loan</th>
                <th scope="col">Payment date</th>
              </tr>
            </thead>
            <tbody>
              {
                loanData.payment_history ? loanData.payment_history.map(history => {
                  return (
                    <tr key={history.id}>
                      <th scope="row">{history.id}</th>
                      <td>
                        {history.payment} лв.
                        {(history.refund > 0)
                          ?
                          <>
                            <hr />
                            Refund: <b>{history.refund}</b> лв.
                          </>
                          : null
                        }
                      </td>
                      <td>{history.remaining}  лв.</td>
                      <td>{history.created_at}</td>
                    </tr>
                  )
                }) : null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AddPayment;