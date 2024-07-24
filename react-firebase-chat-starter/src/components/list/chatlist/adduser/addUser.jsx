import "./adduser.css"
import { db } from "../../../../lib/firebase";
import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
 } from "firebase/firestore"; 
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";


const AddUser = () =>{
    const [user,setUser] = useState(null);
    const {currentUser} = useUserStore()
    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try{
            const userRef = collection(db, "users");

            const q = query(userRef , where("username", "==" , username ));

            const querySnapShot = await getDocs(q);

            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data());
            }

        }catch(err){
            console.log(err);
        }
    };

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const userChatRef = collection(db, "userchats");
        
        try {
            const newChatRef = doc(chatRef); // This correctly creates a new document reference within the 'chats' collection
    
            await setDoc(chatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });
    
            // Here, you need to use the correct document reference for updateDoc
            // Ensure user.id and currentUser.id are correctly defined
            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastmessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });
    
            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastmessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });
        } catch (err) {
            console.error("Error adding user to chat:", err);
        }
    };
    

    
    return (
        <div className="adduser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button>Search</button>
            </form>
            { user && <div className="user">
                <div className="detail">
                    <img src= {user.avatar} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Add user</button>
            </div>}
        </div>
    )
}

export default AddUser