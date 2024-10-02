import React, { useState } from 'react'
import categorie from '../../../services/categorie'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Add_categorie = () => {
    const[data,setdata] = useState({})
    const changehandler = (e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const navigate=useNavigate()
    const onsubmithandler = (e)=>{
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
              Swal.fire("Saved!", "", "success");
              categorie.createCategorie(data).then((res)=>
                {
                    console.log(res)
                    navigate('/listcat')
                }
            )
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
            <h5 className="card-title fw-semibold mb-4">Categorie</h5>
            <div className="card">
                <div className="card-body">
                <form onSubmit={onsubmithandler}>
                    <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="exampleInputEmail1" onChange={changehandler} />
                    <div id="emailHelp" className="form-text">We'll never share your name with anyone else.</div>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                    <textarea name="description" className="form-control" id="exampleInputDescription" onChange={changehandler} />
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

export default Add_categorie
