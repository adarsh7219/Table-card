import { useEffect, useState } from 'react'
import axios from 'axios';
let url = "https://jsonplaceholder.typicode.com/users"
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";
// "https://jsonplaceholder.typicode.com/users"
import './App.css'

function App() {
  const [data, setdata] = useState([])
  const [value, setvalue] = useState("")
  const [sortvalue, setsortvalue] = useState("")
  // const [currentPage, setcurrentPage] = useState(0)
  // const [pageLimit] = useState(4);




  const sortoption = ["name", "email", "address", "phone", "zipcode"];


  useEffect(() => {
    // start, end, increase

    async function loaduserdata() {

      let response = await axios.get(url)
      console.log(response.data)
      setdata(response.data)
      setcurrentPage(currentPage + increase);


    }
    loaduserdata(0, 4, 0)


  }, [])


  const handleRest = () => {
    loaduserdata(0, 4, 0)


  }

  const handelsort = async (e) => {
    let value = e.target.value;
    setsortvalue(value)
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users?_sort=${value}&_order=asc`)
      .then((response) => {
        setdata(response.data)

      })
      .catch((error) => console.log(error))







  }

  const handlesearch = async (e) => {
    e.preventDefault()
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users?q=${value}`)
      .then((response) => {
        setdata(response.data)
        setvalue("")
      })
      .catch((error) => console.log(error))







  }



  const handlefilter = async (value) => {

    return await axios
      .get(`https://jsonplaceholder.typicode.com/users?lat=${value}`)
      .then((response) => {
        setdata(response.data)

      })
      .catch((error) => console.log(error))







  }


 

return (
  <>

    <MDBContainer>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"
      }}




        className='d-flex input-group w-auto'
        onSubmit={handlesearch}

      >

        <input


          type="text"

          className='form-control'
          placeholder='Search Name....'
          value={value}
          onChange={(e) => setvalue(e.target.value)}


        />


        <MDBBtn type='submit' color='dark'>Search</MDBBtn>
        <MDBBtn className='mx-2' color='info' onClick={() => handleRest()}>Reset</MDBBtn>



      </form>

      <div style={{ marginTop: "100px" }}>
        <h1 className='text-center'>Search Filter Sort And Pasignation using  Json fake Api</h1>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>NO </th>
                  <th scope='col'>Name </th>
                  <th scope='col'>Email </th>
                  <th scope='col'>Phone </th>
                  <th scope='col'>Address </th>
                  <th scope='col'> Zipcode</th>

                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className='align-center mb-0'>
                  <tr>
                    <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                  </tr>

                </MDBTableBody>
              ) : (

                data.map((data, index) => (



                  <MDBTableBody key={index}>
                    <tr>
                      <th scope='row' >{index + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.address.city}</td>
                      <td>{data.address.zipcode}</td>






                    </tr>

                  </MDBTableBody>
                ))

              )}
            </MDBTable>

          </MDBCol>
        </MDBRow>
        {/* <div style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "250px",
          alignContent: "center"

        }}>{rednderpagenation()}</div> */}


      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort By:</h5>
          <select style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            onChange={handelsort}
            value={sortvalue}


          >

            <option >please Select value</option>
            {sortoption.map((item, index) => (
              <option value={item} key={index}>{item} </option>

            ))}

          </select>
        </MDBCol>
        <MDBCol size="4"><h5>Filter By Status</h5>

          <MDBBtnGroup>
            <MDBBtn color='success' onClick={() => handlefilter("Active")}>Active</MDBBtn>
            <MDBBtn color='danger' style={{ marginLeft: "2px" }} onClick={() => handlefilter("InActive")}>

              InActive

            </MDBBtn>

          </MDBBtnGroup>

        </MDBCol>

      </MDBRow>



    </MDBContainer>


  </>
)
}

export default App
