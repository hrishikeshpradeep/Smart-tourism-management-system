const destinations = [
  {id:'goa',name:'Goa',region:'Goa',style:'beach',cost:4200,rating:4.7,best:'Nov – Feb',image:'assets/place-goa.jpg',summary:'Sunlit beaches, Portuguese heritage and unforgettable coastal food.',interests:['food','nature','adventure'],attractions:['Palolem Beach','Fontainhas','Dudhsagar Falls']},
  {id:'manali',name:'Manali',region:'Himachal Pradesh',style:'mountain',cost:3600,rating:4.8,best:'Oct – Jun',image:'assets/place-manali.jpg',summary:'A cool mountain base for cedar forests, cafés and Himalayan adventure.',interests:['nature','adventure'],attractions:['Solang Valley','Hadimba Temple','Old Manali']},
  {id:'jaipur',name:'Jaipur',region:'Rajasthan',style:'heritage',cost:3300,rating:4.6,best:'Oct – Mar',image:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=88',summary:'Palaces, bazaars and living craft traditions in the Pink City.',interests:['culture','food'],attractions:['Amber Fort','City Palace','Hawa Mahal']},
  {id:'munnar',name:'Munnar',region:'Kerala',style:'mountain',cost:3200,rating:4.7,best:'Sep – Mar',image:'assets/place-munnar.jpg',summary:'Rolling tea gardens, misty viewpoints and gentle nature walks.',interests:['nature','food'],attractions:['Tea Museum','Eravikulam Park','Top Station']},
  {id:'varanasi',name:'Varanasi',region:'Uttar Pradesh',style:'heritage',cost:2500,rating:4.5,best:'Oct – Mar',image:'assets/place-varanasi.jpg',summary:'Ancient lanes, riverside rituals and a deeply layered cultural experience.',interests:['culture','food'],attractions:['Dashashwamedh Ghat','Sarnath','Kashi Vishwanath']},
  {id:'coorg',name:'Coorg',region:'Karnataka',style:'wildlife',cost:3400,rating:4.6,best:'Oct – Apr',image:'assets/place-coorg-hills.png',summary:'Coffee country with rainforest walks, waterfalls and quiet stays.',interests:['nature','adventure','food'],attractions:['Abbey Falls','Raja’s Seat','Dubare Elephant Camp']}
];
destinations.push(
  {id:'kashmir',name:'Kashmir',region:'Jammu and Kashmir',style:'mountain',cost:4400,rating:4.9,best:'Apr - Oct',image:'assets/place-kashmir-snow.png',summary:'Lakes, meadow trails and mountain views in Indias most cinematic valley.',interests:['nature','adventure','culture'],attractions:['Dal Lake','Gulmarg','Pahalgam']},
  {id:'ladakh',name:'Ladakh',region:'Ladakh',style:'adventure',cost:5400,rating:4.9,best:'May - September',image:'assets/place-ladakh.jpg',summary:'High-altitude lakes, wide open roads and dramatic Himalayan landscapes.',interests:['nature','adventure','culture'],attractions:['Pangong Lake','Nubra Valley','Khardung La']},
  {id:'rishikesh',name:'Rishikesh',region:'Uttarakhand',style:'adventure',cost:2900,rating:4.7,best:'September - April',image:'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1800&q=88',summary:'River adventures, yoga retreats and peaceful Ganga-side evenings.',interests:['adventure','nature','culture'],attractions:['Laxman Jhula','River rafting','Ganga Aarti']},
  {id:'udaipur',name:'Udaipur',region:'Rajasthan',style:'heritage',cost:3800,rating:4.8,best:'October - March',image:'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=88',summary:'Romantic lakes, royal palaces and golden-hour views in the City of Lakes.',interests:['culture','food','nature'],attractions:['City Palace','Lake Pichola','Sajjangarh Palace']},
  {id:'andaman',name:'Andaman Islands',region:'Andaman and Nicobar',style:'beach',cost:6500,rating:4.8,best:'October - May',image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88',summary:'Clear water, coral reefs and quiet island beaches for a true escape.',interests:['nature','adventure','food'],attractions:['Radhanagar Beach','Cellular Jail','Scuba diving']},
  {id:'darjeeling',name:'Darjeeling',region:'West Bengal',style:'mountain',cost:3200,rating:4.6,best:'March - May',image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=88',summary:'Tea gardens, toy-train journeys and sunrise views of Kanchenjunga.',interests:['nature','food','culture'],attractions:['Tiger Hill','Toy Train','Tea estates']},
  {id:'pondicherry',name:'Pondicherry',region:'Tamil Nadu',style:'beach',cost:3300,rating:4.6,best:'October - March',image:'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1800&q=88',summary:'French-quarter streets, sea promenades and relaxed coastal cafes.',interests:['food','culture','nature'],attractions:['White Town','Auroville','Promenade Beach']},
  {id:'hampi',name:'Hampi',region:'Karnataka',style:'heritage',cost:2700,rating:4.7,best:'October - February',image:'assets/place-hampi-v2.jpg',summary:'Ancient temple ruins, boulder fields and a landscape unlike anywhere else.',interests:['culture','adventure','nature'],attractions:['Vijaya Vittala Temple','Matanga Hill','Virupaksha Temple']},
  {id:'ooty',name:'Ooty',region:'Tamil Nadu',style:'mountain',cost:3000,rating:4.6,best:'October - June',image:'assets/place-ooty-train.png',summary:'Cool weather, tea slopes and scenic train rides through the Nilgiris.',interests:['nature','food','culture'],attractions:['Ooty Lake','Doddabetta Peak','Nilgiri Mountain Railway']}
);
Object.assign(destinations.find(d=>d.id==='goa'),{cost:4200});
Object.assign(destinations.find(d=>d.id==='manali'),{cost:3600});
Object.assign(destinations.find(d=>d.id==='munnar'),{cost:3200});
Object.assign(destinations.find(d=>d.id==='jaipur'),{cost:3300});
Object.assign(destinations.find(d=>d.id==='varanasi'),{cost:2500});
Object.assign(destinations.find(d=>d.id==='coorg'),{cost:3400});
let wishlist = JSON.parse(localStorage.getItem('yatraSmartWishlist') || '[]');
const API_BASE_URL = ['localhost','127.0.0.1'].includes(window.location.hostname) ? 'http://localhost:4000/api' : '/api';
const imageBySlug = {goa:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=88',manali:'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=1800&q=88',jaipur:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=88',munnar:'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1800&q=88'};
const localPlaceImages = {goa:'assets/place-goa.jpg',manali:'assets/place-manali.jpg',munnar:'assets/place-munnar.jpg',varanasi:'assets/place-varanasi.jpg',coorg:'assets/place-coorg-hills.png',kashmir:'assets/place-kashmir-snow.png',ladakh:'assets/place-ladakh.jpg',hampi:'assets/place-hampi-v2.jpg',ooty:'assets/place-ooty-train.png'};
const placeImageTitles = {goa:'Goa',manali:'Manali,_Himachal_Pradesh',jaipur:'Hawa_Mahal',munnar:'Munnar',varanasi:'Varanasi',coorg:'Kodagu_district',kashmir:'Dal_Lake',ladakh:'Ladakh',rishikesh:'Rishikesh',udaipur:'Udaipur',andaman:'Andaman_and_Nicobar_Islands',darjeeling:'Darjeeling',pondicherry:'Puducherry',hampi:'Hampi',ooty:'Ooty'};
const destinationPalettes = {
  goa:['#146e83','#83c8d0','#e8f5f4'], manali:['#496d87','#afc9d8','#eef4f7'], jaipur:['#825331','#d5ad78','#f8eee2'],
  munnar:['#41744f','#9fc29a','#edf4e9'], varanasi:['#815d45','#d9b387','#f7eee4'], coorg:['#4d7138','#b9cf9a','#f1f6ea'],
  kashmir:['#4f7895','#b7d4e6','#eff7fb'], ladakh:['#8a6447','#d9bd97','#f7efe6'], rishikesh:['#397369','#9ec8be','#edf6f3'],
  udaipur:['#655f85','#bcb4d4','#f1eff7'], andaman:['#167c8a','#9ed7d5','#eaf7f6'], darjeeling:['#517766','#a8c8ad','#eff5ef'],
  pondicherry:['#4b7491','#aecadd','#eff5f9'], hampi:['#8b613b','#d7b287','#f8f0e6'], ooty:['#285e52','#8dbbab','#edf7f3']
};
function usePlaceSpecificImages(){/* Local, curated imagery is used to avoid mismatched automatic photos. */}
const $ = s => document.querySelector(s);
const grid=$('#destinationGrid'), wishCount=$('#wishCount'), toast=$('#toast');
function money(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n)}
function showToast(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
function saveWishlist(){localStorage.setItem('yatraSmartWishlist',JSON.stringify(wishlist));wishCount.textContent=wishlist.length}
function matches(d){const q=$('#searchInput').value.toLowerCase().trim(),style=$('#styleFilter').value,budget=$('#budgetFilter').value;const search=!q||[d.name,d.region,d.style,d.summary,...d.interests].join(' ').toLowerCase().includes(q);const styleOK=style==='all'||d.style===style;const budgetOK=budget==='all'||(budget==='low'&&d.cost<2500)||(budget==='mid'&&d.cost>=2500&&d.cost<=5000)||(budget==='high'&&d.cost>5000);return search&&styleOK&&budgetOK}
function renderDestinations(){const items=destinations.filter(matches);$('#resultsCount').textContent=`${items.length} ${items.length===1?'destination':'destinations'} found`;grid.innerHTML=items.length?items.map(d=>`<article class="destination-card"><button class="destination-image-button" data-detail="${d.id}" aria-label="View details for ${d.name}"><img src="${d.image}" alt="${d.name}, ${d.region}"><span>Explore ${d.name} <b>↗</b></span></button><button class="save-card" data-save="${d.id}" aria-label="Save ${d.name}">${wishlist.includes(d.id)?'♥':'♡'}</button><div class="card-content"><div class="meta"><span>${d.region}</span><span>★ ${d.rating}</span></div><h3>${d.name}</h3><div class="meta"><span>${d.style}</span><span>from ${money(d.cost)}/day</span></div><span class="tag">Best: ${d.best}</span><div class="card-actions"><button data-detail="${d.id}">View details</button><button data-plan="${d.id}">Plan trip</button></div></div></article>`).join(''):'<p class="empty">No destinations match those filters. Try clearing a filter.</p>'}
function destination(id){return destinations.find(d=>d.id===id)}
let routeStopIds=JSON.parse(localStorage.getItem('smartYatraRouteStops')||'[]');
const routeKey=place=>place?.slug||place?.id;
function persistRoute(){localStorage.setItem('smartYatraRouteStops',JSON.stringify(routeStopIds))}
function renderTravelAssistant(){
  const picker=$('#routeDestinationSelect'),stops=$('#routeStops'),crowd=$('#crowdInsights'),services=$('#localServices');
  if(!picker||!stops||!crowd||!services)return;
  picker.innerHTML=destinations.map(d=>`<option value="${d.id}">${formatDestinationOption(d)}</option>`).join('');
  routeStopIds=routeStopIds.filter(id=>destination(id));
  const places=routeStopIds.map(destination).filter(Boolean),selected=destination($('#tripDestination')?.value)||places[0]||destinations[0];
  stops.innerHTML=places.length?places.map((place,index)=>`<div class="route-stop"><b>${String(index+1).padStart(2,'0')}</b><span><strong>${place.name}</strong><small>${place.region}</small></span><button data-remove-route="${place.id}" aria-label="Remove ${place.name}">×</button></div>`).join(''):'<p class="route-empty">Add two or more destinations to create a multi-stop city route.</p>';
  const crowdLevel=selected?.style==='heritage'?'High':selected?.style==='beach'?'Moderate':'Comfortable';
  crowd.innerHTML=selected?`<div class="crowd-badge ${crowdLevel.toLowerCase()}">${crowdLevel}</div><h4>${selected.name} visitor outlook</h4><p>Best window: <strong>early morning or late afternoon</strong>. The suggested route places this stop away from peak visitor hours.</p><small>Planning estimate — not live crowd data.</small>`:'';
  const serviceCopy={beach:['Seaside Haven Hotel','Coastal Table','Private cab from ₹1,200'],mountain:['Valley View Stay','Hillside Kitchen','Day cab from ₹1,600'],heritage:['Heritage Courtyard','Local Flavours','City cab from ₹1,000'],wildlife:['Forest Edge Lodge','Plantation Café','Day cab from ₹1,500'],adventure:['Trailside Camp','Explorer’s Kitchen','4×4 cab from ₹2,200']}[selected?.style]||['Local Stay','Neighbourhood Kitchen','Cab on request'];
  services.innerHTML=`<div class="service-group"><span>STAY NEAR ${selected?.name||'YOUR DESTINATION'}</span><strong>${serviceCopy[0]}</strong><small>Comfortable base for your day plan</small></div><div class="service-group"><span>LOCAL DINING</span><strong>${serviceCopy[1]}</strong><small>Popular regional flavours nearby</small></div><div class="vehicle-options"><p>VEHICLE OPTIONS</p>${['Compact cab','SUV / family','Tempo traveller'].map((vehicle,index)=>`<button data-vehicle="${vehicle}" type="button"><span>${vehicle}</span><b>${index===0?serviceCopy[2]:index===1?'From ₹2,000':'From ₹3,400'}</b></button>`).join('')}</div>`;
  persistRoute();
  if(selected)loadTravelServices(selected);
}
async function loadTravelServices(place){
  const key=routeKey(place),services=$('#localServices');
  if(!key||!services)return;
  try{
    const response=await fetch(`${API_BASE_URL}/destinations/${encodeURIComponent(key)}/services`);
    if(!response.ok)throw new Error('Services unavailable');
    const providers=await response.json();
    if(routeKey(destination($('#tripDestination')?.value))!==key)return;
    const byType=type=>providers.filter(provider=>provider.providerType===type);
    const first=type=>byType(type)[0];
    const hotel=first('HOTEL'),restaurant=first('RESTAURANT'),vehicles=byType('VEHICLE');
    services.innerHTML=`<div class="service-group"><span>STAY NEAR ${place.name}</span><strong>${hotel?.name||'No stay listed yet'}</strong><small>${hotel?`From ${money(Number(hotel.priceFrom||0))} · ${hotel.description}`:'Add provider data from the administrator dashboard.'}</small></div><div class="service-group"><span>LOCAL DINING</span><strong>${restaurant?.name||'No dining listing yet'}</strong><small>${restaurant?`From ${money(Number(restaurant.priceFrom||0))} · ${restaurant.description}`:'Add provider data from the administrator dashboard.'}</small></div><div class="vehicle-options"><p>VEHICLE OPTIONS</p>${vehicles.length?vehicles.map(vehicle=>`<button data-vehicle="${vehicle.name}" data-provider-id="${vehicle.id}" type="button"><span>${vehicle.name}</span><b>From ${money(Number(vehicle.priceFrom||0))}</b></button>`).join(''):'<small>No vehicle providers are listed yet.</small>'}</div>`;
  }catch{ /* The card keeps its useful local planning fallback until the API is reachable. */ }
}
function addRouteStop(id){if(!destination(id))return;if(routeStopIds.includes(id)){showToast('That place is already in your route.');return}routeStopIds.push(id);renderTravelAssistant();showToast(`${destination(id).name} added to your route.`)}
function optimiseRoute(){if(routeStopIds.length<2){showToast('Add at least two places to optimise your route.');return}routeStopIds.sort((a,b)=>{const order={heritage:1,food:2,beach:3,mountain:4,wildlife:5,adventure:6};return (order[destination(a)?.style]||9)-(order[destination(b)?.style]||9)});renderTravelAssistant();showToast('Your route is organised for a smoother day of travel.');}
function openModal(id){const d=destination(id),[primary,accent,soft]=destinationPalettes[d.slug||d.id]||destinationPalettes.goa,mapQuery=encodeURIComponent(`${d.name}, ${d.region}, India`);$('#modalContent').innerHTML=`<article class="destination-detail" style="--place-primary:${primary};--place-accent:${accent};--place-soft:${soft}"><header class="detail-heading"><div><p class="detail-kicker">CURATED ESCAPE</p><h2>${d.name}</h2><p class="detail-location">${d.region} <span>•</span> ★ ${d.rating} traveller rating</p></div><a class="map-link" href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener noreferrer" aria-label="Open ${d.name} in Google Maps"><span aria-hidden="true">⌖</span> Open in Maps</a></header><div class="place-image-frame"><img class="detail-hero" src="${d.image}" alt="${d.name}, ${d.region}"><span class="place-image-caption">${d.style} escape</span></div><p class="detail-summary">${d.summary}</p><div class="detail-cubes"><div class="detail-cube"><span class="cube-icon">₹</span><small>Daily budget</small><strong>${money(d.cost)}</strong><em>per traveller</em></div><div class="detail-cube"><span class="cube-icon">☀</span><small>Ideal season</small><strong>${d.best}</strong><em>best weather window</em></div></div><section class="experiences"><p class="detail-kicker">MAKE IT YOURS</p><h3>Suggested experiences</h3><div class="experience-list">${d.attractions.map((a,index)=>`<span><b>${String(index+1).padStart(2,'0')}</b>${a}</span>`).join('')}</div></section><div class="detail-actions"><button class="primary-button detail-plan" data-plan="${d.id}">Plan ${d.name} <span>→</span></button><button class="detail-wishlist" data-open-wishlist type="button">♡ Go to wishlist</button><a class="detail-map-secondary" href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener noreferrer">View location <span>↗</span></a></div></article>`;$('#destinationModal').classList.add('open');$('#destinationModal').setAttribute('aria-hidden','false')}
function closeModals(){document.querySelectorAll('.modal').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')})}
function renderWishlist(){const items=wishlist.map(destination).filter(Boolean);$('#wishlistContent').innerHTML=items.length?items.map(d=>`<article class="wishlist-row"><img src="${d.image}" alt="${d.name}, ${d.region}"><div class="wishlist-place"><p>${d.region}</p><strong>${d.name}</strong><span>★ ${d.rating} · from ${money(d.cost)}/day</span></div><div class="wishlist-actions"><button class="wishlist-plan" data-plan="${d.id}">Plan trip <span>→</span></button><button class="wishlist-remove" data-save="${d.id}" aria-label="Remove ${d.name} from saved places">Remove</button></div></article>`).join(''):'<div class="wishlist-empty"><span>♡</span><h3>Your shortlist is waiting</h3><p>Save a destination you love and it will appear here for your next plan.</p><a href="#explore" data-close-modal>Explore destinations <b>→</b></a></div>'}
function openWishlist(){closeModals();renderWishlist();$('#wishlistModal').classList.add('open');$('#wishlistModal').setAttribute('aria-hidden','false')}
function planFor(id){const selected=destination(id);$('#tripDestination').value=id;setPlannerDestinationTheme(selected);renderTravelAssistant();closeModals();location.hash='planner';showToast(`${selected.name} added to your trip form`) }
function recommendDemo(event){event.preventDefault();const d=destination($('#tripDestination').value),start=new Date($('#startDate').value),end=new Date($('#endDate').value),travellers=Number($('#travellers').value),budget=Number($('#tripBudget').value);if(!d||Number.isNaN(start)||Number.isNaN(end)||end<start){showToast('Choose valid start and end dates.');return}const days=Math.floor((end-start)/86400000)+1,interests=[...document.querySelectorAll('.interest-options input:checked')].map(x=>x.value),daily=budget/(days*travellers);const ranked=destinations.map(x=>({d:x,score:x.interests.filter(i=>interests.includes(i)).length*3+(x.cost<=daily?2:0)+(x.id===d.id?2:0)})).sort((a,b)=>b.score-a.score).slice(0,3);const estimate=Math.round(d.cost*days*travellers);$('#recommendationBox').innerHTML=`<div class="recommendation-list">${ranked.map(({d:x})=>`<article><p class="match">${x.id===d.id?'Your selected destination':'Good alternative'}</p><h3>${x.name}</h3><p>${x.interests.filter(i=>interests.includes(i)).length?`Matches ${x.interests.filter(i=>interests.includes(i)).join(' and ')}`:'Fits your travel budget'}.</p><p><strong>${money(x.cost)}/day</strong> · ★ ${x.rating}</p></article>`).join('')}</div>`;const budgetStatus=estimate<=budget?`within your ₹${budget.toLocaleString('en-IN')} target`:`about ₹${(estimate-budget).toLocaleString('en-IN')} over your target`;showToast(`${days}-day estimate for ${travellers}: ${money(estimate)} — ${budgetStatus}.`);location.hash='recommendations'}

function getCleanRegion(city,state,name){
  if(!state)return city||'';
  if(!city)return state;
  const destinationName=(name||'').toLowerCase(),normalizedCity=city.toLowerCase(),normalizedState=state.toLowerCase();
  if(normalizedCity===normalizedState)return state;
  if(normalizedState===destinationName||destinationName.includes(normalizedState))return normalizedCity===destinationName?state:city;
  if(normalizedCity===destinationName||destinationName.includes(normalizedCity))return state;
  return `${city}, ${state}`;
}
function formatDestinationOption(d){
  const name=d.name||'',region=d.region||'';
  if(!region||region.toLowerCase()===name.toLowerCase())return name;
  const remaining=region.split(',').map(part=>part.trim()).filter(part=>{
    const normalizedPart=part.toLowerCase(),normalizedName=name.toLowerCase();
    return normalizedPart!==normalizedName&&!normalizedName.includes(normalizedPart)&&!normalizedPart.includes(normalizedName);
  });
  return remaining.length?`${name}, ${remaining.join(', ')}`:name;
}
destinations.forEach(d=>$('#tripDestination').insertAdjacentHTML('beforeend',`<option value="${d.id}">${formatDestinationOption(d)}</option>`));
$('#tripDestination').addEventListener('change',event=>{setPlannerDestinationTheme(destination(event.target.value));renderTravelAssistant()});
async function loadDestinationsFromApi(){try{const response=await fetch(`${API_BASE_URL}/destinations`);if(!response.ok)throw new Error('Destination API unavailable');const apiDestinations=await response.json(),interestByCategory={beach:['food','nature','adventure'],mountain:['nature','adventure'],heritage:['culture','food'],wildlife:['nature','adventure'],nature:['nature','adventure','culture'],coastal:['food','culture','nature']},savedBeforeLoad=[...wishlist],selectedSlug=destination($('#tripDestination').value)?.slug;destinations.splice(0,destinations.length,...apiDestinations.map(d=>({id:d.id,slug:d.slug,name:d.name,region:getCleanRegion(d.city,d.state,d.name),style:d.category,cost:Number(d.dailyCost),rating:Number(d.rating),best:d.bestSeason,image:localPlaceImages[d.slug]||d.imageUrl||imageBySlug[d.slug]||'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=88',summary:d.summary,interests:interestByCategory[d.category]||['nature'],attractions:(d.attractions||[]).map(a=>a.name)})));wishlist=[...new Set(savedBeforeLoad.map(savedId=>destinations.find(d=>d.id===savedId||d.slug===savedId)?.id||savedId))];saveWishlist();$('#tripDestination').innerHTML=destinations.map(d=>`<option value="${d.id}">${formatDestinationOption(d)}</option>`).join('');const selected=destinations.find(d=>d.slug===selectedSlug)||destinations[0];if(selected){$('#tripDestination').value=selected.id;setPlannerDestinationTheme(selected)}renderDestinations();if(session)loadWishlist()}catch(error){console.warn('Using local destination data because the API is not running.',error)}}
const today=new Date().toISOString().slice(0,10);$('#startDate').min=today;$('#endDate').min=today;$('#startDate').value=today;const after=new Date();after.setDate(after.getDate()+3);$('#endDate').value=after.toISOString().slice(0,10);
['searchInput','styleFilter','budgetFilter'].forEach(id=>$('#'+id).addEventListener('input',renderDestinations));$('#clearFilters').addEventListener('click',()=>{$('#searchInput').value='';$('#styleFilter').value='all';$('#budgetFilter').value='all';renderDestinations()});
document.addEventListener('click',e=>{const id=e.target.closest('[data-save]')?.dataset.save;if(id){toggleWishlist(id);return}if(e.target.closest('[data-open-wishlist]')){openWishlist();return}const detailId=e.target.closest('[data-detail]')?.dataset.detail;if(detailId){openModal(detailId);return}const planId=e.target.closest('[data-plan]')?.dataset.plan;if(planId)planFor(planId);if(e.target.matches('[data-close-modal]')||e.target.classList.contains('modal'))closeModals()});
$('#wishlistButton').addEventListener('click',openWishlist);$('#tripForm').addEventListener('submit',recommend);$('.menu-toggle').addEventListener('click',e=>{const open=$('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open)});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>$('nav').classList.remove('open')));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});saveWishlist();renderDestinations();loadDestinationsFromApi();

let authMode='login';
let session=JSON.parse(localStorage.getItem('yatraSmartSession')||'null');
function updateAuthUI(){const button=$('#authButton'),popover=$('#accountPopover');button.textContent=session?`Hi, ${session.user.name.split(' ')[0]}`:'Sign in';$('#accountName').textContent=session?session.user.name:'Your account';if(!session)popover.hidden=true;loadMyTrips();loadWishlist()}
function closeAccountMenu(){const popover=$('#accountPopover'),settings=$('#accountSettings');popover.hidden=true;settings.hidden=true;$('#authButton').setAttribute('aria-expanded','false');$('#accountSettingsButton').setAttribute('aria-expanded','false')}
function openAuth(){if(session){const popover=$('#accountPopover'),isOpen=!popover.hidden;if(isOpen)closeAccountMenu();else{popover.hidden=false;$('#authButton').setAttribute('aria-expanded','true')}return}$('#authModal').classList.add('open');$('#authModal').setAttribute('aria-hidden','false')}
function signOut(){localStorage.removeItem('yatraSmartSession');session=null;$('#accountPopover').hidden=true;updateAuthUI();showToast('Signed out.')}
function renderAuthMode(){const register=authMode==='register';$('#authForm').classList.toggle('register',register);$('#authKicker').textContent=register?'START YOUR JOURNEY':'WELCOME BACK';$('#authTitle').textContent=register?'Create account':'Sign in';$('#authSubtitle').textContent=register?'Create an account to save plans to PostgreSQL.':'Sign in to save trips to your account.';$('#authSubmit').innerHTML=`${register?'Create account':'Sign in'} <span>→</span>`;$('#authSwitch').textContent=register?'Already have an account? Sign in':'New here? Create an account';$('#authPassword').autocomplete=register?'new-password':'current-password';$('#authName').required=register}
async function authenticate(event){event.preventDefault();const name=$('#authName').value.trim(),email=$('#authEmail').value.trim(),password=$('#authPassword').value;const endpoint=authMode==='register'?'/auth/register':'/auth/login';const payload=authMode==='register'?{name,email,password}:{email,password};try{const response=await fetch(`${API_BASE_URL}${endpoint}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),data=await response.json();if(!response.ok)throw new Error(data.error?.message||'Unable to sign in.');session={token:data.token,user:data.user};localStorage.setItem('yatraSmartSession',JSON.stringify(session));updateAuthUI();closeModals();event.target.reset();showToast(`Welcome, ${data.user.name}. Your account is connected.`)}catch(error){showToast(error.message)}}
async function recommend(event){event.preventDefault();const d=destination($('#tripDestination').value),start=new Date($('#startDate').value),end=new Date($('#endDate').value),travellers=Number($('#travellers').value),budget=Number($('#tripBudget').value);if(!d||Number.isNaN(start)||Number.isNaN(end)||end<start){showToast('Choose valid start and end dates.');return}const days=Math.floor((end-start)/86400000)+1,interests=[...document.querySelectorAll('.interest-options input:checked')].map(x=>x.value),daily=budget/(days*travellers);const ranked=destinations.map(x=>({d:x,score:x.interests.filter(i=>interests.includes(i)).length*3+(x.cost<=daily?2:0)+(x.id===d.id?2:0)})).sort((a,b)=>b.score-a.score).slice(0,3),estimate=Math.round(d.cost*days*travellers);$('#recommendationBox').innerHTML=`<div class="recommendation-list">${ranked.map(({d:x})=>`<article><p class="match">${x.id===d.id?'Your selected destination':'Good alternative'}</p><h3>${x.name}</h3><p>${x.interests.filter(i=>interests.includes(i)).length?`Matches ${x.interests.filter(i=>interests.includes(i)).join(' and ')}`:'Fits your travel budget'}.</p><p><strong>${money(x.cost)}/day</strong> · ★ ${x.rating}</p></article>`).join('')}</div>`;location.hash='recommendations';if(!session){showToast(`Estimate: ${money(estimate)}. Sign in to save this trip.`);return}try{const savedRouteStopIds=[...new Set([d.id,...routeStopIds])];const response=await fetch(`${API_BASE_URL}/trips`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${session.token}`},body:JSON.stringify({destinationId:d.id,title:`My ${d.name} Adventure`,startDate:$('#startDate').value,endDate:$('#endDate').value,travelers:travellers,budget,travelStyle:$('#tripStyle').value,routeStopIds:savedRouteStopIds})}),data=await response.json();if(!response.ok)throw new Error(data.error?.message||'Trip could not be saved.');showToast(`Trip saved: ${data.title}.`)}catch(error){showToast(error.message)}}
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
  result.insertAdjacentHTML('beforeend','<button class="save-trip-button" data-save-trip type="button">Save Trip <span>→</span></button>');
  $('#recommendationBox').prepend(result);
}

function selectSuggestedDestination(card){
  const name=card.querySelector('h3')?.textContent;
  const selected=destinations.find(place=>place.name===name);
  if(!selected)return;
  $('#tripDestination').value=selected.id;
  setPlannerDestinationTheme(selected);
  renderTravelAssistant();
  document.querySelectorAll('#recommendationBox .recommendation-list article').forEach(item=>{
    const active=item===card;
    item.classList.toggle('is-selected',active);
    const label=item.querySelector('.match');
    if(label)label.textContent=active?'Your selected destination':'Good alternative';
  });
  document.querySelector('.estimate-summary')?.remove();
  showEstimateSummary();
  showToast(`${selected.name} is now your selected destination.`);
}

function saveCurrentTrip(){
  const selected=destination($('#tripDestination').value);
  if(!selected)return;
  if(session){location.hash='my-trips';loadMyTrips();showToast('Your estimate is saved in My trips.');return}
  const saved=JSON.parse(localStorage.getItem('smartYatraSavedTrips')||'[]');
  saved.unshift({id:Date.now(),destinationName:selected.name,title:`My ${selected.name} Adventure`,startDate:$('#startDate').value,endDate:$('#endDate').value,travelers:Number($('#travellers').value)||1,budget:Number($('#tripBudget').value)||0,travelStyle:$('#tripStyle').value||'Flexible'});
  localStorage.setItem('smartYatraSavedTrips',JSON.stringify(saved));
  const container=$('#tripsContent');
  container.innerHTML=`<div class="trip-grid">${saved.map(trip=>`<article class="trip-card"><p class="match">SAVED PLAN</p><h3>${escapeHtml(trip.destinationName)}</h3><p class="trip-title">${escapeHtml(trip.title)}</p><div class="trip-dates">${tripDate(trip.startDate)} - ${tripDate(trip.endDate)}</div><dl><div><dt>Travellers</dt><dd>${trip.travelers}</dd></div><div><dt>Budget</dt><dd>${money(trip.budget)}</dd></div><div><dt>Style</dt><dd>${escapeHtml(trip.travelStyle)}</dd></div></dl></article>`).join('')}</div>`;
  location.hash='my-trips';
  showToast(`${selected.name} has been saved to My trips.`);
}

document.addEventListener('click',event=>{
  const saveButton=event.target.closest('[data-save-trip]');
  if(saveButton){saveCurrentTrip();return;}
  const suggestion=event.target.closest('#recommendationBox .recommendation-list article');
  if(suggestion)selectSuggestedDestination(suggestion);
});

$('#tripForm').addEventListener('submit',showEstimateSummary);

async function createVehicleBooking(providerId, providerName){
  if(!session){showToast('Sign in to send a vehicle booking request.');openAuth();return}
  try{
    const response=await fetch(`${API_BASE_URL}/bookings`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.token}`},body:JSON.stringify({providerId,startDate:$('#startDate').value,endDate:$('#endDate').value,guests:Number($('#travellers').value)||1,note:`Vehicle request for ${providerName}`})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error?.message||'Booking request could not be saved.');
    showToast(`${providerName} request saved. A provider confirmation is still required.`);
  }catch(error){showToast(error.message)}
}
async function recordEmergencyAlert(position){
  const status=$('#sosStatus'),selected=destination($('#tripDestination').value);
  if(!session){status.textContent='Location is ready. Sign in to save this SOS record; call 112 if help is urgent.';return}
  try{
    const response=await fetch(`${API_BASE_URL}/emergency-alerts`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.token}`},body:JSON.stringify({destinationId:selected?.id,latitude:position.coords.latitude,longitude:position.coords.longitude,message:'SOS location prepared from SmartYatra'})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error?.message||'SOS record could not be saved.');
    status.textContent='Your SOS location record is saved. Call 112 immediately if you need urgent help.';
  }catch(error){status.textContent=error.message}
}

document.addEventListener('click',event=>{
  const addButton=event.target.closest('[data-add-route]');
  if(addButton){addRouteStop($('#routeDestinationSelect').value);return}
  const removeButton=event.target.closest('[data-remove-route]');
  if(removeButton){routeStopIds=routeStopIds.filter(id=>id!==removeButton.dataset.removeRoute);renderTravelAssistant();return}
  if(event.target.closest('[data-optimize-route]')){optimiseRoute();return}
  const vehicle=event.target.closest('[data-vehicle]');
  if(vehicle){const providerId=vehicle.dataset.providerId;if(providerId)createVehicleBooking(providerId,vehicle.dataset.vehicle);else showToast(`${vehicle.dataset.vehicle} is available as a planning preference.`);return}
  if(event.target.closest('[data-share-location]')){const status=$('#sosStatus');if(!navigator.geolocation){status.textContent='Location sharing is not available in this browser.';return}status.textContent='Getting your location…';navigator.geolocation.getCurrentPosition(position=>{recordEmergencyAlert(position);showToast('Your location is ready to share.');},()=>{status.textContent='Location permission was not granted. Call 112 if help is urgent.'});}
});

function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]))}
function tripDate(value){return new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric'}).format(new Date(value))}
function renderLocalTrips(container){
  const saved=JSON.parse(localStorage.getItem('smartYatraSavedTrips')||'[]');
  if(!saved.length){container.innerHTML='<p class="empty">Every great journey begins with a plan. Your saved adventures will be ready here when you are.</p>';return}
  container.innerHTML=`<div class="trip-grid">${saved.map(trip=>`<article class="trip-card"><p class="match">SAVED PLAN</p><h3>${escapeHtml(trip.destinationName)}</h3><p class="trip-title">${escapeHtml(trip.title)}</p><div class="trip-dates">${tripDate(trip.startDate)} - ${tripDate(trip.endDate)}</div><dl><div><dt>Travellers</dt><dd>${trip.travelers}</dd></div><div><dt>Budget</dt><dd>${money(trip.budget)}</dd></div><div><dt>Style</dt><dd>${escapeHtml(trip.travelStyle)}</dd></div></dl></article>`).join('')}</div>`;
}
async function loadMyTrips(){
  const container=$('#tripsContent');
  if(!container)return;
  if(!session){renderLocalTrips(container);return}
  container.innerHTML='<p class="loading-trips">Loading your saved trips...</p>';
  try{
    const response=await fetch(`${API_BASE_URL}/trips`,{headers:{Authorization:`Bearer ${session.token}`}});
    const data=await response.json();
    if(response.status===401){localStorage.removeItem('yatraSmartSession');session=null;$('#authButton').textContent='Sign in';container.innerHTML='<p class="empty">Your session has expired. Please sign in again.</p>';return}
    if(!response.ok)throw new Error(data.error?.message||'Trips could not be loaded.');
    if(!data.length){container.innerHTML='<p class="empty">No saved trips yet. Create an estimate above to save your first trip.</p>';return}
    container.innerHTML=`<div class="trip-grid">${data.map(trip=>`<article class="trip-card"><p class="match">${escapeHtml(trip.status||'PLANNING')}</p><h3>${escapeHtml(trip.destination?.name||trip.title)}</h3><p class="trip-title">${escapeHtml(trip.title)}</p><div class="trip-dates">${tripDate(trip.startDate)} - ${tripDate(trip.endDate)}</div><dl><div><dt>Travellers</dt><dd>${Number(trip.travelers)||1}</dd></div><div><dt>Budget</dt><dd>${money(Number(trip.budget))}</dd></div><div><dt>Style</dt><dd>${escapeHtml(trip.travelStyle||'Flexible')}</dd></div></dl></article>`).join('')}</div>`;
  }catch(error){renderLocalTrips(container)}
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

const hostedVideoBase='https://rajxgulcgxjxzxjgbpzo.supabase.co/storage/v1/object/public/tourism-videos';
const hostedVideoUrl=file=>`${hostedVideoBase}/${encodeURIComponent(file)}`;
const heroVideos=[
  {place:'Jaipur',region:'Rajasthan',file:'hero-jaipur.mp4',line:'Step into stories carved in stone and colour.'},
  {place:'Varanasi',region:'Uttar Pradesh',file:'hero-varanasi.mp4',line:'Feel the living spirit of India by the Ganges.'},
  {place:'Manali',region:'Himachal Pradesh',file:'manali.mp4',line:'Take the high road into the Himalayas.'},
  {place:'Goa',region:'India',file:'hero-goa.mp4',line:'Follow the coast where every sunset feels new.'},
  {place:'Ladakh',region:'India',file:'hero-ladakh.mp4',line:'Chase open roads across the roof of India.'},
  {place:'Munnar',region:'Kerala',file:'hero-munnar.mp4',line:'Breathe in the calm of the tea-covered hills.'},
  {place:'The Himalayas',region:'Uttarakhand',file:'hero-himalaya.mp4',line:'Find wonder above the clouds.'},
  {place:'Kashmir',region:'India',file:'hero-kashmir.mp4',line:'Drift through valleys that feel like a dream.'},
  {place:'Andaman',region:'India',file:'andaman.mp4',line:'Follow the island horizon into clear blue water.'}
];

const plannerVideoByDestination={goa:'goa.mp4',manali:'manali.mp4',munnar:'munnar.mp4',jaipur:'jaipur.mp4',varanasi:'varanasi.mp4',kashmir:'kashmir.mp4',ladakh:'ladakh.mp4',rishikesh:'rishikesh.mp4',coorg:'coorg.mp4',ooty:'ooty.mp4',darjeeling:'darjeeling.mp4',hampi:'hampi.mp4',udaipur:'udaipur.mp4',pondicherry:'pondicherry.mp4',andaman:'andaman.mp4'};
const plannerCopyByDestination={
  goa:'Let sea breezes, golden sunsets and easy coastal days shape a trip that feels effortlessly yours.',
  manali:'Give every day a Himalayan rhythm—cedar trails, warm cafés and views that stay with you.',
  jaipur:'Make room for royal colour, craft-filled lanes and the timeless glow of the Pink City.',
  munnar:'Slow down among tea-covered hills, misty mornings and the quiet beauty of the Western Ghats.',
  varanasi:'Follow the river’s ancient rhythm through glowing ghats, sacred rituals and unforgettable stories.',
  coorg:'Set your own pace through coffee country, rain-washed forests and wonderfully unhurried escapes.',
  kashmir:'Let alpine lakes, flowered meadows and sweeping mountain light guide a truly cinematic journey.',
  ladakh:'Build your days around high passes, clear mountain air and the vast stillness of the Himalayas.',
  rishikesh:'Balance river adventure with restorative pauses along the peaceful, ever-flowing Ganga.',
  udaipur:'Plan a graceful escape of lake sunsets, palace walks and quietly romantic evenings.',
  andaman:'Move between clear blue water, coral adventures and slow island moments made to remember.',
  darjeeling:'Follow misty tea slopes, heritage railways and the first light on the Kanchenjunga range.',
  pondicherry:'Mix sea-side calm with French-quarter charm, thoughtful cafés and sunny promenade walks.',
  hampi:'Let ancient stone, boulder-strewn horizons and golden sunsets set the pace for your exploration.',
  ooty:'Enjoy cool mountain air, winding train journeys and the gentle green beauty of the Nilgiris.'
};
let plannerVideoController=null;
function setPlannerDestinationTheme(place){
  if(!place)return;
  const [primary,accent,soft]=destinationPalettes[place.slug||place.id]||destinationPalettes.goa;
  const planner=$('#planner');
  planner.style.setProperty('--planner-primary',primary);
  planner.style.setProperty('--planner-accent',accent);
  planner.style.setProperty('--planner-soft',soft);
  $('#plannerTitle').textContent=`Build a practical itinerary for ${place.name}.`;
  $('#plannerSubtitle').textContent=plannerCopyByDestination[place.slug||place.id]||'Shape each day around the moments that make this place unforgettable.';
  plannerVideoController?.setPlace(place.slug||place.id);
}
function startPlannerVideoFlow(){
  const first=$('#plannerVideo'),second=$('#plannerVideoNext');
  if(!first||!second)return;
  let index=0,active=first,standby=second,changing=false,playlist=[],activeStart=0,changeRequest=0;
  const setSource=(video,clip,autoplay=false,onReady)=>{video.src=hostedVideoUrl(clip.file);video.load();video.addEventListener('loadedmetadata',()=>{video.currentTime=Math.min(clip.start,Math.max(0,video.duration-4.8));if(autoplay)video.play().catch(()=>{});onReady?.();},{once:true});};
  const advance=()=>{
    if(changing)return;
    changing=true;index=(index+1)%playlist.length;
    const nextClip=playlist[index];
    const fade=()=>{standby.play().catch(()=>{});standby.style.opacity='1';active.style.opacity='0';window.setTimeout(()=>{const outgoing=active;outgoing.pause();outgoing.currentTime=0;active=standby;activeStart=nextClip.start;standby=outgoing;setSource(standby,playlist[(index+1)%playlist.length]);changing=false;},650);};
    if(standby.readyState>=3)fade();else standby.addEventListener('canplay',fade,{once:true});
  };
  const setPlace=placeId=>{const selected=destination(placeId)||destinations.find(d=>d.slug===placeId);const videoKey=selected?.slug||placeId;const file=plannerVideoByDestination[videoKey]||'ladakh.mp4',nextPlaylist=[0,5,10,15,20,25].map(start=>({file,start})),request=++changeRequest;
    if(!active.src){playlist=nextPlaylist;index=0;activeStart=0;setSource(active,playlist[0],true);setSource(standby,playlist[1]);return;}
    changing=true;
    setSource(standby,nextPlaylist[0],false,()=>{if(request!==changeRequest)return;standby.play().catch(()=>{});standby.style.opacity='1';active.style.opacity='0';window.setTimeout(()=>{if(request!==changeRequest)return;const outgoing=active;outgoing.pause();active=standby;standby=outgoing;playlist=nextPlaylist;index=0;activeStart=0;setSource(standby,playlist[1]);changing=false;},650);});
  };
  [first,second].forEach(video=>{video.addEventListener('timeupdate',()=>{if(video===active&&video.currentTime>=activeStart+4.7)advance()});video.addEventListener('ended',()=>{if(video===active)advance()})});
  plannerVideoController={setPlace};
  setPlace($('#tripDestination').value||'goa');
}

document.querySelectorAll('[data-account-action]').forEach(button=>button.addEventListener('click',()=>{
  const action=button.dataset.accountAction;
  closeAccountMenu();
  if(action==='change-name'){
    const name=window.prompt('Enter your new display name:',session?.user?.name||'');
    if(name&&name.trim()&&session){session.user.name=name.trim();localStorage.setItem('yatraSmartSession',JSON.stringify(session));updateAuthUI();showToast('Your username has been updated.');}
  }else if(action==='change-password')showToast('Password changes will be available when Supabase email authentication is connected.');
}));

$('#accountSettingsButton').addEventListener('click',()=>{const settings=$('#accountSettings'),open=!settings.hidden;settings.hidden=open;$('#accountSettingsButton').setAttribute('aria-expanded',String(!open));});

document.addEventListener('click',event=>{
  const menu=$('.account-menu');
  if(session&&menu&&!menu.contains(event.target))closeAccountMenu();
});

function legacyVideoHero(){
  const copy=document.querySelector('.hero-video-layer .hero-copy'),video=$('#heroVideo'),source=$('#heroVideoSource');
  if(!copy||!video||!source)return;
  let index=0,changing=false;
  const updateCopy=entry=>{copy.innerHTML=`<p class="eyebrow">SMART<span class="brand-yatra">YATRA</span> &middot; ${entry.region.toUpperCase()}</p><h1>Discover <em>${entry.place}.</em></h1><p class="hero-text">${entry.line}</p><a class="primary-button hero-cta" href="#explore">Unleash your dream destination <span>&rarr;</span></a><p class="hero-footnote">CURATED DESTINATIONS &middot; MADE FOR EXPLORERS</p>`};
  const advance=()=>{
    if(changing)return;
    changing=true;index=(index+1)%heroVideos.length;
    const entry=heroVideos[index];
    video.classList.add('is-changing');
    setTimeout(()=>{source.src=hostedVideoUrl(entry.file);video.load();video.play().catch(()=>{});updateCopy(entry);video.setAttribute('aria-label',`Scenic video of ${entry.place}, ${entry.region}`);video.classList.remove('is-changing');changing=false},300);
  };
  updateCopy(heroVideos[0]);
  video.addEventListener('timeupdate',()=>{if(video.currentTime>=4.95)advance()});
  video.addEventListener('ended',advance);
}

function startSmoothHeroFlow(){
  const copy=document.querySelector('.hero-video-layer .hero-copy'),first=$('#heroVideo'),second=$('#heroVideoNext');
  if(!copy||!first||!second)return;
  let index=0,changing=false,activeVideo=first,standbyVideo=second;
  const updateCopy=entry=>{copy.innerHTML=`<p class="eyebrow">SMART<span class="brand-yatra">YATRA</span> &middot; ${entry.region.toUpperCase()}</p><h1>Discover <em>${entry.place}.</em></h1><p class="hero-text">${entry.line}</p><a class="primary-button hero-cta" href="#explore">Unleash your dream destination <span>&rarr;</span></a><p class="hero-footnote">CURATED DESTINATIONS &middot; MADE FOR EXPLORERS</p>`};
  const setSource=(video,entry)=>{video.src=hostedVideoUrl(entry.file);video.load();video.setAttribute('aria-label',`Scenic video of ${entry.place}, ${entry.region}`)};
  const advance=()=>{
    if(changing)return;
    changing=true;index=(index+1)%heroVideos.length;
    const nextEntry=heroVideos[index];
    const fade=()=>{
      updateCopy(nextEntry);standbyVideo.currentTime=0;standbyVideo.play().catch(()=>{});
      standbyVideo.style.opacity='1';activeVideo.style.opacity='0';
      window.setTimeout(()=>{const outgoing=activeVideo;outgoing.pause();outgoing.currentTime=0;outgoing.style.opacity='0';activeVideo=standbyVideo;standbyVideo=outgoing;setSource(standbyVideo,heroVideos[(index+1)%heroVideos.length]);changing=false;},650);
    };
    if(standbyVideo.readyState>=3)fade();else standbyVideo.addEventListener('canplay',fade,{once:true});
  };
  setSource(activeVideo,heroVideos[0]);setSource(standbyVideo,heroVideos[1]);updateCopy(heroVideos[0]);
  [first,second].forEach(video=>{video.addEventListener('timeupdate',()=>{if(video===activeVideo&&video.currentTime>=4.7)advance()});video.addEventListener('ended',()=>{if(video===activeVideo)advance()})});
}

startSmoothHeroFlow();
startPlannerVideoFlow();
renderTravelAssistant();
window.setTimeout(renderTravelAssistant,1200);

async function loadWishlist(){
  if(!session){saveWishlist();renderDestinations();return}
  try{
    const response=await fetch(`${API_BASE_URL}/wishlist`,{headers:{Authorization:`Bearer ${session.token}`}});
    const data=await response.json();
    if(response.status===401)return;
    if(!response.ok)throw new Error(data.error?.message||'Wishlist could not be loaded.');
    const remoteIds=data.map(item=>item.destinationId).filter(Boolean),localIds=[...wishlist];
    wishlist=[...new Set([...remoteIds,...localIds])];
    saveWishlist();renderDestinations();renderWishlist();
    await Promise.all(localIds.filter(id=>!remoteIds.includes(id)).map(id=>fetch(`${API_BASE_URL}/wishlist`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.token}`},body:JSON.stringify({destinationId:id})}).catch(()=>null)));
  }catch(error){console.warn('Wishlist is using this device until the API is available.',error);renderDestinations()}
}

async function toggleWishlist(destinationId){
  const isSaved=wishlist.includes(destinationId);
  const updateLocally=(message)=>{wishlist=isSaved?wishlist.filter(id=>id!==destinationId):[...wishlist,destinationId];saveWishlist();renderDestinations();renderWishlist();showToast(message)};
  if(!session){updateLocally(isSaved?'Removed from your wishlist.':'Saved to your wishlist. Sign in later to sync it.');return}
  try{
    const response=await fetch(isSaved?`${API_BASE_URL}/wishlist/${destinationId}`:`${API_BASE_URL}/wishlist`,{
      method:isSaved?'DELETE':'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.token}`},
      body:isSaved?undefined:JSON.stringify({destinationId})
    });
    const data=response.status===204?null:await response.json();
    if(!response.ok)throw new Error(data?.error?.message||'Wishlist could not be updated.');
    updateLocally(isSaved?'Removed from wishlist.':'Saved to wishlist.');
  }catch(error){updateLocally(isSaved?'Removed from your wishlist.':'Saved to wishlist on this device.');}
}
