import './App.css'
import s from './ModalDialog.module.css'
import {Link, useParams, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import data from './store/data'
import comments from './store/comments';

const ProductPage = observer (() => {
    
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const onClose = () => setShowModal(false)
    const onClose1 = () => setShowModal1(false)

    let history = useHistory();
    const goToPreviousPath = () => {
    history.goBack()
    }

    const params = useParams();
    let id = +params.id 
    let commentId   

    useEffect(() => {
        data.setCurrentProductId.call(data, +params.id)
        comments.readLocalStorage()
    },[])   

    const onEdit = (event)=>{        
        data.onFormChange(event.target.name, event.target.value)        
    }

    const onEditComment = (event) => {
        comments.onNewTextCommentEdit(event.target.value)
    }

    const onDeleteComment = (id) => {
        comments.setIndexToDelete.call(comments, id)        
        setShowModal1(true)
    }

    const onSubmit = () => {        
        data.updateProduct()        
        setShowModal(false)
    }
    
    const Comment = (props) => {
        return (
            <div className="comment" id={props.id}>
                <div className="deleteIcon" onClick={() => onDeleteComment(props.id)} id={props.id}> X </div>
                <div className="dateTime"> {props.date} </div>
                <div className="textComment">
                    {props.description}
                </div>
            </div>
            )
    }    

    let modal =         
    <div className = {s.modal} >

    <div className={s.modal_dialog}>
                <div className={s.modal_header}>Edit product</div>
                <div className={s.modal_body}>
                        <div className={s.modal_content}>
                            <label htmlFor="">
                                Product name: 
                                <input type="text" placeholder="Product Name" 
                                       name="name" 
                                       value={data.formNewProduct.name} 
                                       onChange={onEdit}                                        
                                       className={s.one}/>                                
                            </label>
                            <label htmlFor="">
                                image URL:
                                <input  type="text" placeholder="Image url" name="imgUrl" 
                                        value={data.formNewProduct.imgUrl} onChange={onEdit}
                                        className={s.one}/>
                            </label>
                            <label htmlFor="">Quantity
                                <input  type="text" placeholder="Quantity" name="count" 
                                        value={data.formNewProduct.count} onChange={onEdit}
                                        className={s.small}/>
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
                    <button onClick={onSubmit}> Save </button>
                    <button onClick={onClose}> Cancel </button>
                </div>
            </div> 
    </div>
    
    




    let modal1 =         
    <div className = {s.modal} >

    <div className={s.modal_dialog}>
                <div className={s.modal_header}>Delete comment?</div>
                
                <div className={s.modal_footer}>
                    <button onClick={()=>{comments.deleteComment.call(comments); setShowModal1(false)} }> Delete </button>
                    <button onClick={onClose1}> Cancel </button>
                </div>
            </div> 
    </div>






 return(
     <div> 

        <div className='home'>
            <a href="/"> Home </a>
            <button onClick={() => setShowModal(!showModal)}>Edit product</button>            
        </div>        
            <div>            
                <img src={data.formNewProduct.imgUrl} alt="" width="400" height="400"/>                   
                <div className="card__productName">
                    <span>{data.formNewProduct.name}</span>
                </div>                                         
                <span>({data.formNewProduct.count} pcs)</span>
                <p>Parameters: </p>
                <p>width - {data.formNewProduct.width}
                    <br />
                   height - {data.formNewProduct.height}
                   <br />
                   weight - {data.formNewProduct.weight}</p>

             </div>

             <div className="addComment">
                 <textarea type="text" placeholder="Write your comment here... " onChange={onEditComment} value={comments.newCommentText} />
                 <div><button onClick={()=>comments.addNewComment()}>Send comment</button></div>
                 
             </div>
            <div className="comments">
                Comments:
                {comments.current.length>0 ? comments.current.map(c => <Comment key={c.id} date={c.date} description={c.description} id={c.id}/> ): <div> No comments </div> }                

            </div>            
            {showModal && modal}
            {showModal1 && modal1}
     </div>
 )
 })
 export default ProductPage
