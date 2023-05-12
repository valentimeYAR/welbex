<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Регистрация</h2>
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
                <p class="accept-btn" @click="registerUser">Регистрация</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "RegisterPage",
    data() {
        return {
            login: "",
            password: "",
        }
    },
    methods: {
        inputLogin(e) {
            this.login = e.target.value
        },
        inputPassword(e) {
            this.password = e.target.value
        },
        registerUser() {
            axios.post('http://localhost:3000/api/user/register', {
                login: this.login,
                password: this.password
            }).then((res) => {
                this.$router.push('/login')
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
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border-radius: 20px;
    transition: 1s;
  }
}
</style>