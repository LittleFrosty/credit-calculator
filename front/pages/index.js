
import { useEffect, useState } from 'react';
import AddNew from '../components/AddNew';
import axios from 'axios';
import ViewLoan from '../components/ViewLoan';
import { Button } from '@mui/material';
const Home = () =>{

  const [loan,setLoan] = useState(false);
  const [refresh,setRefresh] = useState(0);
  const [loans,setLoans] = useState([]);
  let api = process.env.domain;

  useEffect(()=>{
    const GetList = async () =>{
      return axios.get(`${api}/api/loans/all`).then((res) =>{
        if (res.data) {
          setLoans(res.data);
        }
      }).catch((err) =>{
        console.log(err);
      })
    }
    GetList();
  }, [refresh, loan])

  return(
    <div className="container">
      {!loan
        ?
        <>
          <div className="card">
            <div className="card-header bg-white">
              Request for a new loan
            </div>
            <div className="card-body">
              <AddNew api={api} setRefresh={setRefresh} />
            </div>
          </div>
          <hr />
        </>
        : null
      }
      

      {
        loan ? 
        <ViewLoan api={api} setRefresh={setRefresh} loan={loan} setLoan={setLoan} />
        : 
        <div className="card">
          <div className="card-header bg-white">
            List of active loans
          </div>
          <div className="card-body table-responsive">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Months</th>
                  <th scope="col">Monthly payment</th>
                  <th scope="col">Loan Total w/o Interest</th>
                  <th scope="col">Loan Total with 7.9% Interest</th>
                  <th scope="col">Remaining</th>
                  <th scope="col">Pay</th>
                </tr>
              </thead>
              <tbody>
                {
                  loans ? loans.map(loan =>{
                    return(
                      <tr key={loan.id}>
                        <th scope="row">{loan.id}</th>
                        <td>{loan.name}</td>
                        <td>{loan.months}</td>
                        <td>{loan.monthly_pay} лв.</td>
                        <td>{loan.total_original} лв.</td>
                        <td>{loan.total} лв.</td>
                        <td>{loan.remaining} лв.</td>
                        <td>
                          <Button onClick={() => setLoan(loan.id)} variant="outlined" color="primary">Add Payment</Button>
                        </td>
                      </tr>
                    )
                  }) : null
                }
              </tbody>
            </table>
          </div>
        </div>
      }

    </div>
  )
}

export default Home;