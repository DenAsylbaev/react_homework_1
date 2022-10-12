import { db } from '../../firebase-config';
import { ref, set, remove, onValue } from "firebase/database";

export const ADD_CHAT ="ADD_CHATS";
export const addChat = (newChatName) => ({
    type: ADD_CHAT, 
    payload: newChatName,
})

export const DELETE_CHAT ="DELETE_CHAT";
export const deleteChat = (id) => ({
    type: DELETE_CHAT, 
    payload: id
})

const getPayloadFromSnapshot = (snapshot) => {
    const chats = [];
    snapshot.forEach((mes) => {
        chats.push(mes.val());
    });
    return chats
}

export const addChatWithFirebase = (chatName, id) => async () => {
    set(ref(db, 'chats/' + id), {
        title: chatName,
        id: id
      });
}

export const deleteChatWithFirebase = (id) => async () => {
    remove(ref(db, 'chats/' + id), {id});
}

export const initChatTracking = () => (dispatch) => {
    const starCountRef = ref(db, 'chats/');
    onValue(starCountRef, (snapshot) => {

        const data = getPayloadFromSnapshot(snapshot);
        dispatch({
            type: ADD_CHAT,
            payload: data
        });
    });
}


