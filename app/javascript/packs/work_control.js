function initialize_set_event(){

  addResizibleConponent();

  console.log("イベントリスナー追加処理");
  
  //Taskに移動イベントを付与
  work_objects = getHTMLClass('taskInTheList');
  setEventListener(work_objects, 'dragstart', onDragStart);

  //ドロップエリアに配下時のイベントを付与
  // work_spaces = getHTMLClass('work_space');
  // setEventListener(work_spaces, 'dragover', onDragOver);
  // setEventListener(work_spaces, 'drop', onDrop);

  //作業種別ボタンを押下時のイベントを付与 + 既にUIを押下済みの状態にしておく
  btn = getHTMLClass('btn');
  setEventListener(btn, 'click', chengeProcesssType);
  document.getElementById('button_UI').click();

  //プロジェクト一覧を押下時のイベントを付与
  list = document.getElementById('list1');
  set_event_onckick2(list);

  //ドロップエリアにイベントを付与
  dropArea_forTask = document.getElementById('dropArea_forTask');
  setEvent__DropArea_forTask(dropArea_forTask);

  //勤務日変更時のイベントを付与
  workingDate = document.getElementById('WorkingDate');
  workingDate.addEventListener("blur", changeWorkingDate);

  //配下済みTaskをクリック時のイベントを付与
  dropedTasks = getHTMLClass('dropedTasks');
  setEventListener(dropedTasks, 'mouseover', caluculateWorkTime_onlyTouch);
  // setEventListener(dropedTasks, 'click', onClick);

  //画面をクリックした瞬間、クリックを離した瞬間　のイベントを付与
  body = document.getElementsByTagName('body');
  body[0].addEventListener('mousedown',  storeLastClickNode);
  body[0].addEventListener('mouseup',  mouseUp);
  // setEventListener(dropedTasks, 'mouseover', caluculateWorkTime);
  
  //配下済みTaskの変換を初期表示時に行う
  dropedTasks.forEach(element =>{
    /*長さを設定*/
    let hiddenWorkTime = document.getElementById('calcDataHidden_workTime' + element.id);
    element.style.width = hiddenWorkTime.value + 'px';

    /*色を設定*/
    let hiddenSystemProcess = document.getElementById('calcDataHidden_SystemProcess' + element.id);
    initializeSetColor(element, hiddenSystemProcess.value);
  });
  dropedTasks.forEach(element => convertWorkTime(element) );



  ajaxB = document.getElementById('ajax');
  // ajaxB.addEventListener('click', ajaxHTTP);
  ajaxB.addEventListener('click', removeClass);

  backButton = document.getElementById('backButton');
  backButton.addEventListener('click', removeClass);


  
  // list3 = document.getElementById('list');
  // list3.addEventListener('click', showTmpTaskList);
  list = getHTMLClass('List');
  setEventListener(list, 'click', showTmpTaskList);


  console.log("イベントリスナー追加処理　終了");
}


function setEventListener(targertClass, setEvent, setFunctionName){
  targertClass.forEach(element => element.addEventListener(setEvent, setFunctionName));
}


function set_event_onckick2(targertClass){
  targertClass.addEventListener("click", testList);
}

function setEvent__DropArea_forTask(targertClass){
  targertClass.addEventListener('dragover', onDragOver);
  targertClass.addEventListener('drop', onDrop);
  targertClass.addEventListener("dragend", removeTask);
  targertClass.addEventListener("dragleave", changeRemoveFlg);
}


function showTmpTaskList(e){

  // let showTasksSpace = document.getElementById('showTasksSpace');
   
  // let list3 = document.getElementById('list3');
  
  let backButton = document.getElementById('backArea');
  backButton.style.display = 'flex';


  let showTmpTaskArea = document.getElementById('showTmpTaskArea');
  let showProjectName = document.getElementById('showProjectName');
  showProjectName.textContent = e.target.textContent;
  console.log(e.target);
  showTmpTaskArea.classList.add('tmpTaskList');

  ajaxHTTP();
}

function ajaxHTTP(e){
  const axiosBase = require('axios');
  const axios = axiosBase.create({
    responseType: 'text'
  });
  // axios.get('http://localhost:3000/work_schedule')
  axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content')
  axios.post('http://localhost:3000/work_schedule/getList', {
    id: '101'
  })
  .then(function (response){

    let tmpTasks = document.getElementById('tmpTasks');

    /*AjaxでDBから取得した内容をDOMに追加する*/
    response.data.forEach(element =>{
      let addDivNode = createDivNode(element['project_id']);

      let divNode = document.createElement("div");
      divNode.id =  element['project_id'];
      divNode.classList.add('data-work_object');
      divNode.classList.add('taskInTheList');
      divNode.draggable = 'true';
      divNode.textContent = element['work_content'];

      divNode.addEventListener('dragstart', onDragStart);

      tmpTasks.appendChild(divNode);
    });

    console.log('通信成功');
    window.addEventListener('transitionend', delayShowNode, {once: true});
  })
  .catch(function (error){
    console.log(error);
    console.log('通信失敗');
  })

  .finally(function (){
    //None
  });

  /*非同期通信の為、delayShowNodeが先に動いてしまう。そのためPromiss内に処理を移行*/
  // window.addEventListener('transitionend', delayShowNode, {once: true});

}



/**
 * [delayShowNode 一時的に開いたリストの中身を表示する]
 * @param  {[type]} targetNode [description]
 * @return {[type]}            [description]
 */
function delayShowNode(targetNode){
// const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// await _sleep(2000);

  /*Ajaxで取得したTaskをゆっくり表示する為、クラスを付与*/
  let targetList = document.getElementsByClassName('taskInTheList');
  Array.from(targetList).forEach(element =>{
    element.classList.add('showDelay');
  });

}



/**
 * [removeClass 一時的に開いたリストを閉める]
 * @param  {[type]} targetNode [description]
 * @return {[type]}            [description]
 */
function removeClass(targetNode){
  let backArea = document.getElementById('backArea');
  let tmpList = document.getElementById('showTmpTaskArea');
  let tmpTasks = document.getElementById('tmpTasks');

  /*backArea要素が残っていると、次のクリック時に影響が出てしまうので隠す*/
  backArea.style.display = 'none';

  /*一時的に開いたリストが、すぅーっと閉まっていくのを表現する*/
  tmpList.classList.remove('tmpTaskList');
  // tmpList.classList.add('deleteClass');
  // tmpList.classList.remove('tmpTaskList');

  /*一時的に開いたリストの中身を残しておくとまずいので、削除する*/
  let removeTmpTasks = Array.from(tmpTasks.childNodes);
  removeTmpTasks.forEach(element =>{
    tmpTasks.removeChild(element);
  });

}


/**
 * [chengeProcessstype 作業種別を選択時、HTMLのカラーを変更する]
 * @param  {[type]} e [選択した要素]
 * @return {[type]}   [description]
 */
function chengeProcesssType(e){
  let taskArea = document.getElementById('task');
  // let showTasksSpace = document.getElementById('showTasksSpace');
  
  /*「backgroundColor」だと hover時の色を取得してしまうので、borderカラーから取得するように変更*/
  // let RGB = window.getComputedStyle(e.target).backgroundColor;
  let RGB = window.getComputedStyle(e.target).borderTopColor;

  /*RGB値を[R, G, B]の配列に分ける*/
  let RGB_Array = RGB.substring(4, RGB.length - 1).split(',');
  console.log(RGB_Array[0] + ',' + RGB_Array[1] +','+ RGB_Array[2]);

  /*opactiy追加の為rgbaを使用*/
  taskArea.style.borderColor = RGB;
  taskArea.style.backgroundColor = 'rgba('+ RGB_Array[0] + ',' + RGB_Array[1] +','+ RGB_Array[2] +','+ '0.1)';
  changeButtonStatus(e.target);
}


/**
 * [initialize_set_color 登録済みTaskの色付け作業]
 * @param  {[type]} targetNode [登録済みTask]
 * @param  {[type]} color      [登録済み作業種別]
 * @return {[type]}            [description]
 */
function initializeSetColor(targetNode, color){
  let taskArea = document.getElementById('task');
  let targetColor = document.getElementById('button_' + color);
  let RGB = window.getComputedStyle(targetColor).backgroundColor;

  /*RGB値を[R, G, B]の配列に分ける*/
  let RGB_Array = RGB.substring(4, RGB.length - 1).split(',');

  /*opactiy追加の為rgbaを使用*/
  targetNode.style.backgroundColor = 'rgba('+ RGB_Array[0] + ',' + RGB_Array[1] +','+ RGB_Array[2] +','+ '0.1)';
}




/**
 * [changeButtonStatus 作業種別を選択時、DBに渡す値をこっそり変更する]
 * @param  {[type]} targertButton [description]
 * @return {[type]}               [description]
 */
function changeButtonStatus(targertButton){
  let buttonStatus = document.getElementById('button_status');
  buttonStatus.value = targertButton.id.substring(targertButton.id.length - 2);
}


//Main Logic
window.addEventListener("load", initialize_set_event);
// $(function() {
//   console.log("LP");
// });
var removeFlg = false;
// exports.test1 = checkSameId;
var lastClickNode = '';



/**
 * [checkClickNode 画面をクリックした際に、resizibleのつまみをクリックしたのかの判定を行う]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function checkClickNodeIsResizible(clickNode){
  let caluculateFlg = false;
  Array.from(lastClickNode.classList).some(element => {
    if(element === 'ui-resizable-handle'){
      caluculateFlg = true;
      console.log('true');
      return true;
    }
  });

  if (caluculateFlg != true) {
    console.log('falseしてます');
    return false;
  }

}



/**
 * [checkClickNode Taskの配下時に、resizibleの関係に配下したのかの判定を行う]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
// function checkDropNodeIsResizible(dropedNode){
function isPlacedDropNodeCorrectPlace(dropedNode){
  let correctPlace = false;
  console.log(dropedNode.classList);
  Array.from(dropedNode.classList).some(element => {
    // if(element === 'ui-resizable-handle'){
    if(element === 'work_space'){
      correctPlace = true;
      console.log('配下した場所はwork_space');
      return true;
    }
  });

  if (correctPlace != true) {
    console.log('配下した場所はwork_space以外');
    return false;
  }

  console.log('圭吾ZZZ');
  return true;
}


/**
 * [mouseUp HTMLのbody上でクリックを離した時、クリックした内容がresizibleのつまみなら計算を行う]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function mouseUp(e){
  if (checkClickNodeIsResizible(e) == false){
    return;
  }
  caluculateWorkTime(lastClickNode.parentNode);
}


/**
 * [storeLastClickNode HTMLのbody上でクリックを押した時、クリックしたNodeの情報を保持する]
 * @param  {[type]} e [description]
 * @return {[type]}   [description];
 */
function storeLastClickNode(e){
  lastClickNode = e.target;
  console.log(lastClickNode);
}


/**
 * [onClick これいる？]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
// function onClick(e) {
//   /*要素の長さをデバックしたい場合、使用*/
//   // console.log(parseInt(window.getComputedStyle(e.target).width));
//   // console.log(e.target.parentNode);
//   // console.log(e.currentTarget);

//   let defendFlg_forResizableNumber = false;
//   let calc_are = document.getElementById("calc");

//   // Array.from(e.target.classList).some(element => {
//   //   // console.log(element);
//   //   if(element === 'ui-resizable-handle'){
//   //     defendFlg_forResizableNumber = true;
//   //   }

//   //   return defendFlg_forResizableNumber;
//   // })

//   // /*クリックされた内容がresizable関係の場合、画面にその数値を表示させない為に処理を中断*/
//   // if (defendFlg_forResizableNumber){
//   //   return;
//   // }

//   // caluculateWorkTime(e.target);
//   caluculateWorkTime(e.currentTarget);
// }



/**
 * [caluculateWorkTime 移動させたTaskに対応する値を計算、表示させる]
 * @param  {[type]} e [ブラウザで触っているTask]
 * @return {[type]}   [description]
 */
function caluculateWorkTime(e){
  console.log(e);
  let calc_are = document.getElementById("calc");
    // 対象HTML要素のオブジェクトを生成
  divNode = createDivNode(e);
  $hiddenPram = createHiddenNode_work_time(e);
  $hiddenPram_ProjectId = createHiddenNode_projectId(e);
  $hiddenPram_SystemProcess = createHiddenNode_SystemProcess(e);

  console.log(document.getElementById(divNode.id));

  //HTML上に対象のdivで挙動を操作する
  // ある場合：hiddenに値を格納する
  // 無い場合：div要素をHTML上に追加する
  if (document.getElementById(divNode.id) === null){
    calc_are.appendChild(divNode);
    calc_are.appendChild($hiddenPram);
    calc_are.appendChild($hiddenPram_ProjectId);
    calc_are.appendChild($hiddenPram_SystemProcess);
    convertWorkTime(e);
  }else{
    let existsDiv = document.getElementById(divNode.id);

    convertWorkTime(e);

    let existsDivHidden = document.getElementById($hiddenPram.id);
    // console.log('tmp2のID' +'/'+ existsDivHidden.id);
    existsDivHidden.value = parseInt(window.getComputedStyle(e).width);
  }
}



/**
 * [caluculateWorkTime_onlyTouch 触っただけで計算する]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function caluculateWorkTime_onlyTouch(e){
  if (e.target.parentNode.id == 'dropArea_forTask'){
    console.log('摘まんでる所　違うね');
    return;
  }

  let resizingTask = e.target.parentNode;
  convertWorkTime(resizingTask);
}



/**
 * [convertWorkTime パラメータで受け取ったidの勤務時間表示部分に対して、変換処理をかける]
 * @param  {[type]} targetObject [description]
 * @return {[type]}              [description]
 */
function convertWorkTime(targetObject){
  // console.log('--convertWorkTime--');
  let caluculateDiv = document.getElementById("calcData" + targetObject.id);

  let tmpWorkTime = parseInt(window.getComputedStyle(targetObject).width);
  let workTimeHour = Math.floor(tmpWorkTime / 60);
  let workTimeMinitus = tmpWorkTime % 60;

  /*〇時間〇〇分　の形式で画面に表示する*/
  caluculateDiv.textContent = workTimeHour + '時間' + workTimeMinitus + '分★';
}



function createDivNode(e){
  // console.log(window.getComputedStyle(e));
  let divNode_func = document.createElement("div");
  // divNode_func.textContent = parseInt(window.getComputedStyle(e.target).width);
  // divNode_func.textContent = parseInt(window.getComputedStyle(e).width);
  divNode_func.id = "calcData" + e.id;
  
  return divNode_func
}

function createHiddenNode_work_time(e){
  let $hiddenPram_func = document.createElement("input");
  // $hiddenPram_func.id = "calcDataHidden_workTime" + e.target.id;
  $hiddenPram_func.id = "calcDataHidden_workTime" + e.id;
  $hiddenPram_func.type = "hidden";
  $hiddenPram_func.name = "work_time[]";
  // $hiddenPram_func.value = parseInt(window.getComputedStyle(e.target).width);
  $hiddenPram_func.value = parseInt(window.getComputedStyle(e).width);
  return $hiddenPram_func
}

function createHiddenNode_projectId(e){
  let $hiddenPram_projectId_func = document.createElement("input");
  // $hiddenPram_projectId_func.id = "calcDataHidden_projectId" + e.target.id;
  $hiddenPram_projectId_func.id = "calcDataHidden_projectId" + e.id;
  $hiddenPram_projectId_func.type = "hidden";
  $hiddenPram_projectId_func.name = "project_id[]";
  // $hiddenPram_projectId_func.value = e.target.id;
  $hiddenPram_projectId_func.value = e.id;
  return $hiddenPram_projectId_func
}

function createHiddenNode_SystemProcess(e){
  let $hiddenPram_SystemProcess_func = document.createElement("input");
  // $hiddenPram_SystemProcess_func.id = "calcDataHidden_SystemProcess" + e.target.id;
  $hiddenPram_SystemProcess_func.id = "calcDataHidden_SystemProcess" + e.id;
  $hiddenPram_SystemProcess_func.type = "hidden";
  $hiddenPram_SystemProcess_func.name = "SystemProcess[]";
  $hiddenPram_SystemProcess_func.value = document.getElementById('button_status').value;
  return $hiddenPram_SystemProcess_func
}

function onDragStart(e) {
  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text', e.target.id);

  changeCSS_ToDragTask();
  let dragNow = document.getElementById('drag_image');
  e.dataTransfer.setDragImage(dragNow, 0, 0);
}

function onDragOver (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  removeFlg = false;
}


function onDrop(e) {
  e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();

  console.log(e);
  if (isPlacedDropNodeCorrectPlace(e.target) == false){
    console.log('とまれーーーー');
    return;
  }

  var eid = e.dataTransfer.getData('text');
  var elem = document.getElementById(eid);
  try {
    var cloneElem = elem.cloneNode(true);
  } catch(error) {
    console.log('配下済みTaskをDropArea内で再度配下は処理無効');
    return;
  }

  /*複製したものに対しては、複製の証を付ける*/
  cloneElem.id = cloneElem.id.concat('-clones●seq1');
  console.log(cloneElem.id);

  /*色付け作業*/
  let currentDragTask = document.getElementById('drag_image');
  cloneElem.style.backgroundColor = currentDragTask.style.backgroundColor;

  cloneElem.classList.add('resizable');
  cloneElem.classList.add('dropedTasks');
  cloneElem.classList.remove('taskInTheList');
  cloneElem.classList.remove('showDelay');


  /*既に配下済みのタスクがあった場合、idに連番を振る*/
  if (checkSameId(cloneElem.id)){
    console.log('複製処理開始');
    let Array_dropedTasks = getHTMLClass('dropedTasks');
    let idx = 0;

    /*id違いのタスクは対象から除外する*/
    let  Array_sameParamerterIdDropedTasks = Array_dropedTasks.filter(element => {
      let checkParameters = setForCheckParameters(element.id, cloneElem.id);

      if (checkParameters.parameterID === checkParameters.dropedTaskID){
        return true;
      }
    });

    let Array_sequences = [];
    Array_sameParamerterIdDropedTasks.forEach(element => {
      /*「〇〇〇-clones●seq1」となっているidを「〇〇〇-clones」部分まで取得する
      「seq1」の文字列を「seq」と「1」に分割する(数字だけ欲しい為)*/
      let getSequence = element.id.substr(element.id.indexOf('●seq') );
      Array_sequences[idx] = getSequence.slice(4);
      idx++;
    });

    console.log(Array_sequences.sort( function(a, b) {return b - a} ));

    /*最大seq + 1 を格納する*/
    /*id = test-clones●seq1  の「●seq1」以前までの文字列を取得する*/
    /*取得後、最大seq + 1　の値を合体させ、格納しなおす*/
    let maxSeq = parseInt(Array_sequences[0]) + 1;
    let beforeSequenceId = cloneElem.id.substr(0, cloneElem.id.indexOf('●seq') + 4);
    cloneElem.id = beforeSequenceId.concat(maxSeq);
  }

  /*配下したTaskの初期サイズを設定*/
  cloneElem.style.width  = '50px';
  cloneElem.style.height = '50px';

  e.target.appendChild(cloneElem);

  /*初回ドロップ時、初期値を計算。　かつresizibleのつまみをくっつける*/
  caluculateWorkTime(cloneElem);
  addResizibleConponent();
  e.preventDefault();

  /*cloneNodeした物に対しては、clickイベントが生成されないので、再度addEventListerしてあげる*/
  dropedTasks = getHTMLClass('dropedTasks');
  // setEventListener(dropedTasks, 'click', onClick);
  setEventListener(dropedTasks, 'mouseover', caluculateWorkTime_onlyTouch);

   // setEventListener(cloneElem, 'click', onClick);
}




function testList(e){
  /*表示されている子要素に対しては、反応しない様にする*/
  if (e.currentTarget.id != e.target.id){
    console.log('子供は防ぐ!!');
    return;
  }

  let data_work_object = document.getElementsByClassName('taskInTheList');

  Array_data_work_object = Array.from(data_work_object);
  Array_data_work_object.forEach( (el)=> {

    /*表示されている場合、消す。　表示されていない場合、表示させる*/
    if (el.style.display === 'none'){
      el.style.display = 'block';
    }else{
      el.style.display = 'none';
    }
  });
}


/*resizible*/
function addResizibleConponent(){
  $(function() {
    $( ".resizable" ).resizable({
      grid: 15,
      minHeight: 25,
      maxHeight: 50

    });
  });
}

function destroy_H(){
  targetObjects = document.getElementsByClassName('resizable30');
  console.log(targetObjects.length);
  $(function() {
      // if ($('img').hasClass('resizable30')){
      //   $( ".resizable30").resizable( "destroy");
      //   $('img').classList.remove('resizable30');
      //   // $( ".resizable30").resizable( "disable");

    if (targetObjects.length >= 1){
      console.log('うんち');
      $( ".resizable30").resizable( "destroy");
      // targetObjects.classList.remove('resizable30');
      ArraytargetObjects = Array.from(targetObjects);
      ArraytargetObjects.forEach(element => element.classList.remove('resizable30') );
      // $( ".resizable30").resizable( "disable");
    }
  });
}



/**
 * [changeRemoveFlg removeFlgの値をtrueに変更する]
 * @return {[type]} [description]
 */
function changeRemoveFlg(){
  console.log('changeD FLG');
  removeFlg = true;
}



/**
 * [removeTask TaskをdropArea外にdragendした際に、Taskを消す]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
  function removeTask(e){
    // removeFlg = true;
    console.log(e.target);
    if (removeFlg == true){
      console.log('消しますせ')
      e.target.remove();

      /*計算エリアに表記されている数字、及びhiddenの値も削除する*/
      let calcAreaTaskObjects = [];
      calcAreaTaskObjects.workTime        = document.getElementById('calcData' + e.target.id);
      calcAreaTaskObjects.hiddenWorkTime  = document.getElementById('calcDataHidden_workTime' + e.target.id);
      calcAreaTaskObjects.hiddenProjectId = document.getElementById('calcDataHidden_projectId' + e.target.id);
      calcAreaTaskObjects.SystemProcess   = document.getElementById('calcDataHidden_SystemProcess' + e.target.id);

      calcAreaTaskObjects.workTime.remove();
      calcAreaTaskObjects.hiddenWorkTime.remove();
      calcAreaTaskObjects.hiddenProjectId.remove();
      calcAreaTaskObjects.SystemProcess.remove();
    }
    
  }



/**
 * [checkSameId 同一のタスクをドロップエリアに格納した際、ID被りを防ぐ為に確認する]
 * @param  String checkedID  [重複しているか確認したいID]
 * @return {[boolean]} [true: 同一のIDが存在 / false: 同一のIDが存在しない]
 */
function checkSameId(checkedID){
  // var checkSameId_KH = function checkSameId(checkedID){
  let sameIDExistsFlg = false;
  let Array_dropedTasks = getHTMLClass('dropedTasks');

  if (Array_dropedTasks.length >= 1){

    Array_dropedTasks.some(element => {
      let checkParameters = setForCheckParameters(element.id, checkedID);

      if (checkParameters.parameterID === checkParameters.dropedTaskID){
        sameIDExistsFlg = true;
        console.log('同一発見　処置を終了');
      }
      /*同じIDが存在したら、処理を抜ける*/
      return sameIDExistsFlg;
    });
  }

  return sameIDExistsFlg;
}



/**
 * [getHTMLClass querySelectorAllで取得した要素を配列にして返却する]
 * @param  {[string]} targertClass [検索対象のHTMLのclass要素]
 * @return {[Array]}              [Array]
 */
function getHTMLClass(targertClass){
  let dropedTasks = document.querySelectorAll('.' + CSS.escape(targertClass));

  return Array.from(dropedTasks);
}



/**
 * [setForCheckParameters 同一ID調査用のパラメータを連想配列にする]
 * @param {[type]} targertID [画面上に既に配下されているTaskのID達]
 * @param {[type]} checkedID [今回、配下したID]
 */
function setForCheckParameters(targertID, checkedID){
  let checkParameters = {};
  let beforeSequenceIndex = targertID.indexOf('●seq');
  checkParameters.dropedTaskID = targertID.substr(0, beforeSequenceIndex);
  checkParameters.parameterID = checkedID.substr(0, beforeSequenceIndex);

  return checkParameters;
}



/**
 * [changeCSS_ToDragTask 現在選択している工程によって、ドラッグ中のイメージの色合いを変更する]
 * @return {[type]} [description]
 */
function changeCSS_ToDragTask(){
  let currentDragTask = document.getElementById('drag_image');
  let taskArea = document.getElementById('task');
  let RGB = window.getComputedStyle(taskArea).backgroundColor;

  /*RGB値を[R, G, B]の配列に分ける*/
  let RGB_Array = RGB.substring(5, RGB.length - 1).split(',');

  /*opactiy追加の為rgbaを使用*/
  currentDragTask.style.backgroundColor = 'rgba('+ RGB_Array[0] + ',' + RGB_Array[1] +','+ RGB_Array[2] +','+ '1)';
  console.log(currentDragTask.style.backgroundColor);
}



/**
 * [changeWorkingDate 勤務日を変更した際、内部で保持している勤務日も変更する]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function changeWorkingDate(e){
  let hidden_WorkingDate = document.getElementById('hidden_WorkingDate');
  let workingDate = document.getElementById('WorkingDate');
  hidden_WorkingDate.value = workingDate.value;
  console.log(hidden_WorkingDate.value + '/' + workingDate.value);
}







// exports.checkSameId = checkSameId_KH;
exports.checkSameId = checkSameId;