let body = document.getElementById('bodyy');
body.style.background = '#e5a4ffff' ;


let box = document.createElement('div');
box.style.position = 'fixed';
box.style.top = '20px';
box.style.right = '20px';
box.style.padding = '10px';
box.style.width = '200px';
box.style.border = '1px solid #aaa';
box.style.background = '#e3f2ff';  
box.style.fontFamily = 'Arial';
box.style.borderRadius = '8px';
document.body.appendChild(box);


let scr = document.createElement('div');
scr.style.height = '40px';
scr.style.border = '1px solid #ccc';
scr.style.marginBottom = '8px';
scr.style.padding = '5px';
scr.style.textAlign = 'right';
scr.style.fontSize = '20px';
scr.style.borderRadius = '8px';
scr.textContent = "0";
box.appendChild(scr);

let cur = "";

let btns = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'];

let grid = document.createElement('div');
grid.style.display = 'grid';
grid.style.gridTemplateColumns = 'repeat(4,1fr)';
grid.style.gap = '5px';
box.appendChild(grid);

btns.forEach(b=>{
  let bt = document.createElement('button');
  bt.textContent = b;
  bt.style.padding = '10px'; 
  bt.style.background = '#f0f0f0';
  bt.style.border = '1px solid #bbb';
  bt.style.fontSize = '16px';
  bt.style.borderRadius = '12px' ;

  bt.onclick = function(){
    if(b === '='){
      try{
        cur = String(Function('return '+cur)());
        scr.textContent = cur;
      }catch(err){
        scr.textContent = 'Err';
        cur = "";
      }
    } else {
      if(scr.textContent === '0' && b !== '.'){
        cur = b;
      } else {
        cur += b;
      }
      scr.textContent = cur;
    }
  }
  grid.appendChild(bt);
});
