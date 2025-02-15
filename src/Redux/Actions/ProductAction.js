import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";


export const addProduct = (product) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    const newProduct = { id: docRef.id, ...product };

    dispatch({
      type: ADD_PRODUCT,
      payload: newProduct
    });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};


export const fetchProducts = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({
      type: FETCH_PRODUCTS,
      payload: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


export const updateProduct = (id, updatedProduct) => async (dispatch) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedProduct);
  
      dispatch({
        type: UPDATE_PRODUCT,
        payload: { id, ...updatedProduct }
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


export const deleteProduct = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "products", id));

    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
