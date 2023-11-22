import React, { useContext, useEffect, useState } from 'react'
import "./homeview.css"
import { useMutation, useQuery } from 'react-query';
import { getLocation,getDirection, getInvestor, predict, saveData, addTraning, getHouseCus } from '../API/apis';
import AuthContext from '../context/AuthProvider';
import DataTable from '../DataTable';
function HomeView() {

  const {auth} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showModalDirect, setShowModalDirect] = useState(false);
  const [showModalDirectBal, setShowModalDirectBal] = useState(false);
  const [showModalInvestor, setShowModalInvestor] = useState(false);
    const [values,setValues] = useState({
        nameHouse:'',
        directionHouse:'',
     directionBalcony:'',
     invester:'',
     size:'',
     bedroom:'',
     nvs:'',
    })
    const [searchHouse,setSearchHouse] = useState([]);
    const [searchDirectHouse,setSearchDirectHouse] = useState([]);
    const [searchDirectBal,setSearchDirectBal] = useState([]);
    const [searchInvestor,setSearchInvestor] = useState([]);
    const [pricePredict,setPricePredict] = useState(0);
    const [showPricePredict,setShowPricePredict] = useState(false);
    
    const [houseCuss, setHouseCuss] = useState([])

    const onChange = (e) => {
      const term = e.target;
        setValues({ ...values, [term.name]: term.value });
      };
      const onChangeHome = (e) => {
        
        const term = e.target;
          setValues({ ...values, [term.name]: term.value });
        const results = listHouse.data.data.filter(item=>
          item.location.includes(term.value)
        )
          setSearchHouse(results);
          setShowModal(true);
        // }
        };
      const onChangeDirectionHouse = (e)=>{
        
        const term = e.target;
          setValues({ ...values, [term.name]: term.value });
        const results = listDirection.data.data.filter(item=>
          item.direction.toLowerCase().includes(term.value.toLowerCase())
        )
          setSearchDirectHouse(results);
          setShowModalDirect(true);
      }
      const onChangeDirectionBal = (e)=>{
        
        const term = e.target;
          setValues({ ...values, [term.name]: term.value });
        const results = listDirection.data.data.filter(item=>
          item.direction.toLowerCase().includes(term.value.toLowerCase())
        )
          setSearchDirectBal(results);
          setShowModalDirectBal(true);
      } 
      
      const onChangeInvestor = (e)=>{
        
        const term = e.target;
          setValues({ ...values, [term.name]: term.value });
          
        const results = listInvestor.data.data.filter(item=>
          item.name.toLowerCase().includes(term.value.toLowerCase())
        )
          setSearchInvestor(results);
          setShowModalInvestor(true);
      }  

      
    const getHouseCustomer = async()=>{
      return getHouseCus(auth.id);
    }

    const listHouseCus = useQuery("houseCus",getHouseCustomer,{
      enabled:true
    })

    const getHouse = async()=>{
        return getLocation();
    }

    const listHouse = useQuery('listHouse',getHouse,{
        enabled:true
    })

    const getDirect = async()=>{
      return getDirection();
    }
    const listDirection = useQuery('listDirection',getDirect,{
      enabled:true
    })
    const getInvest = async()=>{
      return getInvestor();
    }
    const listInvestor = useQuery('listInvestor',getInvest,{
      enabled:true
    })

    const hanleSelectHouse =(selectedItem)=>{
      setValues({...values,"nameHouse":selectedItem})
      setShowModal(false)
    }
    const hanleSelectDirectHouse =(selectedItem)=>{
      setValues({...values,"directionHouse":selectedItem})
      setShowModalDirect(false)
    }
    const hanleSelectDirectBal =(selectedItem)=>{
      setValues({...values,"directionBalcony":selectedItem})
      setShowModalDirectBal(false)
    }
    const hanleSelectInvestor =(selectedItem)=>{
      setValues({...values,"invester":selectedItem})
      setShowModalInvestor(false)
    }

    const predictMutation = useMutation(predict)

    const handlePredict = ()=>{
      const body={
        "location":values.nameHouse,
        "size": values.size,
  "houseDirection": values.directionHouse,
  "balconyDirection": values.directionBalcony,
  "bedrooms": values.bedroom,
  "bathrooms": values.nvs,
  "investor": values.invester,
   "price": 0
      }
      predictMutation.mutate(body,{
        onSuccess:(response)=>{
          if(response.data) {
            setPricePredict(response.data.price)
            setShowPricePredict(true)
            
          }
        }
      })
    }


    const handleSave = () => {
      const data = {
        id: auth.id,
        body: {
          "location": values.nameHouse,
          "size": values.size,
          "houseDirection": values.directionHouse,
          "balconyDirection": values.directionBalcony,
          "bedrooms": values.bedroom,
          "bathrooms": values.nvs,
          "investor": values.invester,
          "price": pricePredict
        }
      };
    
      saveData(data)
        .then((response) => {
          listHouseCus.refetch();
        })
        .catch((error) => {
          console.error(error);
          // Xử lý lỗi ở đây
        });
    };

    
    

    useEffect(()=>{
        listHouse.refetch();
        listDirection.refetch();
        listInvestor.refetch();
        listHouseCus.refetch();
    },[])

    useEffect(()=>{
      if(auth){
        setHouseCuss(auth.houseCuss)
      }
    },[])
    
  return (
    <div className="homeView ">
      <h2 style={{margin:10}}>Giá nhà bất động sản</h2>
        <div class="container ">
        <div class="row row-cols-2">
      <div className="forminput" >
            <label>Tên tòa</label>
            <input
            
              value={values.nameHouse}
              name='nameHouse'
              placeholder='Tên nhà'
              required={true}
              onChange={onChangeHome}
            ></input>
            {showModal && (
              <div style={{maxHeight:100,zIndex:100,overflowY:"auto"}}>
                <ul>
              {searchHouse.map((result) => (
                <li key={result.id} onClick={()=>hanleSelectHouse(result.location)}>{result.location}</li>
              ))}
            </ul>
              </div>
            )}
          </div>

          <div className="formInput" >
            <label>Kích thước</label>
            <input
              value={values.size}
              name='size'
              placeholder='Kích thước'
              required={true}
              onChange={onChange}
            ></input>
          </div>

          <div className="formInput" >
            <label>Hướng nhà</label>
            <input
              value={values.directionHouse}
              name='directionHouse'
              placeholder='Hướng nhà'
              required={true}
              onChange={onChangeDirectionHouse}
            ></input>
            {showModalDirect && (
              <div style={{maxHeight:100,zIndex:100,overflowY:"auto"}}>
                <ul>
              {searchDirectHouse.map((result) => (
                <li key={result.id} onClick={()=>hanleSelectDirectHouse(result.direction)}>{result.direction}</li>
              ))}
            </ul>
              </div>
            )}
          </div>

          <div className="formInput" >
            <label>Số phòng ngủ</label>
            <input
              value={values.bedroom}
              name='bedroom'
              placeholder='Số phòng ngủ'
              required={true}
              onChange={onChange}
            ></input>
          </div>

          <div className="formInput" >
            <label>Hướng ban công</label>
            <input
              value={values.directionBalcony}
              name='directionBalcony'
              placeholder='Hướng ban công'
              required={true}
              onChange={onChangeDirectionBal}
            ></input>
            {showModalDirectBal && (
              <div style={{maxHeight:100,zIndex:100,overflowY:"auto"}}>
                <ul>
              {searchDirectBal.map((result) => (
                <li key={result.id} onClick={()=>hanleSelectDirectBal(result.direction)}>{result.direction}</li>
              ))}
            </ul>
              </div>
            )}
          </div>

          <div className="formInput" >
            <label>Số WC</label>
            <input
              value={values.nvs}
              name='nvs'
              placeholder='Số WC'
              required={true}
              onChange={onChange}
            ></input>
          </div>

          <div className="formInput" >
            <label>Nhà đầu tư</label>
            <input
              value={values.invester}
              name='invester'
              placeholder='Nhà đầu tư'
              required={true}
              onChange={onChangeInvestor}
            ></input>
            {showModalInvestor && (
              <div style={{maxHeight:100,zIndex:100,overflowY:"auto"}}>
                <ul>
              {searchInvestor.map((result) => (
                <li key={result.id} onClick={()=>hanleSelectInvestor(result.name)}>{result.name}</li>
              ))}
            </ul>
              </div>
            )}
          </div>
          <div>
          <button style={{borderRadius:10,width:200,marginTop:25}} onClick={handlePredict}>Xác nhận</button>
          </div>

          {showPricePredict && pricePredict>0 && (
            <>
            <div className="formInput" >
            <label>Giá dự đoán (tỷ)</label>
            <input
              value={pricePredict}
              name='pricePredict'
              placeholder='Giá'
            ></input>
          </div>

<div>
<button style={{borderRadius:10,width:200,marginTop:25}} onClick={handleSave}>OK</button>
</div>
</>
          )}
          </div>
          </div>
          <div style={{width:"80%"}}>
          <table class="table table-success table-striped" style={{maxHeight:50,overflowY:"auto"}}>
          <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Tên nhà</th>
      <th scope="col">Hướng nhà</th>
      <th scope="col">Hướng ban công</th>
      <th scope="col">Kích thước(m^2)</th>
      <th scope="col">Số phòng ngủ</th>
      <th scope="col">Số WC</th>
      <th scope="col">Nhà đầu tư</th>
      <th scope="col">Giá nhà(tỷ)</th>
      <th scope="col">Trạng thái</th>
    </tr>
  </thead>
  <tbody>
    {listHouseCus.data && listHouseCus.data.data.map(item=>(
      <DataTable item={item} listhouseCus = {listHouseCus}/>
    ))}
    
    
  </tbody>
</table> 
</div> 
    </div>
  )
}

export default HomeView
