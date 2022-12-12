
import { async } from '@firebase/util';
import { 
    ref,
    getDownloadURL,
    listAll, 
} from 'firebase/storage';

import { firebaseStorage } from './FirebaseStorage';

export const getProfilePic = async (userId) => {
    const fileDir = `/profile/picture/${userId}`+'.png';
    console.log(`getProfilePic: Getting picture from ${fileDir}`);
    const reference = ref(firebaseStorage, fileDir);
    let picUrl = '';
    try {
        await getDownloadURL(reference).then( (url) => {
            picUrl = url;
            console.log(`getProfilePic: result returned ${picUrl}`);
        });
    } catch (error) {
        throw new Error(`getProfilePic: Fail to retrieve picture from ${fileDir}, picture possibly not exist`);
    }
};

export const getSamplePic = async (name) => {
    const fileDir = `profile/samplepicture/${name}`+'.png';
    console.log(`getSamplePic: Getting picture from ${fileDir}`);
    const reference = ref(firebaseStorage, `profile/samplepicture/${name}.png`);
    let picUrl = '';
    try {
        await getDownloadURL(reference).then( (url) => {
            picUrl = url;
            console.log(`getSamplePic: result returned ${picUrl}`); 
        });   
    } catch (error) {
        throw new Error(`getSamplePic: Fail to get sample picture from ${fileDir}, picture possibly not exist`);
    }
    return picUrl;
};

/**  Currently there are following type of stickers:
* 'american-sign-alphabet',
* 'american-sign',
* 'f-nong',
* 'm-nong',
* 'thai-sign-alphabet' 
* @param type type of sticker, refer to above statement 
* @param numberId id number of sticker, refer to storage*/
export const getOneSticker = async (type, numberId) => {
    const fileDir = `/stickers/${type}`+`/${type} (${numberId})`+'.png';
    console.log(`getOneSticker: Getting picture from ${fileDir}`);
    const reference = ref(firebaseStorage, fileDir);
    let picUrl = '';
    try {
        await getDownloadURL(reference).then( (url) => {
            picUrl = url;
            console.log(`getOneSticker result returned ${picUrl}`); 
        });
    } catch (error) {
        throw new Error(`getOneSticker: Fail to retrieve sticker from ${fileDir}`);
    }
    return picUrl;
};

export const getTypeStickers = async (type) => {
    const fileDir = `/stickers/${type}`;
    console.log(`getTypeStickers: Fetching pictures from ${fileDir}`);
    const listReference = ref(firebaseStorage, fileDir);
    let picList = [];
    try {
        await listAll(fileDir).then( (response) => {
            response.items.forEach( (item) => {
                picList.push(item);
            });
        });
    } catch (error) {
        throw new Error(`getTypeStickers: Fail to fetch stickers from ${fileDir}`);
    }
    console.log(`getTypeStickers: returned result ${picList}`);
    return picList;
};


