import { 
    ref, getDownloadURL, 
} from 'firebase/storage';

import { firebaseStorage } from './FirebaseStorage'

export const getProfilePic = async (userId) => {
    try {
        const fileDir = `/profile/picture/${userId}`+`.png`;
        console.log(`Getting picture from ${fileDir}`);
        const reference = ref(firebaseStorage, fileDir);
        await getDownloadURL(reference);
    } catch (error) {
        throw new Error(`Fail to retrieve picture from ${fileDir}, picture possibly not exist`);
    }
}

export function getSamplePic(name) {
    const fileDir = `profile/samplepicture/${name}`+`.png`
    console.log(`Getting picture from ${fileDir}`);
    const reference = ref(firebaseStorage, `profile/samplepicture/${name}.png`);
    let picUrl = "";
    try {
        getDownloadURL(reference).then( (url) => {
        picUrl = url;
        console.log(picUrl); 
        });   
    } catch (error) {
        throw new Error(`Fail to get sample picture from ${fileDir}, picture possibly not exist`);
    }
    return picUrl;
}

/* Currently there are following type of stickers
* 'american-sign-alphabet'
* 'american-sign'
* 'f-nong'
* 'm-nong'
* 'thai-sign-alphabet' */
export const getSticker = async (type, numberId) => {
    try {
        const fileDir = `/stickers/${type}`+`/${type} (${numberId})`+`.png`
        console.log(`Getting picture from ${fileDir}`);
        const reference = ref(firebaseStorage, fileDir);
        await getDownloadURL(reference);
    } catch (error) {
        throw new Error(`Fail to retrieve sticker from ${fileDir}, sticker possibly not exist`);
    }
};


