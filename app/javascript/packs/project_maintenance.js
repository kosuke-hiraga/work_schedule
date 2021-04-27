// test = document.getElementById('test');
// test.addEventListener('click', show_correctionForm);

lists = getHTMLClass2('list');
// setEventListener(lists, 'click', show_correctionForm);
setEventListener(lists, 'click', clickList);
// setEventListener(lists, 'click', getProjectContent);



backButton = getHTMLClass2('form__back--button');
setEventListener(backButton, 'click', show_correctionForm);



const testMove = document.getElementById('testMove');
// testMove.addEventListener('click', ()=> testMove.classList.toggle('is-move') );
testMove.addEventListener('click', showTaskMenu);

const untiti = document.getElementById('untiti');
// testMove.addEventListener('click', ()=> testMove.classList.toggle('is-move') );
untiti.addEventListener('click', () => alert('untiti'));


// console.log(axios.get(location.href + '/getTaskContent'));

// const taskSaveButton =  document.getElementById('taskSaveButton');
// taskSaveButton.addEventListener('click', saveTask);

/**
 * [showTaskMenu Task検索欄、修正欄を同時に表示する]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function showTaskMenu(e){
  const updateForm = document.getElementById('updateForm');
  updateForm.classList.toggle('is-move');

  const searchTasks = document.getElementById('searchTasks');
  searchTasks.classList.toggle('is-show');

  /*「is-move」をそのまま付与すると、移動時のモーションが亡くなってしまうので、若干ディレイを加える必要がある*/
  // searchTasks.classList.toggle('is-move');
  setTimeout( ()=> searchTasks.classList.toggle('is-move') , "10");
  getTaskLists('101');

}


/**
 * [showTaskForm Task編集フォームの表示を行う]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function showTaskForm(e){
  const updateForm = document.getElementById('updateForm');
  updateForm.classList.toggle('is-move2');


  const searchTasks = document.getElementById('searchTasks');
  searchTasks.classList.toggle('is-move2');


  const taskForm = document.getElementById('taskForm');
  taskForm.classList.toggle('is-show');
  // taskForm.classList.toggle('is-move');

  /*「is-move」をそのまま付与すると、移動時のモーションが亡くなってしまうので、若干ディレイを加える必要がある*/
  setTimeout( ()=> taskForm.classList.toggle('is-move') , "10");
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
 * [getHTMLClass querySelectorAllで取得した要素を配列にして返却する]
 * @param  {[string]} targertClass [検索対象のHTMLのclass要素]
 * @return {[Array]}              [Array]
 */
function getHTMLClass2(targertClass){
  let arrayTargetClass = document.getElementsByClassName(targertClass);

  return Array.from(arrayTargetClass);
}


function setEventListener(targertClass, setEvent, setFunctionName){
  targertClass.forEach(element => element.addEventListener(setEvent, setFunctionName));
}


/**
 * [clickList listをクリックした時の挙動を司る]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function clickList(e){
  /*一つ前にクリックしたプロジェクト情報が残ってしまっているので、初期化を図る*/
  resetCorrectionForm();

  const clickedId = e.target.id;

  if(clickedId == 'newProject') {
    /*保存用フォームを表示する*/
    show_correctionForm(e);

  }else{
    /*Ajaxでプロジェクト情報を取得する*/
    getProjectContent(clickedId);

    /*保存用フォームを表示する*/
    show_correctionForm(e);
  }

}



/**
 * [show_correctionForm 保存用フォームを表示する]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function show_correctionForm(e){
  
  const clickedId = e.target.id;
  console.log(clickedId);

  if(clickedId == 'newProject' || clickedId =='form__back--buttonInsert'){
    const wrapInsert = document.getElementById('wrapInsert');
    // const wrapInsert = document.getElementById('wrapInsert');
    wrapInsert.classList.toggle('is-show');
  }else{
    const wrapUpdate = document.getElementById('wrapUpdate');
    wrapUpdate.classList.toggle('is-show');
  }

}



/**
 * [resetCorrectionForm 保存用フォームの値を空白に戻す]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function resetCorrectionForm(e){
    const form__projectId     = document.getElementById('form__projectId--input');
    const form__projectName   = document.getElementById('form__projectName--input');
    const form__projectStatus = document.getElementById('form__projectStatus--select');
    // const form__projectStatus = document.getElementById('form__projectStatus');

    form__projectId.value     = '';
    form__projectName.value   = '';
    form__projectStatus.value = '';
}



/**
 * [getProjectContent クリックしたプロジェクト情報をAjaxで取得する]
 * @param  {[type]} clicledID [description]
 * @return {[type]}   [description]
 */
// function getProjectContent(clicledID){
//   const axiosBase = require('axios');
//   const axios = axiosBase.create({
//     responseType: 'text'
//   });
//   axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content')
//   axios.post(location.href + '/getProjectContent', {
//     id: clicledID
//   })
//   .then(function (response){
//     const form__projectId     = document.getElementById('form__projectId--input');
//     const form__projectName   = document.getElementById('form__projectName--input');
//     const form__projectStatus = document.getElementById('form__projectStatus--select');

//     console.log(form__projectStatus);

//     /*AjaxでDBから取得した内容を初期値に設定する*/
//     const responseData = response.data;
//     console.log(responseData);
//     form__projectId.value     = responseData['project_id'];
//     form__projectName.value   = responseData['project_name'];
//     form__projectStatus.value = responseData['status'];

//     console.log('通信成功');
//   })
//   .catch(function (error){
//     console.log(error);
//     alert('対象データが取得できませんでした');
//     console.log('通信失敗');
//   })

//   .finally(function (){
//     //None
//   });
// }


/**
 * [getProjectContent クリックしたプロジェクト情報に紐づくTaskをAjaxで取得する]
 * @param  {[type]} clicked_ID [description]
 * @return {[type]}   [description]
 */
function getTaskLists(clicked_ID){
  const axiosBase = require('axios');
  const axios = axiosBase.create({
    responseType: 'text'
  });
  axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content')
  axios.post(location.href + '/getTaskLists', {
    id: clicked_ID
  })
  .then(function (response){
    /*taskの初期化*/
    removeTasks();

    const responseData = response.data;
    const searchTasks__search  = document.getElementById('searchTasks__search');

    let divNode = document.createElement("div");
    divNode.id =  'createNewTask';
    divNode.classList.add('list');
    divNode.classList.add('taskInTheList');
    divNode.textContent = 'createNewTask!';
    searchTasks__search.appendChild(divNode);

    /*AjaxでDBから取得した内容をDOMに追加する*/
    response.data.forEach(element => {

      let divNode = document.createElement("div");
      divNode.id =  element['project_id'] + '-' + element['id'];
      divNode.classList.add('list');
      divNode.classList.add('taskInTheList');
      divNode.textContent = element['work_content'];

      searchTasks__search.appendChild(divNode);
    });

    /*表示させたTaskリストの詳細情報を見れる様にイベントを付与する*/
    setEventListener(getHTMLClass2('taskInTheList'), 'click', getTaskContent);

    console.log('通信成功');
  })
  .catch(function (error){
    console.log(error);
    alert('対象データが取得できませんでした');
    console.log('通信失敗');
  })

  .finally(function (){
    //None
  });
}


/**
 * [getTaskContent description]
 * @return {[type]} [description]
 */
function getTaskContent(e){
  // const clicked_ID = e.target.id;


  /*【TODO】　project_id id を分割するロジックが必要*/
  const clicked_ID = 1;

  const axiosBase = require('axios');
  const axios = axiosBase.create({
    responseType: 'text'
  });
  axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content')
  // axios.post('http://localhost:3000/project_maintenance/getTaskContent', {
  axios.post(location.href + '/getTaskContent', {
    id: clicked_ID
  })
  .then(function (response){
    console.log(response);

    console.log(response.data['message']);

    const taskForm__id 　　　　　= document.getElementById('taskForm__id--input');
    const taskForm__workContent = document.getElementById('taskForm__workContent--input');
    const taskForm__projectId   = document.getElementById('taskForm__projectId--input');

    taskForm__id.value          = response.data['id']
    taskForm__workContent.value = response.data['work_content']
    taskForm__projectId.value   = response.data['project_id']

    /*表示させたTaskリストの詳細情報を見れる様にイベントを付与する*/
    // setEventListener(getHTMLClass2('taskInTheList'), 'click', getTaskContent);

    console.log('通信成功');
    
    showTaskForm();

  })
  .catch(function (error){
    console.log(error);
    alert('対象データが取得できませんでした');
    console.log('通信失敗');
  })

  .finally(function (){
    //None
  });

}



/**
 * [removeTask task一覧を一旦リセットの為に全て削除する]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function removeTasks(e){
  let taskInTheList = document.getElementsByClassName('taskInTheList');
  Array.from(taskInTheList).forEach(listNode => listNode.remove());
}



/**
 * [saveTask 画面上に入力した値を取得し、Ajaxで保存する]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function saveTask(e){

}



/*hiraga カーニバル*/
// export const BaseRepository = createAxiosInstance();
const BaseRepository = createAxiosInstance();
function createAxiosInstance(){
    // axios.create でいきなり axios を呼んだ時に使われる通信部(AxiosInstance)がインスタンス化される
    const axiosBase = require('axios');
    const axiosInstance = axiosBase.create({
        // この第一引数オブジェクトで設定を定義
         responseType: 'text'
        // axios で通信する時の URL の頭を決める。大体ドメインとAPI用URL接頭辞
        // baseURL: process.env.MIX_BASE_APP_URL
    });
     
    // interceptors.request.use で送信時に引数に入れた関数が動作する
    // 引数で渡ってくるのは axios の設定(送信先や通信方式も持つ今まさに通信を実行しようとしている設定)で、返り値が通信時に実際に使われる axios の設定になる
    axiosInstance.interceptors.request.use((request)=>{
        // もしヘッダーに API トークンを記述するならば
        // request.headers['Authorization'] = `Bearer ${getApiToken()}`
 
        // もし URL に APIトークンを増やすならば
        // request.params = request.params || {};
        // request.params.apiToken = getApiToken();
         
        // リクエスト内容を見るならば
        request.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
        return request;
    })
 
    // interceptors.response.use で返信時に引数に入れた関数が動作する
    axiosInstance.interceptors.response.use(
        (response)=> response, // 第一引数は通信成功時処理。受けた内容をそのまま通過
        (error)=>{ // 第二引数は通信失敗時処理
            // 通信エラーの内容全体をインデント付きのJSONにして alert 表示
            // これだけだととても見難いので適宜プロジェクトに合わせて必要な情報だけ取る処理にした方がベター
            alert(JSON.stringify(error, ' ', 4));
            const returnValue = {};
            returnValue.error = error;
            returnValue.errorFLG = '1';
            return returnValue
        }
    )
 
    // interceptor で共通処理を追加した通信機能を返す。
    return axiosInstance;
}

// console.log(BaseRepository.post(location.href + '/getTaskLists'));

BaseRepository.post(location.href + '/getTaskLists',{id: 101} )
.then( function(response){

  checkError(response.errorFLG);

 console.log('うんちいいい');
}).catch(function (error){
    alert('対象データが取得できませんでした');
    console.log(error);
});



/**
 * [checkError Ajaxによる通信でエラーが発生した際に、独自のエラーハンドリングする場合に使用する。
 *             axiosのintercepterでエラー発生時にresponseにerrorFlgをリターンするようにしており、それを確認する]                                                              ]
 * @param  {[type]} errorFLG [description]
 * @return {[type]}          [description]
 */
function checkError(errorFLG){
  if(errorFLG == '1'){
    throw response.error
  }
}

