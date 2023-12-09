<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <el-form label-position="right" label-width="80px" :model="info" :rules="rules" ref="info">
          <el-form-item label="手机号" prop="phone" ref="phone">
            <el-input v-model="info.phone" class="input" @blur="setValid"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="info.code" class="input"></el-input>
            <el-button type="success" @click="getCode('phone')" :disabled="info.valid != 'success' ? true : false">{{ time }}</el-button>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="info.password" class="input"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password1">
            <el-input v-model="info.password1" class="input"></el-input>
          </el-form-item>
          <el-form-item prop="type">
            <el-checkbox label="同意协议" v-model="info.type"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 90px;" type="primary" @click="regUser('info')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  import login from '@/store/login'
import { set } from 'nprogress'
import {
    mapState
  } from 'vuex'
  export default {
    name: 'Register',

    data() {
      let validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'))
          // password 是表单上绑定的字段
        } else if (value != this.info.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      
      return {
        info: {
          phone: '',
          password: '',
          password1: '',
          type:[],
          valid:''
        },
        timer:null,
        time:'获取验证码',
        rules: {
          phone: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '请输入正确手机号',
              trigger: 'blur'
            }
          ],
          code: [{
              required: true,
              message: '请输入验证码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 6,
              message: '请输入正确验证码',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              message: '请输入长度大于6的数字',
              trigger: 'blur'
            }
          ],
          password1: [{
              required: true,
              validator: validatePass1,
              trigger: 'blur'
            },
            {
              min: 6,
              max: 6,
              message: '两次密码输入不一致',
              trigger: 'blur'
            }
          ],
          type: [{
            type: 'array',
            required: true,
            message: '请同意协议后注册',
            trigger: 'change'
          }]
        }
      };
    },

    methods: {
      async getCode(phone) {
            try {
                let result = await this.$store.dispatch('register/getCode', this.info.phone)
                    this.$message({
                      message: '验证码是:' + result,
                      type: 'success'
                    })
                    let time = 60
                    this.info.valid = ''
                    this.timer = setInterval(() => {
                        time -= 1
                        this.time = time + 's后重发'
                        if(time <= 0){
                        clearInterval(this.timer)
                        this.info.valid = 'success'
                        this.time = '获取验证码'
                      }
                    },1000)
                    
                  }catch (error) {
                    this.$message.error('获取验证码失败')
                }
          },
      
      regUser(info) {
        this.$refs[info].validate(async (valid) => {
          if (valid) {
            const {phone,password,password1,code} = this.info
            try {
              await this.$store.dispatch('register/setUser', {phone,password,code})
              this.$router.push({
                name: 'login'
              })
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            } catch (error) {
              this.$message.error(error);
            }
          } else {
            return false;
          }
        });

      },
      setValid(){
        this.$nextTick(function(){
          this.info.valid = this.$refs['info'].fields[0].validateState
        })
      }
    },
    computed: {
      ...mapState("register", ['code']),
    },
    watch:{
      
    },
  
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #ff8000;
            ;
          }
        }
      }



      .content {
        padding-left: 390px;
        padding-top: 60px;
        margin-bottom: 18px;
        margin: 0 auto;

      }


      .input {
        width: 270px;
        height: 38px;

      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #ff8000;
          ;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
          border: none;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }

  .el-form {
  .el-form-item {
    /deep/ .el-form-item__content {
      line-height: 0px;
    }
  }
}
</style>