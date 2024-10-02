import React, { useEffect, useState } from 'react'
import annonce from '../../../services/annonce'
import categorie from '../../../services/categorie'
import Swal from 'sweetalert2'
import { useNavigate , useParams } from 'react-router-dom'

const Update_annonce = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const[data,setdata] = useState({})
    const [categ,setcateg] = useState([])
    const changehandler=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const [gal,setgal] = useState([])
    const imagehandler=(e)=>{
        setgal(e.target.files)
    }
    const getcategorie = ()=>{
        categorie.getCategorie().then((res)=>{
            setcateg(res.data.categorie)
            console.log(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getcategorie()
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
                const formdata = new FormData()
        formdata.append("ref",data.ref)
        formdata.append("title",data.title)
        formdata.append("description",data.description)
        for(let i=0;i<gal.length;i++){
            formdata.append("files",gal[i])
        }
        formdata.append("price",data.price)
        formdata.append("categorie",data.categorie)

        annonce.updateAnnonce(id,formdata).then((res)=>{

            console.log(res)
            navigate('/listann')
        
        })
              Swal.fire("Saved!", "", "success");
              navigate('/addann')
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
            <h5 className="card-title fw-semibold mb-4">Annonce</h5>
            <div className="card">
                <div className="card-body">
                <form onSubmit={onsubmithandler}>
                    <div className="mb-3">
                    <label htmlFor="exampleInputRef" className="form-label">Reference</label>
                    <input type="number" name="ref" className="form-control" id="exampleInputRef" onChange={changehandler} />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" id="exampleInputTitle" onChange={changehandler} />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                    <textarea name="description" className="form-control" id="exampleInputDescription" onChange={changehandler} />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="exampleInputImage" className="form-label">Image</label>
                    <input type="file" name="files" className="form-control" id="exampleInputImage" onChange={imagehandler} />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="exampleInputprice" className="form-label">Price</label>
                    <input type="number" name="price" className="form-control" id="exampleInputprice" onChange={changehandler} />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="categorie" className="form-label">Categorie</label>
                    <select class="form-select" name="categorie" id="categorie" onChange={changehandler} value={data?.categorie}>
                        <option selected disabled>Liste des Categories</option>
                        {
                            categ?.map( (item)=>{ 
                                return <option value={item._id}>{item.name}</option>
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

export default Update_annonce
