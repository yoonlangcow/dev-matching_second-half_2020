import { searchTerm } from './components/Recommends.js'
function App(){

    let $keyword = document.querySelector(".keywords");
    let $result  = document.querySelector(".result");
    let $recommendArea  = document.querySelector(".recommend-area");
    let debounce = null;
    let classNum = 0;

    $keyword.addEventListener("keyup", async (event)=>{
        
        let value = event.target.value;
        let code = event.code;

        // 키워드 검색
        if (code == "Enter"){
          
            await fetch("http://localhost:8500/v1/cat?q="+value).then( res =>{
                return res.json();
            }).then( result =>{
                let $wrapper = document.createElement("ul");

                for(let img of result){
                    let $items   = document.createElement("li");
                    let $image   = document.createElement("img");
                    $image.src = img.thumbnail;
                    $items.appendChild($image);
                    $wrapper.appendChild($items);
                }

                $result.innerHTML = "";
                $result.appendChild($wrapper);
            })

        }
        
        // value가 없으면 result 영역 disable
        if(value == ''){
          $result.innerHTML = ``;
        }
        
        // 화살표로 추천검색어에 focus
        if( code == "ArrowDown" ){
            console.log('방향키 아래')
            
            classNum += 1;
            console.log('classNum : ',classNum)

            let focusRecommendSearchLi = document.querySelector(`li[data-name=term${classNum}]`);
            console.log('focus 맞춰진 li : ',focusRecommendSearchLi)

            if(focusRecommendSearchLi){
              focusRecommendSearchLi.style.backgroundColor = "rgba(105, 199, 211, 0.3)";

              $keyword.value = focusRecommendSearchLi.innerHTML;
              $keyword.focus();

            }else{
              focusRecommendSearchLi.style.backgroundColor = "rgba(0, 0, 0, 0)";
            }

        }else{
            // 입력이 완료 됐을때만 입력한 검색어를 넘겨 api 호출 최소화하기
            clearTimeout(debounce);
            debounce = setTimeout(()=>{
              searchTerm(value, $keyword, $recommendArea);
              console.log('디바운스 실행 시 키워드 : ',value);
            },500);
        }

    });

}

window.addEventListener("load", _ =>{
    App();
})