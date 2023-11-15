
const secondsToFormatedTime = (time) => {
    const d = new Date(parseFloat(time) * 1000);
  return d.toISOString().slice(11,23).replace('.', ',');
}   


export function ToSrt (items){
    let srt = '';
  let i = 1;
  items.filter(item => !!item).forEach(item => {
    // seq
    srt += i + "\n";
    // timestamps
    const {start_time, end_time} = item; // 52.345
    srt += secondsToFormatedTime(start_time)
      + ' --> '
      + secondsToFormatedTime(end_time)
      + "\n";

    // content
    srt += item.content + "\n";
    srt += "\n";
    i++;
  });
  return srt;
}