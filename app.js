const destinations = [
  {id:'goa',name:'Goa',region:'Goa',style:'beach',cost:3800,rating:4.7,best:'Nov – Feb',image:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',summary:'Sunlit beaches, Portuguese heritage and unforgettable coastal food.',interests:['food','nature','adventure'],attractions:['Palolem Beach','Fontainhas','Dudhsagar Falls']},
  {id:'manali',name:'Manali',region:'Himachal Pradesh',style:'mountain',cost:3400,rating:4.8,best:'Oct – Jun',image:'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=900&q=80',summary:'A cool mountain base for cedar forests, cafés and Himalayan adventure.',interests:['nature','adventure'],attractions:['Solang Valley','Hadimba Temple','Old Manali']},
  {id:'jaipur',name:'Jaipur',region:'Rajasthan',style:'heritage',cost:3100,rating:4.6,best:'Oct – Mar',image:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',summary:'Palaces, bazaars and living craft traditions in the Pink City.',interests:['culture','food'],attractions:['Amber Fort','City Palace','Hawa Mahal']},
  {id:'munnar',name:'Munnar',region:'Kerala',style:'mountain',cost:2700,rating:4.7,best:'Sep – Mar',image:'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80',summary:'Rolling tea gardens, misty viewpoints and gentle nature walks.',interests:['nature','food'],attractions:['Tea Museum','Eravikulam Park','Top Station']},
  {id:'varanasi',name:'Varanasi',region:'Uttar Pradesh',style:'heritage',cost:2300,rating:4.5,best:'Oct – Mar',image:'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=900&q=80',summary:'Ancient lanes, riverside rituals and a deeply layered cultural experience.',interests:['culture','food'],attractions:['Dashashwamedh Ghat','Sarnath','Kashi Vishwanath']},
  {id:'coorg',name:'Coorg',region:'Karnataka',style:'wildlife',cost:3200,rating:4.6,best:'Oct – Apr',image:'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',summary:'Coffee country with rainforest walks, waterfalls and quiet stays.',interests:['nature','adventure','food'],attractions:['Abbey Falls','Raja’s Seat','Dubare Elephant Camp']}
];
let wishlist = JSON.parse(localStorage.getItem('yatraSmartWishlist') || '[]');
const API_BASE_URL = 'http://localhost:4000/api';
const imageBySlug = {goa:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',manali:'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=900&q=80',jaipur:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',munnar:'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80'};
const $ = s => document.querySelector(s);
const grid=$('#destinationGrid'), wishCount=$('#wishCount'), toast=$('#toast');
function money(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n)}
function showToast(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
function saveWishlist(){localStorage.setItem('yatraSmartWishlist',JSON.stringify(wishlist));wishCount.textContent=wishlist.length}
function matches(d){const q=$('#searchInput').value.toLowerCase().trim(),style=$('#styleFilter').value,budget=$('#budgetFilter').value;const search=!q||[d.name,d.region,d.style,d.summary,...d.interests].join(' ').toLowerCase().includes(q);const styleOK=style==='all'||d.style===style;const budgetOK=budget==='all'||(budget==='low'&&d.cost<2500)||(budget==='mid'&&d.cost>=2500&&d.cost<=5000)||(budget==='high'&&d.cost>5000);return search&&styleOK&&budgetOK}
function renderDestinations(){const items=destinations.filter(matches);$('#resultsCount').textContent=`${items.length} ${items.length===1?'destination':'destinations'} found`;grid.innerHTML=items.length?items.map(d=>`<article class="destination-card"><img src="${d.image}" alt="${d.name}, ${d.region}"><button class="save-card" data-save="${d.id}" aria-label="Save ${d.name}">${wishlist.includes(d.id)?'♥':'♡'}</button><div class="card-content"><div class="meta"><span>${d.region}</span><span>★ ${d.rating}</span></div><h3>${d.name}</h3><div class="meta"><span>${d.style}</span><span>from ${money(d.cost)}/day</span></div><span class="tag">Best: ${d.best}</span><div class="card-actions"><button data-detail="${d.id}">View details</button><button data-plan="${d.id}">Plan trip</button></div></div></article>`).join(''):'<p class="empty">No destinations match those filters. Try clearing a filter.</p>'}
function destination(id){return destinations.find(d=>d.id===id)}
function openModal(id){const d=destination(id);$('#modalContent').innerHTML=`<h2>${d.name}</h2><p class="meta">${d.region} · ★ ${d.rating} traveller rating</p><img class="detail-hero" src="${d.image}" alt="${d.name}"><p>${d.summary}</p><div class="detail-grid"><div><small>Indicative daily cost</small><strong>${money(d.cost)}</strong></div><div><small>Best season</small><strong>${d.best}</strong></div></div><h3>Suggested experiences</h3><ul>${d.attractions.map(a=>`<li>${a}</li>`).join('')}</ul><button class="primary-button" data-plan="${d.id}">Plan ${d.name} <span>→</span></button>`;$('#destinationModal').classList.add('open');$('#destinationModal').setAttribute('aria-hidden','false')}
function closeModals(){document.querySelectorAll('.modal').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')})}
function renderWishlist(){const items=wishlist.map(destination).filter(Boolean);$('#wishlistContent').innerHTML=items.length?items.map(d=>`<article class="wishlist-row"><strong>${d.name}</strong><span>${d.region} · from ${money(d.cost)}/day</span><button class="text-button" data-save="${d.id}">Remove</button></article>`).join(''):'<p class="empty">Nothing saved yet. Tap the heart on a destination to keep it here.</p>'}
function planFor(id){$('#tripDestination').value=id;closeModals();location.hash='planner';showToast(`${destination(id).name} added to your trip form`) }
function recommendDemo(event){event.preventDefault();const d=destination($('#tripDestination').value),start=new Date($('#startDate').value),end=new Date($('#endDate').value),travellers=Number($('#travellers').value),budget=Number($('#tripBudget').value);if(!d||Number.isNaN(start)||Number.isNaN(end)||end<start){showToast('Choose valid start and end dates.');return}const days=Math.floor((end-start)/86400000)+1,interests=[...document.querySelectorAll('.interest-options input:checked')].map(x=>x.value),daily=budget/(days*travellers);const ranked=destinations.map(x=>({d:x,score:x.interests.filter(i=>interests.includes(i)).length*3+(x.cost<=daily?2:0)+(x.id===d.id?2:0)})).sort((a,b)=>b.score-a.score).slice(0,3);const estimate=Math.round(d.cost*days*travellers);$('#recommendationBox').innerHTML=`<div class="recommendation-list">${ranked.map(({d:x})=>`<article><p class="match">${x.id===d.id?'Your selected destination':'Good alternative'}</p><h3>${x.name}</h3><p>${x.interests.filter(i=>interests.includes(i)).length?`Matches ${x.interests.filter(i=>interests.includes(i)).join(' and ')}`:'Fits your travel budget'}.</p><p><strong>${money(x.cost)}/day</strong> · ★ ${x.rating}</p></article>`).join('')}</div>`;const budgetStatus=estimate<=budget?`within your ₹${budget.toLocaleString('en-IN')} target`:`about ₹${(estimate-budget).toLocaleString('en-IN')} over your target`;showToast(`${days}-day estimate for ${travellers}: ${money(estimate)} — ${budgetStatus}.`);location.hash='recommendations'}

destinations.forEach(d=>$('#tripDestination').insertAdjacentHTML('beforeend',`<option value="${d.id}">${d.name}, ${d.region}</option>`));
async function loadDestinationsFromApi(){try{const response=await fetch(`${API_BASE_URL}/destinations`);if(!response.ok)throw new Error('Destination API unavailable');const apiDestinations=await response.json(),interestByCategory={beach:['food','nature','adventure'],mountain:['nature','adventure'],heritage:['culture','food'],wildlife:['nature','adventure']};destinations.splice(0,destinations.length,...apiDestinations.map(d=>({id:d.id,name:d.name,region:`${d.city}, ${d.state}`,style:d.category,cost:Number(d.dailyCost),rating:Number(d.rating),best:d.bestSeason,image:d.imageUrl||imageBySlug[d.slug]||'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',summary:d.summary,interests:interestByCategory[d.category]||['nature'],attractions:(d.attractions||[]).map(a=>a.name)})));$('#tripDestination').innerHTML=destinations.map(d=>`<option value="${d.id}">${d.name}, ${d.region}</option>`).join('');renderDestinations()}catch(error){console.warn('Using demo destination data because the API is not running.',error)}}
const today=new Date().toISOString().slice(0,10);$('#startDate').min=today;$('#endDate').min=today;$('#startDate').value=today;const after=new Date();after.setDate(after.getDate()+3);$('#endDate').value=after.toISOString().slice(0,10);
['searchInput','styleFilter','budgetFilter'].forEach(id=>$('#'+id).addEventListener('input',renderDestinations));$('#clearFilters').addEventListener('click',()=>{$('#searchInput').value='';$('#styleFilter').value='all';$('#budgetFilter').value='all';renderDestinations()});
document.addEventListener('click',e=>{const id=e.target.dataset.save;if(id){toggleWishlist(id);return}if(e.target.dataset.detail)openModal(e.target.dataset.detail);if(e.target.dataset.plan)planFor(e.target.dataset.plan);if(e.target.matches('[data-close-modal]')||e.target.classList.contains('modal'))closeModals()});
$('#wishlistButton').addEventListener('click',()=>{renderWishlist();$('#wishlistModal').classList.add('open');$('#wishlistModal').setAttribute('aria-hidden','false')});$('#tripForm').addEventListener('submit',recommend);$('.menu-toggle').addEventListener('click',e=>{const open=$('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open)});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>$('nav').classList.remove('open')));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});saveWishlist();renderDestinations();loadDestinationsFromApi();

let authMode='login';
let session=JSON.parse(localStorage.getItem('yatraSmartSession')||'null');
function updateAuthUI(){const button=$('#authButton'),popover=$('#accountPopover');button.textContent=session?`Hi, ${session.user.name.split(' ')[0]}`:'Sign in';$('#accountName').textContent=session?session.user.name:'Your account';if(!session)popover.hidden=true;loadMyTrips();loadWishlist()}
function openAuth(){if(session){const popover=$('#accountPopover');popover.hidden=!popover.hidden;return}$('#authModal').classList.add('open');$('#authModal').setAttribute('aria-hidden','false')}
function signOut(){localStorage.removeItem('yatraSmartSession');session=null;$('#accountPopover').hidden=true;updateAuthUI();showToast('Signed out.')}
function renderAuthMode(){const register=authMode==='register';$('#authForm').classList.toggle('register',register);$('#authKicker').textContent=register?'START YOUR JOURNEY':'WELCOME BACK';$('#authTitle').textContent=register?'Create account':'Sign in';$('#authSubtitle').textContent=register?'Create an account to save plans to PostgreSQL.':'Sign in to save trips to your account.';$('#authSubmit').innerHTML=`${register?'Create account':'Sign in'} <span>→</span>`;$('#authSwitch').textContent=register?'Already have an account? Sign in':'New here? Create an account';$('#authPassword').autocomplete=register?'new-password':'current-password';$('#authName').required=register}
async function authenticate(event){event.preventDefault();const name=$('#authName').value.trim(),email=$('#authEmail').value.trim(),password=$('#authPassword').value;const endpoint=authMode==='register'?'/auth/register':'/auth/login';const payload=authMode==='register'?{name,email,password}:{email,password};try{const response=await fetch(`${API_BASE_URL}${endpoint}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),data=await response.json();if(!response.ok)throw new Error(data.error?.message||'Unable to sign in.');session={token:data.token,user:data.user};localStorage.setItem('yatraSmartSession',JSON.stringify(session));updateAuthUI();closeModals();event.target.reset();showToast(`Welcome, ${data.user.name}. Your account is connected.`)}catch(error){showToast(error.message)}}
async function recommend(event){event.preventDefault();const d=destination($('#tripDestination').value),start=new Date($('#startDate').value),end=new Date($('#endDate').value),travellers=Number($('#travellers').value),budget=Number($('#tripBudget').value);if(!d||Number.isNaN(start)||Number.isNaN(end)||end<start){showToast('Choose valid start and end dates.');return}const days=Math.floor((end-start)/86400000)+1,interests=[...document.querySelectorAll('.interest-options input:checked')].map(x=>x.value),daily=budget/(days*travellers);const ranked=destinations.map(x=>({d:x,score:x.interests.filter(i=>interests.includes(i)).length*3+(x.cost<=daily?2:0)+(x.id===d.id?2:0)})).sort((a,b)=>b.score-a.score).slice(0,3),estimate=Math.round(d.cost*days*travellers);$('#recommendationBox').innerHTML=`<div class="recommendation-list">${ranked.map(({d:x})=>`<article><p class="match">${x.id===d.id?'Your selected destination':'Good alternative'}</p><h3>${x.name}</h3><p>${x.interests.filter(i=>interests.includes(i)).length?`Matches ${x.interests.filter(i=>interests.includes(i)).join(' and ')}`:'Fits your travel budget'}.</p><p><strong>${money(x.cost)}/day</strong> · ★ ${x.rating}</p></article>`).join('')}</div>`;location.hash='recommendations';if(!session){showToast(`Estimate: ${money(estimate)}. Sign in to save this trip.`);return}try{const response=await fetch(`${API_BASE_URL}/trips`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${session.token}`},body:JSON.stringify({destinationId:d.id,title:`My ${d.name} Adventure`,startDate:$('#startDate').value,endDate:$('#endDate').value,travelers:travellers,budget,travelStyle:$('#tripStyle').value})}),data=await response.json();if(!response.ok)throw new Error(data.error?.message||'Trip could not be saved.');showToast(`Trip saved: ${data.title}.`)}catch(error){showToast(error.message)}}
$('#authButton').addEventListener('click',openAuth);$('#authSwitch').addEventListener('click',()=>{authMode=authMode==='login'?'register':'login';renderAuthMode()});$('#authForm').addEventListener('submit',authenticate);updateAuthUI();renderAuthMode();

// Keep the calculated total visible in the page, rather than only in the toast message.
function showEstimateSummary(){
  const selected=destination($('#tripDestination').value);
  const start=new Date($('#startDate').value);
  const end=new Date($('#endDate').value);
  const travellers=Number($('#travellers').value);
  const budget=Number($('#tripBudget').value);
  if(!selected||Number.isNaN(start)||Number.isNaN(end)||end<start||!travellers||!budget)return;
  const days=Math.floor((end-start)/86400000)+1;
  const estimatedTotal=Math.round(selected.cost*days*travellers);
  const difference=budget-estimatedTotal;
  const status=difference>=0?`₹${difference.toLocaleString('en-IN')} under your budget`:`₹${Math.abs(difference).toLocaleString('en-IN')} over your budget`;
  const result=document.createElement('article');
  result.className='estimate-summary';
  result.innerHTML=`<p class="match">YOUR TRIP ESTIMATE</p><h3>${selected.name} · ${days} day${days===1?'':'s'}</h3><div class="estimate-amount">${money(estimatedTotal)}</div><p>${travellers} traveller${travellers===1?'':'s'} × ${money(selected.cost)}/day</p><p class="estimate-status ${difference>=0?'on-budget':'over-budget'}">${status}</p>`;
  $('#recommendationBox').prepend(result);
}

$('#tripForm').addEventListener('submit',showEstimateSummary);

function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]))}
function tripDate(value){return new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric'}).format(new Date(value))}
async function loadMyTrips(){
  const container=$('#tripsContent');
  if(!container)return;
  if(!session){container.innerHTML='<p class="empty">Sign in to see trips saved to your account.</p>';return}
  container.innerHTML='<p class="loading-trips">Loading your saved trips...</p>';
  try{
    const response=await fetch(`${API_BASE_URL}/trips`,{headers:{Authorization:`Bearer ${session.token}`}});
    const data=await response.json();
    if(response.status===401){localStorage.removeItem('yatraSmartSession');session=null;$('#authButton').textContent='Sign in';container.innerHTML='<p class="empty">Your session has expired. Please sign in again.</p>';return}
    if(!response.ok)throw new Error(data.error?.message||'Trips could not be loaded.');
    if(!data.length){container.innerHTML='<p class="empty">No saved trips yet. Create an estimate above to save your first trip.</p>';return}
    container.innerHTML=`<div class="trip-grid">${data.map(trip=>`<article class="trip-card"><p class="match">${escapeHtml(trip.status||'PLANNING')}</p><h3>${escapeHtml(trip.destination?.name||trip.title)}</h3><p class="trip-title">${escapeHtml(trip.title)}</p><div class="trip-dates">${tripDate(trip.startDate)} - ${tripDate(trip.endDate)}</div><dl><div><dt>Travellers</dt><dd>${Number(trip.travelers)||1}</dd></div><div><dt>Budget</dt><dd>${money(Number(trip.budget))}</dd></div><div><dt>Style</dt><dd>${escapeHtml(trip.travelStyle||'Flexible')}</dd></div></dl></article>`).join('')}</div>`;
  }catch(error){container.innerHTML=`<p class="empty">${escapeHtml(error.message||'Trips could not be loaded.')} Try refreshing.</p>`}
}

$('#refreshTrips').addEventListener('click',loadMyTrips);
$('#tripForm').addEventListener('submit',()=>setTimeout(loadMyTrips,1200));

function socialAuth(provider){
  const label={google:'Google',facebook:'Facebook',phone:'phone'}[provider]||provider;
  showToast(`${label} sign-in needs to be enabled in Supabase Auth. Email sign-in is available now.`);
}

document.querySelectorAll('[data-auth-provider]').forEach(button=>button.addEventListener('click',()=>socialAuth(button.dataset.authProvider)));

$('#logoutButton').addEventListener('click',signOut);

function startHeroSlideshow(){
  let index=0;
  const updateHero=()=>{
    const place=destinations[index%destinations.length];
    if(!place)return;
    const visual=$('#heroVisual');
    visual.style.backgroundImage=`linear-gradient(0deg,rgba(21,57,62,.34),rgba(21,57,62,.04)),url('${place.image}')`;
    $('#heroPlace').textContent=`${place.name}, ${place.region.split(',').pop().trim()}`;
    $('#heroRating').textContent=place.rating;
    $('#heroLabel').textContent=`Discover ${place.style} escapes`;
    visual.setAttribute('aria-label',`Featured destination: ${place.name}`);
    index+=1;
  };
  updateHero();
  setInterval(updateHero,4500);
}

startHeroSlideshow();

async function loadWishlist(){
  if(!session){wishlist=[];saveWishlist();renderDestinations();return}
  try{
    const response=await fetch(`${API_BASE_URL}/wishlist`,{headers:{Authorization:`Bearer ${session.token}`}});
    const data=await response.json();
    if(response.status===401)return;
    if(!response.ok)throw new Error(data.error?.message||'Wishlist could not be loaded.');
    wishlist=data.map(item=>item.destinationId).filter(Boolean);
    saveWishlist();renderDestinations();renderWishlist();
  }catch(error){console.warn('Wishlist could not be loaded.',error)}
}

async function toggleWishlist(destinationId){
  if(!session){$('#authModal').classList.add('open');$('#authModal').setAttribute('aria-hidden','false');showToast('Sign in to save places to your account.');return}
  const isSaved=wishlist.includes(destinationId);
  try{
    const response=await fetch(isSaved?`${API_BASE_URL}/wishlist/${destinationId}`:`${API_BASE_URL}/wishlist`,{
      method:isSaved?'DELETE':'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.token}`},
      body:isSaved?undefined:JSON.stringify({destinationId})
    });
    const data=response.status===204?null:await response.json();
    if(!response.ok)throw new Error(data?.error?.message||'Wishlist could not be updated.');
    wishlist=isSaved?wishlist.filter(id=>id!==destinationId):[...wishlist,destinationId];
    saveWishlist();renderDestinations();renderWishlist();showToast(isSaved?'Removed from wishlist.':'Saved to wishlist.');
  }catch(error){showToast(error.message||'Wishlist could not be updated.')}
}
