import { Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AddPayment from "./AddPayment";

const ViewLoan = ({ loan,setLoan,api }) => {
  const [loading, setLoading] = useState(true);
  const [loanData,setLoanData] = useState(false);
  const [refresh,setRefresh] = useState(0);
  useEffect(()=>{
    if (loan) {
      axios.post(`${api}/api/loans/get-loan`,{id:loan}).then((res) => {
        setLoading(false);
        setLoanData(res.data)
      }).catch((err) => {
        if (err) {
          setLoading(false);
          setError(true);
        }
      })
    }
  }, [loan, refresh])

  if (loading && !loanData) {
    return (
      <div>
        Loading.....
      </div>
    )
  }

  return (
    <div className="card mt-2">
      <div className="card-header bg-white">
        <Button onClick={() => setLoan(false)} variant="outlined" color="primary">Back</Button> Loan: #<b>{loan}</b> , user: <b>{loanData.name}</b> , Total: <b>{loanData.total} лв.</b>, Remaining: <b>{loanData.remaining} лв.</b>, Monthly payment: <b>{loanData.pay_per_month} лв.</b>
      </div>
      <div className="card-body">
        <AddPayment setRefresh={setRefresh} setLoan={setLoan} loanData={loanData} api={api} />
      </div>
    </div>
  )
}

export default ViewLoan;