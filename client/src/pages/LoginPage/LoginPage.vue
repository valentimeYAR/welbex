<template>
 <div class="wrapper">
     <div class="container">
         <h2 class="title">Авторизация</h2>
         <input
                 type="text"
                 placeholder="Login..."
                 class="input login"
                 v-bind:value="login"
                 @input="inputLogin"
         />
         <input
                 type="password"
                 placeholder="Password..."
                 class="input password"
                 v-bind:value="password"
                 @input="inputPassword"
         />
         <div class="buttons">
             <p class="accept-btn" @click="loginUser">Войти</p>
         </div>
     </div>
 </div>
</template>

<script>
import axios from "axios";

export default {
    name: "LoginPage",
    data(){
        return {
            login: "",
            password: "",
        }
    },
    methods:{
        inputLogin(e){
            this.login = e.target.value
        },
        inputPassword(e){
            this.password = e.target.value
        },
        loginUser(){
            axios.post('http://localhost:3000/api/user/login', {
                login: this.login,
                password: this.password,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const {token} = res.data
                localStorage.setItem('token', token)
            })

        }
    }
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #0D1117;
  height: 100vh;
}

.container {
  width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px 0;
}

.input {
  padding: 20px;
  width: 500px;
}

.title {
  font-size: 30px;
  font-weight: 700;
}

.buttons {
  margin-top: 20px;
}

.accept-btn {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  color: darkgreen;
  font-weight: 700;
  font-size: 20px;
  border: 1px solid white;

  &:hover {
    background-color: transparent;
    border-radius: 20px;
    transition: 1s;
  }
}
</style>