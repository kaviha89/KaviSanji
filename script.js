const params = new URLSearchParams(window.location.search);
const guestId = params.get("guest") || params.get("id") || "001";
const guest = GUESTS[guestId] || {name:"Dear Guest", table:"—"};

document.getElementById("guestName").textContent = guest.name;
document.getElementById("tableNumber").textContent = guest.table === "—" ? "Please contact us" : `Table ${guest.table}`;

const eventDate = new Date("2027-01-20T18:00:00+05:30").getTime();
function updateCountdown(){
  const diff = eventDate - Date.now();
  if(diff <= 0){
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent="00");
    return;
  }
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff%86400000/3600000);
  const m=Math.floor(diff%3600000/60000);
  const s=Math.floor(diff%60000/1000);
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

const cal = new URL("https://calendar.google.com/calendar/render");
cal.searchParams.set("action","TEMPLATE");
cal.searchParams.set("text","Wedding of Kavidu & Sanji");
cal.searchParams.set("dates","20270120T123000Z/20270120T160000Z");
cal.searchParams.set("details","Wedding celebration of Kavidu & Sanji.");
cal.searchParams.set("location","Saffron Beach Hotel, Sri Wickrama Road, Wadduwa, Sri Lanka");
document.getElementById("calendarBtn").href = cal.toString();

const photoFiles = {
  hero:"assets/photos/hero.jpg",
  photo1:"assets/photos/photo1.jpg",
  photo2:"assets/photos/photo2.jpg",
  photo3:"assets/photos/photo3.jpg",
  photo4:"assets/photos/photo4.jpg",
  closing:"assets/photos/closing.jpg"
};
Object.entries(photoFiles).forEach(([key,src])=>{
  const box=document.querySelector(`[data-photo="${key}"]`);
  if(!box) return;
  const img=new Image();
  img.onload=()=>{ box.innerHTML=""; box.appendChild(img); };
  img.src=src;
});
