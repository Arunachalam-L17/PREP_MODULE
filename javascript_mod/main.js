console.log("Welcome to the Community Portal")

window.addEventListener("load",()=>alert("Page fully loaded"))

class Event{
constructor(name,date,seats,category){
this.name=name
this.date=date
this.seats=seats
this.category=category
}
}

Event.prototype.checkAvailability=function(){
return new Date(this.date)>new Date()&&this.seats>0
}

const events=[
new Event("Music Festival","2027-05-10",50,"Music"),
new Event("Baking Workshop","2027-06-15",20,"Workshop"),
new Event("Football Tournament","2027-07-20",30,"Sports"),
new Event("Old Event","2022-01-01",0,"Music")
]

const eventName="Community Meetup"
const eventDate="2027-08-10"
let seats=100
const eventInfo=`${eventName} on ${eventDate} has ${seats} seats`
console.log(eventInfo)

function addEvent(event=new Event("New Event","2027-09-01",10,"Workshop")){
events.push(event)
}

function createRegistrationTracker(){
let total=0
return()=>{
total++
return total
}
}

const trackMusic=createRegistrationTracker()

function registerUser(eventName){
try{
const event=events.find(e=>e.name===eventName)
if(!event)throw new Error("Event not found")
if(event.seats<=0)throw new Error("No seats available")
event.seats--
if(event.category==="Music"){
console.log("Music Registrations:",trackMusic())
}
renderEvents(currentEvents)
}
catch(error){
message.innerHTML=`<span class="error">${error.message}</span>`
}
}

function cancelRegistration(eventName){
const event=events.find(e=>e.name===eventName)
if(event){
event.seats++
renderEvents(currentEvents)
}
}

function filterEventsByCategory(category,callback){
const filtered=[...events].filter(e=>category==="All"||e.category===category)
callback(filtered)
}

events.forEach(event=>{
Object.entries(event).forEach(([key,value])=>console.log(key,value))
})

const musicEvents=events.filter(e=>e.category==="Music")
console.log(musicEvents)

const cards=events.map(e=>`Workshop on ${e.name}`)
console.log(cards)

const container=document.querySelector("#eventsContainer")
const categoryFilter=document.querySelector("#categoryFilter")
const searchBox=document.querySelector("#searchBox")
const eventSelect=document.querySelector("#eventSelect")
const form=document.querySelector("#registrationForm")
const spinner=document.querySelector("#spinner")
const message=document.querySelector("#message")

let currentEvents=[...events]

function renderEvents(list){
container.innerHTML=""
eventSelect.innerHTML=""
list.forEach(event=>{
if(event.checkAvailability()){
const card=document.createElement("div")
card.className="event-card"
card.innerHTML=`
<h3>${event.name}</h3>
<p>Date: ${event.date}</p>
<p>Category: ${event.category}</p>
<p>Seats: ${event.seats}</p>
<button onclick="registerUser('${event.name}')">Register</button>
<button onclick="cancelRegistration('${event.name}')">Cancel</button>
`
container.appendChild(card)
const option=document.createElement("option")
option.value=event.name
option.textContent=event.name
eventSelect.appendChild(option)
}
else{
console.log(`${event.name} hidden`)
}
})
}

categoryFilter.onchange=e=>{
filterEventsByCategory(e.target.value,result=>{
currentEvents=result
renderEvents(result)
})
}

searchBox.addEventListener("keydown",()=>{
setTimeout(()=>{
const keyword=searchBox.value.toLowerCase()
const filtered=events.filter(e=>e.name.toLowerCase().includes(keyword))
renderEvents(filtered)
},0)
})

fetch("https://jsonplaceholder.typicode.com/posts")
.then(res=>res.json())
.then(data=>console.log("Promise Data",data))
.catch(err=>console.error(err))

async function fetchEvents(){
try{
spinner.style.display="block"
const response=await fetch("https://jsonplaceholder.typicode.com/posts")
const data=await response.json()
console.log("Async Data",data)
}
catch(error){
console.error(error)
}
finally{
spinner.style.display="none"
}
}

form.addEventListener("submit",async e=>{
e.preventDefault()
console.log("Form Submission Started")
const name=form.elements.name.value.trim()
const email=form.elements.email.value.trim()
const selectedEvent=form.elements.event.value
if(!name||!email){
message.innerHTML='<span class="error">All fields are required</span>'
return
}
const payload={name,email,event:selectedEvent}
console.log("Payload",payload)
try{
spinner.style.display="block"
await new Promise(resolve=>setTimeout(resolve,2000))
const response=await fetch("https://jsonplaceholder.typicode.com/posts",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
})
if(response.ok){
message.innerHTML='<span class="success">Registration Successful</span>'
registerUser(selectedEvent)
}
else{
throw new Error("Registration Failed")
}
}
catch(error){
message.innerHTML=`<span class="error">${error.message}</span>`
}
finally{
spinner.style.display="none"
}
})

$("#registerBtn").click(function(){
$("#message").fadeIn()
$(".event-card").fadeOut(200).fadeIn(200)
})

const clonedEvents=[...events]
const[firstEvent]=clonedEvents
const{name,date,seats:availableSeats,category}=firstEvent
console.log(name,date,availableSeats,category)

console.log("Use Chrome DevTools Console and Network tab to inspect requests and variables")
console.log("React and Vue offer component-based development and better state management")

renderEvents(events)
fetchEvents()