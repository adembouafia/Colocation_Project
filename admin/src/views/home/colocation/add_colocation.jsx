import React, { useEffect, useState } from 'react'
import colocation from '../../../services/colocation'
import annonce from '../../../services/annonce'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Add_colocation = () => {
    const[data,setdata] = useState({})
    const [ann,setcateg] = useState([])
    const changehandler=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const getannonce = ()=>{
        annonce.getAnnonce().then((res)=>{
            setcateg(res.data.annonce)
            console.log(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    const navigate=useNavigate()
    useEffect(()=>{
        getannonce()
    },[])
    const onsubmithandler=(e)=>{

        e.preventDefault()
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                colocation.createColocation(data).then((res)=>{

                    console.log(res.data)
                    Swal.fire("Saved!", "", "success");
                    navigate('/listco')
        
        })
              
             
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });

    }


  return (
    <div>
    <div className="container-fluid">
        <div className="container-fluid">
        <div className="card">
            <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Colocation</h5>
            <div className="card">
                <div className="card-body">
                <form onSubmit={onsubmithandler}>
                    <div className="mb-3">
                    <label htmlFor="exampleInputRef" className="form-label">Type de Paiement</label>
                    <input type="text" name="typePaiement" className="form-control" id="exampleInputRef" onChange={changehandler} />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="exampleInputTitle" className="form-label">Avance</label>
                    <input type="number" name="avance" className="form-control" id="exampleInputTitle" onChange={changehandler} />
                    </div>



                    <div className="mb-3">
                    <label htmlFor="annonce" className="form-label">Annonce</label>
                    <select class="form-select" name="annonce" id="annonce" onChange={changehandler} value={data?.annonce}>
                        <option selected disabled>Liste des Annonces</option>
                        {
                            ann?.map( (item)=>{ 
                                return <option value={item._id}>{item.title}</option>
                            })


                        }
                    </select>
                    </div>






                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Add_colocation
