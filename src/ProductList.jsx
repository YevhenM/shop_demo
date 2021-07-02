import {useEffect, useState} from "react";
import s from "./ModalDialog.module.css"
import "./App.css"
import {observer} from "mobx-react-lite";
import data from './store/data'
import Product from './Product'

const ProductList = observer (() => {
    
    useEffect(() => {
        data.readLocalStorage()
    }, [])

    const [showModal, setShowModal] = useState(false);    
    

    const onEdit = (event)=>{        
        data.onFormChange(event.target.name, event.target.value)        
    }


    const onClose = () => setShowModal(false)
    const onSubmit = () => {
        let url = "https://budprice.online/media/catalog/product/cache/1/image/700x700/9df78eab33525d08d6e5fb8d27136e95/w/y/xwysiwyg-1116-noname_1513870371.jpg.pagespeed.ic.TxcXMi8iFh.jpg"        
        data.addProduct()
        setShowModal(false)
    }    
    
 let modalNewProduct = 
 <div className = {s.modal} >

        <div className={s.modal_dialog}>
                    <div className={s.modal_header}>New product</div>
                    <div className={s.modal_body}>
                            <div className={s.modal_content}>
                                <label htmlFor="">Product name:
                                    <input type="text" placeholder="Product Name" name="name" value={data.formNewProduct.name} 
                                    onChange={onEdit} className={s.one}/>
                                </label>
                                <label htmlFor="">Image URL: 
                                    <input type="text" placeholder="Image url" name="imgUrl" value={data.formNewProduct.imgUrl} 
                                    onChange={onEdit} className={s.one}/>
                                </label>
                                <label htmlFor="">Quantity: 
                                    <input type="text" placeholder="Quantity" name="count" value={data.formNewProduct.count} 
                                    onChange={onEdit} className={s.small}/>
                                </label>                               
                                <label htmlFor="">Width: 
                                    <input type="text" placeholder="Width" name="width" value={data.formNewProduct.width} 
                                    onChange={onEdit} className={s.small}/>
                                </label>
                                <label htmlFor="">Height: 
                                    <input type="text" placeholder="Height" name="height" value={data.formNewProduct.height} 
                                    onChange={onEdit} className={s.small}/>
                                </label>
                                <label htmlFor="">Weight: 
                                    <input type="text" placeholder="Weight" name="weight" value={data.formNewProduct.weight} 
                                    onChange={onEdit} className={s.small}/>
                                </label>  
                            </div>                    
                    </div>
                    <div className={s.modal_footer}>
                        <button onClick={onSubmit}> Add </button>
                        <button onClick={onClose}> Cancel </button>
                    </div>

                </div>
     New product
 </div>


 return(

     <div>
         
        <div className='home'>
            <a href="/"> Home </a>
            <button onClick = {()=>setShowModal(!showModal)}>New Product</button>
            <button onClick = {()=>data.setSortByName()} className={data.sortByNameColor} >Sort by Name</button>
            <button onClick = {()=>data.setSortByQuantity()} className={data.sortByQuantityColor}>Sort by quantity</button>
        </div>

                              



         <div>
            
         </div>

          {data.sortProducts.map(product => (
             <div>
                 <Product
                    key={product.id}
                    id={product.id} 
                    imageUrl = {product.imageUrl}
                    name = {product.name}
                    count = {product.count}
                    deleteProduct = {data.deleteProduct}
                 />                                   
             
             </div>)
         )}

        {showModal && modalNewProduct}        
         

     </div>
 )

 })

export default ProductList;