<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>悦购商城欢迎您！</p>
            <p v-if="!userInfo.name">
              <span>请</span>
              <router-link :to="{ name: 'login' }">登陆</router-link>
              <router-link :to="{ name: 'register' }" class="register">注册</router-link>
            </p>
            <p v-else>
              <a>{{ userInfo.name }}</a>
              <a class="register" @click="userOut">退出登陆</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to='/center'> 我的订单</router-link>
            <router-link to='/shopcart'> 我的购物车</router-link>
            <a href="###">我的悦购</a>
            <a href="###">悦购会员</a>
            <a href="###">企业采购</a>
            <a href="https://space.bilibili.com/42833437" target="_blank">关注悦购</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" title="悦购商城" :to="{ name: 'home' }">
            <img src="./image/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
        <!-- <div name="animate__bounceInRight" class="test" style="">
            <a href="http://www.lweiqaq.top">返回个人主页</a> 
        </div> -->
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      let location = {
        name: "search",
        params: {
          keyword: this.keyword || undefined,
        },
      };
      if (this.$route.query) {
        location.query = this.$route.query;
        this.$router.push(
          location,
          () => {},
          () => {}
        );
      }
    },
    async userOut(){
      await this.$store.dispatch('login/reqUserOut')
      this.$router.push({name:'home'})
    }
  },
  mounted() {
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    userInfo() {
      return this.$store.state.login.userInfo;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  .test {
  display: inline-block;
  margin: 0 0.5rem;

  animation: bounceInRight; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
  position:absolute;
  right:50px;
  top:50px;
  background-color:skyblue;
  width:100px;
  height:100px;
  text-align:center;
  line-height:100px;
  border-radius: 25px;
  font-size: 15px;
}
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ff8000;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ff8000;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>