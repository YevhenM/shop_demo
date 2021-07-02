import {makeAutoObservable, observable, computed} from "mobx"
import data from './data'

const initComments = [
    {        
    id: 1,
    productId: 1,
    description: 'some text here',
    date: '14:00 22.08.2021'    
},
{
    id: 2,
    productId: 1,
    description: 'some other text here',
    date: '14:00 22.08.2021'
},
{
    id: 3,
    productId: 2,
    description: 'some other new text here',
    date: '14:00 22.08.2021'
}
]

class comments {    
    comments = []
    initialized = false 
    newCommentText = ""
    indexToDelete   
       

    constructor() {
        makeAutoObservable(this)
    }    

    readLocalStorage() {        
        if (localStorage.getItem('comments') == null) {
            this.comments = initComments
            this.saveLocalStorage() }
        let localStorageValue = localStorage.getItem('comments')
        let str = typeof(localStorageValue) == 'string' ? localStorageValue : '[]'       
        this.comments = JSON.parse(str)                        
    }

    saveLocalStorage() {
        localStorage.setItem('comments', JSON.stringify(this.comments))        
    }

    deleteComment(id) {
        let index = this.comments.findIndex(comment => comment.id === id) 
        
        if(index>=0){
            this.comments.splice(index,1)
            this.saveLocalStorage()
        }
    }

    get lastId(){
        let maxId = 0
        this.comments.forEach((el) => { if(el.id > maxId){ maxId = el.id } } )
        return maxId
    }
    
    get current(){
        return this.comments.filter(c => c.productId === data.currentProductId)
    }

    setIndexToDelete(id){
        this.indexToDelete = id
    }

    addNewComment(){
        
        let date = new Date()
        let formated =  date.toLocaleTimeString().slice(0,-3) + " " + date.toLocaleDateString()       

        let newComment = {
            id: this.lastId+1,
            productId: data.currentProductId,
            description: this.newCommentText,
            date: formated
        }
        this.comments.push(newComment)
        this.saveLocalStorage()
        this.newCommentText = ""
    }

    onNewTextCommentEdit(value){
        this.newCommentText = value        
    }

    deleteComment(){
        let index = this.comments.findIndex(c => c.id === this.indexToDelete)
        this.comments.splice(index,1)
        this.saveLocalStorage()
    }    
}

export default new comments