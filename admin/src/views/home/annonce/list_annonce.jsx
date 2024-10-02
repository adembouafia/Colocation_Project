import React, { useEffect, useState} from "react";
import annonce from "../../../services/annonce";
import Swal from "sweetalert2";
import { Link , useParams } from 'react-router-dom'

const List_annonce = () => {
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
                annonce.deleteAnnonce(id).then((res)=>{
                    getAnnonce()
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

  const [data, setdata] = useState([]);
  const getAnnonce = () => {
    annonce
      .getAnnonce()
      .then((res) => {
        setdata(res.data.annonce);
        console.log(res.data);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };

  useEffect(() => {
    getAnnonce();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {data?.map((item) => {
                  return (
                    <>
                            <div class="col-md-4">
                              <h5 class="card-title fw-semibold mb-4">Annonce Ref : {item.ref}</h5>
                              <div class="card">
                              {item.image && item.image.length > 0 && (
                                  <img src={`http://localhost:3000/upload/${item.image[0]}`} className="card-img-top" alt={item.image} />
                                )}
                                <div class="card-body">
                                  <h5 class="card-title">{item.title}</h5>
                                  <p class="card-text">{item.description}</p>
                                  <h5 class="card-title">Price/Month : {item.price} DT </h5><br />
                                  <Link to={`/updateann/${item._id}`}>
                                    <button className="btn btn-primary m-2" >Update</button>
                                </Link>
                                  <button class="btn btn-danger" onClick={()=>handledelete(item._id)}> Delete </button>
                                </div>
                              </div>
                            </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List_annonce;
