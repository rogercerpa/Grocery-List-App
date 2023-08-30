import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const ProductCategories = ({ userUID }) => {
    const db = getFirestore();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const docRef = doc(db, "users", userUID);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setCategories(docSnap.data().categories || []);
            }
        };

        fetchCategories();
    }, [userUID, db]);

    async function handleAddCategory() {
        const docRef = doc(db, "users", userUID);
        await updateDoc(docRef, {
            categories: [...categories, newCategory]
        });
        setCategories(prev => [...prev, newCategory]);
        setNewCategory("");
    }

    async function handleEditCategory(index, newCategoryName) {
        const updatedCategories = [...categories];
        updatedCategories[index] = newCategoryName;

        const docRef = doc(db, "users", userUID);
        await updateDoc(docRef, {
            categories: updatedCategories
        });

        setCategories(updatedCategories);
    }

    async function handleDeleteCategory(index) {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);

        const docRef = doc(db, "users", userUID);
        await updateDoc(docRef, {
            categories: updatedCategories
        });

        setCategories(updatedCategories);
    }

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Product Categories</h3>
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="flex justify-between items-center mb-1">
                        <span>{category}</span>
                        <div>
                            <span onClick={() => handleEditCategory(index, prompt('Edit category name:', category))}>Edit</span>
                            <span onClick={() => handleDeleteCategory(index)}>Delete</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-2">
                <input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add new category"
                    className="border px-2 py-1"
                />
                <button onClick={handleAddCategory} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">Add</button>
            </div>
        </div>
    );
}

export default ProductCategories;
