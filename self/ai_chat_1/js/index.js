let display_sonIcon = document.getElementById('sonIcon')
let hidden_sonIcon = document.getElementById('sonHiddenIcon')
let left_layout_id = document.getElementById('left_layout_id')
let myself_datetime=document.getElementById('datatime')
display_sonIcon.innerHTML = '<'
hidden_sonIcon.innerHTML = '>'

function btn_icon() {
left_layout_id.style.display = 'none'
hidden_sonIcon.style.display = 'block'
}

function btn_display_icon() {
left_layout_id.style.display = 'block'
hidden_sonIcon.style.display = 'none'
}
function isZero(num){
return (num < 10 ? '0' : '') + num;
}
function getDateTime(DOM){
let datetime=new Date;
let year=datetime.getFullYear();
let month=isZero(datetime.getMonth()+1);
let day=isZero(datetime.getDate());
let hour=isZero(datetime.getHours());
let minute=isZero(datetime.getMinutes());
let seconds=isZero(datetime.getSeconds());
let date=year+'/'+month+'/'+day+' '+hour+':'+minute+":"+seconds;
DOM.innerHTML=date
}
getDateTime(myself_datetime)
async function fetchChat(content) {
const response = await fetch('/api/get_chat_completion', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content })
});
const data = await response.json();
document.getElementById('response').innerText = data.message;
}

document.addEventListener('DOMContentLoaded', function() {
document.getElementById('submitBtn').addEventListener('click', function() {
  const content = document.getElementById('contentInput').value;
  fetchChat(content);
});
});