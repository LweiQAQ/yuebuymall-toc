<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchList.categoryName">
              {{ searchList.categoryName }}<i @click="delCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchList.keyword">
              {{ searchList.keyword }}<i @click="delKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchList.trademark">
              {{ searchList.trademark.split(":")[1]
              }}<i @click="delTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchList.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i @click="delAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @traDemarkData="traDemarkData" @getAttrs="getAttrs" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a>综合<span v-show="isOne" :class="JT"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a>价格<span v-show="isTwo" :class="JT"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(product, index) in goodsList"
                :key="product.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${product.id}`">
                      <img v-lazy="product.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ product.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      :title="product.title"
                      >{{ product.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>9999+</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <SearchPage
            :pageNo="searchList.pageNo"
            :pageSize="searchList.pageSize"
            :total="products.total"
            :coutinues="5"
            @getPage="getPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchList: {
        attrs: "",
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
        props: [],
        trademark: "",
      }
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    //复杂写法
    // this.searchList.category1Id = this.$route.query.category1Id
    // this.searchList.category2Id = this.$route.query.category2Id
    // this.searchList.category3Id = this.$route.query.category3Id
    // this.searchList.categoryName = this.$route.query.categoryName
    // this.searchList.keyword = this.$route.params.keyWord
    //合并参数
    Object.assign(this.searchList, this.$route.query, this.$route.params);
    console.log(this.searchList);
  },
  computed: {
    ...mapGetters("search", ["attrsList", "goodsList", "trademarkList"]),
    ...mapState("search", ["products"]),
    isOne() {
      return this.searchList.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchList.order.indexOf("2") != -1;
    },
    JT() {
      return this.searchList.order.split(":")[1] == "desc"
        ? "iconfont icon-jiantou-08 "
        : "iconfont icon-jiantou-07 ";
    },
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$store.dispatch("search/getProduct", this.searchList);
    },
    delCategoryName() {
      this.searchList.category1Id = undefined;
      this.searchList.category2Id = undefined;
      this.searchList.category3Id = undefined;
      this.searchList.categoryName = undefined;
      this.searchList.pageNo = 1;
      this.$router.push({ name: "search" });
    },
    delKeyword() {
      this.searchList.keyword = undefined;
      this.searchList.params = undefined;
      this.searchList.pageNo = 1;
      this.$router.push({ name: "search", query: this.$route.query });
      this.$bus.$emit("clear");
    },
    delTrademark() {
      this.searchList.trademark = undefined;
      this.searchList.params = undefined;
      this.searchList.pageNo = 1;
      this.getProduct();
    },
    delAttr(index) {
      this.searchList.props.splice(index, 1);
      this.searchList.pageNo = 1;
      this.getProduct();
    },
    traDemarkData(trademark) {
      this.searchList.trademark = trademark.tmId + ":" + trademark.tmName;
      this.searchList.pageNo = 1;
      this.getProduct();
    },
    getAttrs(attrs, attrValue) {
      this.searchList.pageNo = 1;
      let props = attrs.attrId + ":" + attrValue + ":" + attrValue;
      if (this.searchList.props.indexOf(props) == -1)
        this.searchList.props.push(props);
      this.getProduct();
    },
    changeOrder(flag) {
      // flag:点击的，综合是1，价格是2
      this.searchList.pageNo = 1;
      let originFlag = this.searchList.order.split(":")[0];
      let originSort = this.searchList.order.split(":")[1];
      let newOrder = "";
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:desc`;
      }
      this.searchList.order = newOrder;
      this.getProduct();
    },
    getPage(pageNo) {
      this.searchList.pageNo = pageNo;
      this.getProduct();
    },
  },
  watch: {
    $route(newValue) {
      Object.assign(this.searchList, this.$route.query, this.$route.params);
      this.searchList.pageNo = 1
      this.$store.dispatch("search/getProduct", this.searchList);
      this.getProduct();

    }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #ff8000;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #ff8000;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #ff8000;
                  color: #ff8000;

                  &:hover {
                    border: 1px solid #ff8000;
                    background-color: #ff8000;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>