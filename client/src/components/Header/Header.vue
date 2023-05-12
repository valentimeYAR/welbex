<template>
  <div class="wrapper">
      <div class="container">
          <div class="left">
              <a href="/">
                  <img src="https://welbex.ru/wp-content/themes/welbex/assets/img/logo-part2.svg" alt="logo" class="logo">
              </a>
          </div>
          <div class="right" v-if="token === false">
              <a href="/register" class="register-btn btn">Регистрация</a>
              <a href="/login" class="login-btn btn">Войти</a>
          </div>
          <div class="right" v-if="token">
              <p>Пользователь:</p>
              <span class="login">{{userInfo.login}}</span>
              <a href="/create-article/" class="create-article">Создать запись</a>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Header",
    data(){
        return{
            token: false,
            userInfo: {}
        }
    },
    beforeCreate() {
        try{
            const token = localStorage.getItem("token");
            axios.get('http://localhost:3000/api/user/auth',{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                if(response.status === 200){
                    this.token = true
                    this.userInfo = response.data
                }else {
                    console.log(response.status)
                }
            })
        }catch(e){
            console.log(e)
        }
    }
}
</script>

<style scoped lang="scss">
  .wrapper{
    background-color: black;
    padding: 20px;
  }
  .container{
    width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btn{
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid white;
    color: tomato;
    font-weight: 700;
    &:hover{
      background-color: transparent;
    }
  }
  .right{
    display: flex;
    align-items: center;
    gap: 0 20px;
  }
  .login{
      font-size: 20px;
      text-transform: uppercase;
      cursor: pointer;
  }
  .create-article{
      padding: 10px 20px;
      background-color: white;
      color: black;
      border-radius: 10px;
      border: 1px solid white;
      &:hover{
          border-radius: 20px;
          background-color: transparent;
          color: white;
          transition: 1s;
      }
  }
</style>