import React,{useEffect,useState} from "react"
import './Home.scss'
import axios from 'axios'
import Loading from "../componets/Loading"
import { Link } from "react-router-dom"

const Home = ({search}) =>{
    const[data,setData]=useState([])
    const[categories,setCategories]=useState([])
    const[filter,setFilter]=useState([])
    async function getProducts(){
        const res=await axios.get('https://dummyjson.com/products')
        setData([...res.data.products])
        const resCat=await axios.get('https://dummyjson.com/products/categories')
        setCategories([...resCat.data])
    }
    useEffect(()=>{
        getProducts()
    },[])
    if(data.length==0) return(<Loading/>) 
    console.log(`from home${search}`);
    return(
        <div className="home">
            <div className="container-fluid p-3 d-flex" style={{overflow:"scroll"}}>
                <button className="btn btn-outline-dark px-3" onClick={()=>{
                    setFilter("")}}>ALL</button>
                {
                    categories.map((cat,index)=>(<button className="btn btn-outline-dark px-3 mx-2" key={index} onClick={()=>{
                        setFilter(cat)}}>{cat}</button>))
                }
            </div>
            <div className="container">
                <div className="row">
                    {
                       data.filter(i=>i.title.toLowerCase().includes(search.toLowerCase()))
                       .filter((dt)=>dt.category.includes(filter))
                        .map((dt,index)=>(<div className="col-lg-3 my-3 cl" key={index}>
                            <Link to={`/Details/${dt.id}`} style={{textDecoration:"none"}} className="text-dark">
                            <div className="card shadow border-0 crd" style={{width:"15rem"}}>
                        <div className="image" style={{width:"100%",height:"200px"}}>

                            <img src={dt.thumbnail} className="card-img-top" alt="..." style={{width:"100%",height:"100%", objectFit:"cover"}}/>
                        </div>
                        <div className="card-body text-center">
                          <h5 className="card-title">{dt.title.substring(0,15)}</h5>
                          <p className="card-text">Rating: {dt.rating}</p>
                          <p className="card-text">Price: {dt.price}</p>
                          {/* <a href="#" className="btn btn-outline-dark">Details</a> */}
                        </div>
                      </div>
                            </Link>
                        </div>))
                    }
                </div>
            </div>
        </div>
    )
}
export default Home



