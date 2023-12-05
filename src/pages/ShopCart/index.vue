<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="sku in cartInfoList" :key="sku.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="sku.isChecked == 1"
              @click="changeCheck(sku)"
            />
          </li>
          <li class="cart-list-con2">
            <img v-lazy="sku.imgUrl" />
            <div class="item-msg">{{ sku.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ sku.skuPrice }}￥</span>
          </li>
          <li class="cart-list-con5">
            <button
              href="javascript:void(0)"
              class="mins"
              :disabled="sku.skuNum <= 1"
              @click="changeNum('mins', (disNum += 1), sku), sku.skuNum--"
            >
              -
            </button>
            <input
              autocomplete="off"
              type="text"
              :value="sku.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('inp', $event.target.value * 1, sku)"
            />
            <button
              href="javascript:void(0)"
              class="plus"
              @click="changeNum('add', (disNum += 1), sku), sku.skuNum++"
            >
              +
            </button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ sku.cartPrice * sku.skuNum }}￥</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleSku(sku.sourceId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="AllCheck"
          @click="setAllCheck($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllSku">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="settle()">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash/debounce";
export default {
  name: "ShopCart",
  data() {
    return {
      sum: 0,
      disNum: 0,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("shopcart", ["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    AllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    sumPrice() {
      let sum = 0;
      const CheckList = this.cartInfoList.filter((item) => {
        return item.isChecked == 1;
      });
      CheckList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("shopcart/getCartList");
    },
    deleSku: debounce(async function (skuId) {
      try {
        await this.$store.dispatch("shopcart/delSku", skuId);
        this.$message({type:'success',message:'删除成功'})
        this.getData();
      } catch (error) {
        this.$message.error({type:'success',message:'删除失败'})
      }
    }, 500),
    changeNum: debounce(async function (type, Num, sku) {
      this.disNum = 0;
      switch (type) {
        case "add":
          break;

        case "mins":
          Num = -Num;
          break;

        case "inp":
          if (isNaN(Num) || Num < 1) {
            Num = 0;
          } else {
            Num = parseInt(Num);
            Num = Num - sku.skuNum;
          }
          break;
      }

      try {
        await this.$store.dispatch("detail/getAddCart", {
          skuId: sku.skuId,
          skuNum: Num,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    changeCheck(sku) {
      sku.isChecked == 0 ? (sku.isChecked = 1) : (sku.isChecked = 0);
      this.$store.dispatch("shopcart/setCheck", {
        skuId: sku.sourceId,
        isChecked: sku.isChecked,
      });
    },
    setAllCheck(e) {
      let check = e.target.checked;
      if (check) {
        this.cartInfoList.forEach((item) => {
          item.isChecked = 1;
          this.$store.dispatch("shopcart/setCheck", {
            skuId: item.sourceId,
            isChecked: item.isChecked,
          });
        });
      } else {
        this.cartInfoList.forEach((item) => {
          item.isChecked = 0;
          this.$store.dispatch("shopcart/setCheck", {
            skuId: item.sourceId,
            isChecked: item.isChecked,
          });
        });
      }
    },
     async deleteAllSku() {
      await this.cartInfoList.forEach((sku) => {
        if (sku.isChecked == 1) {
          this.$store.dispatch("shopcart/delSku", sku.sourceId);
        }
        this.getData();
      });
    },
    settle(){
      this.$router.push({name:'trade'})
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 16px;
            height: 35px;
            text-align: center;
            cursor: pointer;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 16px;
            height: 35px;
            text-align: center;
            cursor: pointer;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #ff8000;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #ff8000;
          overflow: hidden;
        }
      }
    }
  }
}
</style>