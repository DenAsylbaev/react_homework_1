export const NAME_CONTROL = 'NAME_CONTROL';

export const CHANGE_NAME ="PROFILE::CHANGE_NAME";
export const changeName = (newName) => ({
    type: CHANGE_NAME, 
    payload: newName
})