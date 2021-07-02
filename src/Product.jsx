import './App.css'
import s from './ModalDialog.module.css'
import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import data from './store/data'

const Product = observer ((props) => {

    const [showModal, setShowModal] = useState(false);
    const onClose = () => setShowModal(false)
    const {pathname} = useLocation()
    const baseUrl = pathname.replace(/\/$/, "")

    let modal =         
            <div className = {s.modal} onClick = {onClose}>
                <div className={s.modal_dialog}>
                    <div className={s.modal_header}>Delete product?</div>
                    <div className={s.modal_body}>
                        <div className={s.modal_footer}>
                        <button onClick={() => props.deleteProduct.call(data, props.id)} className={s.red}>Delete</button>
                        <button onClick={onClose}>Cancel</button>
                        </div>                        
                    </div>                    
                </div>            
            </div>    
 return(
     <div className="wrapper">   
            <div className="card">
                <div className="deleteIcon" onClick={() => setShowModal(!showModal)}>x</div>
                <div>
                <Link to={`${baseUrl}/id/${props.id}`}>
                <img src={props.imageUrl} alt="" width="auto" height="150"/>                    
                </Link>
                <div className="card__productName">
                <span>{props.name}</span>
                </div>
                                    
                    
                    <span>{props.count} pcs</span>
                </div>                
            </div>                    
            {showModal && modal}
     </div>
 )
 })
 export default Product
