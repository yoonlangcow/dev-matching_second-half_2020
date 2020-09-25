async function searchTerm(keyword, keywordEl, recommendAreaEl){

  console.log('키워드 input element : ',keywordEl)
  console.log('추천검색어 리스트 element : ',recommendAreaEl)
  console.log('키워드 : ',keyword)

  if(keyword !== ''){
      
    try{
      
          let response = await fetch(`http://localhost:8500/v1/kind/cats?q=${keyword}`);
          let result = await response.json();
          console.log('결과 : ',result)
      
          recommendSearchTermEl(result, recommendAreaEl, (event)=>{
              let target = event.target;
              keywordEl.value = target.innerHTML;
              keywordEl.focus();
          });
    
      }catch(err){
          console.log('에러 : ',err);
      }

  }else{
      recommendAreaEl.innerHTML = ``;
  }

} 


function recommendSearchTermEl(items, recommendAreaEl, onClick) {

  recommendAreaEl.innerHTML = `
    <ul class="recommend-search-term-wrap">
      ${items.map((item, index) => `<li data-name=${"term"+(index+1)}>${item}</li>`).join("")}
    </ul>
  `;

  let $recommendSearchTermWrap = document.querySelector(".recommend-search-term-wrap");

  $recommendSearchTermWrap.addEventListener("click", onClick)

}

// document.addEventListener("keydown", (event)=>{
  
//   if(event.keyCode == 27 || event.which == 27){
//     console.log('esc 눌렀다');
//     keywordEl.blur();
//     recommendAreaEl.innerHTML = ``;
//   }

// });

export { searchTerm }