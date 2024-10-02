import React, { useEffect, useState } from 'react'
import colocation from '../../../services/colocation'

const List_colocation = () => {
    const [data,setdata]=useState()
    const getcolocation=()=>{
        colocation.getColocation().then((res)=>{
            setdata(res.data.colocation)
            console.log(res.data)
        }).catch((erreur)=>{
            console.log(erreur)
        })
    }
    useEffect(()=>{
        getcolocation()
    },[])
  return (
    <div className='row'>
        <div className="col-lg-8 d-flex align-items-stretch">
    <div className="card w-100">
        <div className="card-body p-4">
        <h5 className="card-title fw-semibold mb-4">Liste Des Colocations</h5>
        <div className="table-responsive">
            <table className="table text-nowrap mb-0 align-middle">
            <thead className="text-dark fs-4">
                <tr>
                <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">ID</h6>
                </th>
                <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Type Paiement</h6>
                </th>
                <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Avance en DT</h6>
                </th>
                <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Annonce</h6>
                </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index+1}</h6></td>
                            <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">{item.typePaiement}</h6>                        
                            </td>
                            <td className="border-bottom-0">
                                <p className="mb-0 fw-normal">{item.avance}</p>
                            </td>
                            <td className="border-bottom-0">
                                <p className="mb-0 fw-normal">{item.annonce}</p>
                            </td>
                            <button className="btn btn-primary m-2" >Update</button>
                            <button className="btn btn-danger m-2" >Delete</button>
                        </tr>

                    )
                })}                   
            </tbody>
            </table>
        </div>
        </div>
    </div>
        </div>
    </div>
  )
}

export default List_colocation
