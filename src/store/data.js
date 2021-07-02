import {makeAutoObservable} from "mobx"

const initProducts = [
    {
    id: 1,
    imageUrl: 'https://content1.rozetka.com.ua/goods/images/big/11593474.jpg',
    name: 'Rondi',
    count: 4,
    size: {
        width: 74,
        height: 56
    },
    weight: '4 kg',
    comments: []
},
{
    id: 2,
    imageUrl: 'https://content1.rozetka.com.ua/goods/images/big/183877521.jpg',
    name: 'Klara',
    count: 6,
    size: {
        width: 40,
        height: 65
    },
    weight: '6 kg',
    comments: []
},
{
    id: 3,
    imageUrl: 'https://content.rozetka.com.ua/goods/images/big/24681936.jpg',
    name: 'Spaceo',
    count: 2,
    size: {
        width: 30,
        height: 30
    },
    weight: '4 kg',
    comments: []
}
]

class data {
    products = []
    comments = []
    initialized = false
    formNewProduct = {
        name: "",
        imgUrl: "",
        count: 0,
        size: {
            width: 0,
            height: 0,
        },
        weight: ""
    }
    sortByName = false
    sortByQuantity = false
    currentProductId = 1;
    

    constructor() {
        makeAutoObservable(this)
    }

    setSortByName() {
        let t = (this.sortByName && !this.sortByQuantity)        
        this.sortByName = !t;
        this.sortByQuantity = false       
    }

    setSortByQuantity() {
        let t = (!this.sortByName && this.sortByQuantity)
        this.sortByName = false;
        this.sortByQuantity = !t;        
    }

    get sortByNameColor(){
       return this.sortByName ? "red" : ""       
    }

    get sortByQuantityColor(){
       return this.sortByQuantity ? "red" : ""       
    }

    setCurrentProductId(id) {
        this.currentProductId = id
        this.formNewProduct.name = this.productById.name
        this.formNewProduct.imgUrl = this.productById.imageUrl
        this.formNewProduct.count = this.productById.count
        this.formNewProduct.width = this.productById.size.width
        this.formNewProduct.height = this.productById.size.height
        this.formNewProduct.weight = this.productById.weight
    }

    readLocalStorage() {        
        if (localStorage.getItem('products') == null) {
            this.products = initProducts 
            this.saveLocalStorage() }
        let localStorageValue = localStorage.getItem('products')
        let str1 = typeof(localStorageValue) == 'string' ? localStorageValue : '[]'       
        this.products = JSON.parse(str1)                
    }

    saveLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products))        
    }

    deleteProduct(id) {
        let index = -1

        console.log("id = ", id)

        this.products.forEach((el, i) => {
            if(el.id === id){
                index = i
                console.log("delete!", i)
            }
        } )           
        
        
        if(index>=0){
            this.products.splice(index,1)
            this.saveLocalStorage()
        }

    }

    get lastId(){
        let maxId = 0
        this.products.forEach((el) => { if(el.id > maxId){ maxId = el.id } } )
        return maxId
    }

    get sortProducts(){
        let sortedProducts = []
        sortedProducts = [...this.products]
        if (this.sortByName) {
            sortedProducts.sort((a,b) => a.name > b.name? 1: -1)
        }
        if (this.sortByQuantity) {
            console.log("sort")
            sortedProducts.sort((a,b) => +a.count > +b.count? 1: -1)
        }

        return sortedProducts
    }

    get productById(){
        return this.products.find(product => product.id === this.currentProductId)
    }

    addProduct() {
        let newProduct = 
        {
            id: this.lastId+1,
            imageUrl: this.formNewProduct.imgUrl,
            name: this.formNewProduct.name,
            count: this.formNewProduct.count,
            size: {
                width: this.formNewProduct.size.width,
                height: this.formNewProduct.size.height
            },
            weight: this.formNewProduct.wieght,
            comments: []
        }

        this.products.push(newProduct)
        this.formNewProduct.name = ""
        this.formNewProduct.imgUrl = ""
        this.formNewProduct.count = undefined

        this.saveLocalStorage()

    }

    updateProduct() {
        let index = this.products.findIndex(product => product.id === this.currentProductId)        

        this.products[index].name = this.formNewProduct.name        
        this.products[index].imageUrl = this.formNewProduct.imgUrl
        this.products[index].count = this.formNewProduct.count
        this.products[index].size.width = this.formNewProduct.width
        this.products[index].size.height = this.formNewProduct.height
        this.products[index].width = this.formNewProduct.width

        this.saveLocalStorage()

    }

    onFormChange(property, value){
        this.formNewProduct[property] = value
    }



}

export default new data