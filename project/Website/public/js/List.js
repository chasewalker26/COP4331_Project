//Abstract Class list.
//@class Animal
class List{

    constructor(){
      if (this.constructor == List) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
  
    List(){
      throw new Error("Method 'List' must be implemented.");
    }
  
    getProduct(){
      
    }
    updateDatabase(Product){

    }
}