export  const getCurrentDate= ()=>{

    let newDate = new Date()

    let date = newDate.getFullYear()+'/'+(newDate.getMonth()+1)+'/'+newDate.getDate();
    let time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();

    return `${date} ${time}`
}


export const formattedSeconds = (sec) =>
    ('0' + Math.floor(sec / 6000)).slice(-2) +
    ':' +
    ('0' + Math.floor(sec / 100)).slice(-2) +
    ':' +
    ('0' + sec % 100).slice(-2)