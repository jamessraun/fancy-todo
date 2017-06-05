var app = new Vue({
  el: '#app',
  data: {
    username:'',
    password:'',
    tasks:[],
    new_task:"",
    user:{id:'',name:'',email:''},
    token:false,
    modalEditMemo:'ui small test modal edit transition hidden', //visible
    modalDetilMemo:'ui small test modal detil transition hidden',
    new_title:'',
    new_text:'',
    id_edit:'',
    created_at:'',

  },
  created: function () {
    this.validation()
    var self=this;

    axios.get(`http://localhost:3000/memos/59341b2cf29ee31eb2cc0082`)
    .then(response =>{
      self.tasks=response.data
    })
    .catch(err =>{
      console.log(err);
    })
 },
 computed: {
    remainTask: function(){
      var total=0
      this.tasks.forEach(task =>{
        if(task.is_complete==false){
          total=total+1
        }
      })
      return total;
    }
  },
  methods: {

    login: function(){
      var self = this;
      console.log(self.username);
      var user_pass={
                  username:self.username,
                  password:self.password
                }

      axios.post('http://localhost:3000/login',user_pass)
      .then(response =>{
        console.log("ressspon-------",response.data);
        self.token.id=response.data.id;
        self.token.name=response.data.name;
        console.log('data token-------',self.token.id);
      })

    },
    logout: function(){

     window.localStorage.clear()
     window.localStorage.removeItem('token')
     window.localStorage.removeItem('responseFb')
     location.reload()

    },
    validation: function(){
      var self = this
      axios.post('http://localhost:3000/validation',{
        token : localStorage.getItem('token')
      })
      .then(response=>{
        if(!response.data.name)
        {
          localStorage.clear()
          self.token = false
        }else{
          self.user.id=response.data.id
          self.user.name=response.data.name
          self.user.email=response.data.email
          self.token = true
          console.log('validation---------',response.data);
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    addTask: function() {
      var self = this
      axios.post(`http://localhost:3000/memos/59341b2cf29ee31eb2cc0082`,{
        title:self.new_task,
        text:'',
        is_complete: false,
        created_at: new Date(),
        updated_at: new Date(),
        user_id :'59341b2cf29ee31eb2cc0082'
      })
      .then(response =>{
        self.tasks.push(response.data);
        console.log(response.data);
        self.new_task="";
      })
      .catch(err =>{
        console.log(err);
      })
    },
    editTask: function(task) {
      this.modalEditMemo="ui small test modal transition visible"
      this.new_title=task.title
      this.new_text=task.text
      this.id_edit = task._id

    },
    detilTask: function(task) {
      this.modalDetilMemo="ui small test modal transition visible"
      this.new_title=task.title
      this.new_text=task.text
      this.id_edit = task._id
      this.created_at = task.created_at;

    },
    completeTask: function(task) {

      var self = this
      axios.put(`http://localhost:3000/memos/${task._id}/complete`)
      .then(response =>{
        task.is_complete=true;
        console.log(response.data);
      })
      .catch(err =>{
        console.log(err);
      })
    },
    uncompleteTask: function(task) {

      var self = this
      axios.put(`http://localhost:3000/memos/${task._id}/complete`)
      .then(response =>{
        task.is_complete=false;
        console.log(response.data);
      })
      .catch(err =>{
        console.log(err);
      })
    },
    deleteTask: function(task,index) {
      console.log('------------masuk delete');
      var self = this
      axios.delete(`http://localhost:3000/memos/${task._id}`)
      .then(response =>{
        self.tasks.splice(index,1);
        console.log(response.data);
      })
      .catch(err =>{
        console.log(err);
      })
    },
    modalsubmit: function(id){
      var self = this
      axios.put(`http://localhost:3000/memos/${id}/edit`,{title:this.new_title,text:this.new_text})
      .then(response =>{
        console.log(response.data);
        self.modalEditMemo='ui small test modal edit transition hidden';
        console.log('------------',self.taks[id]);
        self.tasks[id].title=self.new_title
        self.tasks[id].text=self.new_text
        console.log(self.tasks[id].title);
      })
      .catch(err =>{
        console.log(err);
      })
    },
    modalCancel: function(){
      this.modalEditMemo='ui small test modal edit transition hidden';
      this.modalDetilMemo='ui small test modal edit transition hidden';
    }

  }
})
