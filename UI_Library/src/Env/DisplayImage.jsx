function byteToBase64(byteArray) 
{
    let binary ="";
    const length = byteArray.length;
    for(let i=0;i<length;i++) 
    {
        binary+=String.fromCharCode(byteArray[i]&0xFF);

    } 
    return window.btoa(binary);
};
function displayImageURL(byteArray) 
{
    const base64String= byteToBase64(byteArray);
    return 'data:image/jpeg;base64,'+base64String;
} 
export default displayImageURL;