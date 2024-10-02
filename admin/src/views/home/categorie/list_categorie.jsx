import React, { useEffect, useState } from 'react'
import categorie from '../../../services/categorie'
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'



const List_categorie = () => {
    const {id} = useParams()
    const handledelete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                categorie.deleteCategorie(id).then((res)=>{
                    getcategorie()
                    console.log(res.data)
                })
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        
        
    }
    const [data,setdata]=useState([])
    const getcategorie=()=>{
        categorie.getCategorie().then((res)=>{
            setdata(res.data.categorie)
            console.log(res.data)
        }).catch((erreur)=>{
            console.log(erreur)
        })
    }
    useEffect(()=>{
        getcategorie()
    },[])
  return (
    <div className='row'>
        <div className="col-lg-8 d-flex align-items-stretch">
    <div className="card w-100">
        <div className="card-body p-4">
        <h5 className="card-title fw-semibold mb-4">Liste Des Categories</h5>
        <div className="table-responsive">
            <table className="table text-nowrap mb-0 align-middle">
            <thead className="text-dark fs-4">
                <tr>
                <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">ID</h6>
                </th>
                <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Name</h6>
                </th>
                <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Description</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Action</h6>
                </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index+1}</h6></td>
                            <td className="border-bottom-0">
                                <h6 className="fw-semibold mb-1">{item.name}</h6>                        
                            </td>
                            <td className="border-bottom-0">
                                <p className="mb-0 fw-normal">{item.description}</p>
                            </td>
                            <td className="border-bottom-0">
                                <Link to={`/updatecat/${item._id}`}>
                                    <button className="btn btn-primary m-2" >Update</button>
                                </Link>
                                <button className="btn btn-danger" onClick={()=>handledelete(item._id)}>Delete</button>
                            </td>
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

export default List_categorie
