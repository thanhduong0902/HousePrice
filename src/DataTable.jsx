import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { addTraning } from './API/apis';

function DataTable({item,listhouseCus}) {
    const [showUpdate,setShowUpdate] = useState(false);
    const [priceUpdate,setPriceUpdate] = useState(0);

    const traningMutation = useMutation(addTraning)
    const handleSold = (data)=>{
        const body={
          id:data.id,
          location: data.location,
    size: data.size,
    houseDirection: data.houseDirection,
    balconyDirection: data.balconyDirection,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    investor: data.investor,
     price: priceUpdate
        }
        traningMutation.mutate(body,{
          onSuccess:(response)=>{
            listhouseCus.refetch()
          }
        })
      }
  return (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.location}</td>
      <td>{item.houseDirection}</td>
      <td>{item.balconyDirection}</td>
      <td>{item.size}</td>
      <td>{item.bedrooms}</td>
      <td>{item.bathrooms}</td>
      <td>{item.investor}</td>
      <td>{item.price}</td>
      <td>{item.status === 1? "Đã chốt":<div>
        {showUpdate ? (
          <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Giá cập nhật" value={priceUpdate}
          onChange={(e)=>setPriceUpdate(e.target.value)}
          style={{width:100,borderRadius:10}}/>
          <button  type="button" id="button-addon2" 
          onClick={()=>handleSold(item)}
          style={{width:50,borderRadius:10,marginLeft:10}}>OK</button>
        </div>
        ):(
          <button style={{borderRadius:10,pading:10}} onClick={()=>setShowUpdate(true)}>Bán</button>
        )}
        
        </div>}</td>
    </tr>
  )
}

export default DataTable