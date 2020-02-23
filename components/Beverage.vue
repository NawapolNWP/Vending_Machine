<template>
<div class="machine">
    <b-container>
        <b-row>
            <b-col cols="12" md="12">
                <h3 class="my-5 container">Step 1 : Insert your coin</h3>
                <div>
                    <b-row>
                        <b-col cols="8" md="6" style="text-align:center;margin:auto">
                            <b-img class="coin" v-for="(c,index) in coin" :key="index" :src="require(`@/assets/${c.url}`)" v-model="c.coinNum" @click="selectCoin(c.coinNum)"></b-img>
                        </b-col>
                        <b-col cols="12" md="6" style="text-align:center">
                            <span class="fontsCoin">
                                {{money2}} Baht
                                <b-button class="ml-5" size="lg" variant="danger" :disabled="btnRefund" @click="refund()">Refund</b-button>
                            </span>
                            <div class="fontstext my-3" v-show="coinRefund">
                                Your Refund :
                                <b-row class="my-3">
                                    <b-col cols="3" md="3" v-for="(c,index) in coin" :key="index">
                                        <b-img class="coin" :src="require(`@/assets/${c.url}`)" style="width:50px;height:50px"></b-img>
                                        {{c.coinC2}}
                                    </b-col>
                                </b-row>
                            </div>

                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
        <hr class="my-5">
        <h3 class="my-5 container">Step 2 : Select your beverage</h3>
        <b-modal ref="my-modal" hide-footer>
            <div class="d-block text-center">
                <h3>No enough money</h3>
            </div>
        </b-modal>
        <b-row class="my-5" style="margin:auto">
            <b-col cols="12" md="6" class="fontsB my-2" v-for="(i,index) in beverage.data" :key="index">
                <b-card no-body class="overflow-hidden" style="max-width: 540px;border-radius:24px;">
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img :src="i.image" class="imgbev my-3"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body :title="i.name" style="text-align:left;">
                                <b-card-text>
                                    ราคา : {{i.price}}
                                </b-card-text>
                                <b-card-text>
                                    สถานะสินค้า : {{i.in_stock}}
                                </b-card-text>
                                <b-card-text v-if="i.in_stock">
                                    <b-button size="sm" @click="decrease(i,index)" :disabled="btnCount">-</b-button>

                                    {{i.count}}
                                    <b-button size="sm" @click="increase(i,index)" :disabled="btnCount" v-if="i.in_stock">+</b-button>
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <div style="text-align:center">
            <b-button variant="success" size="lg" :disabled="btnAccept" @click="Accept()">Accept</b-button>
        </div>
        <hr>
        <h3 class="my-5 container">Step 3 : Receive your beverage</h3>
        <h3 class="my-5 container">Your receive : </h3>
        <b-row class="my-5" v-show="receiveItem" style="margin:auto;">
            <b-col cols="12" md="6" class="fontsB my-2" style="margin:auto;" v-for="(carts,index) in cart" :key="index">
                <b-card no-body class="overflow-hidden" style="max-width: 540px;border-radius:24px;">
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img :src="carts.image" class="imgbev my-3"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body :title="carts.name" style="text-align:left;">
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <b-col cols="12" md="6">

            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" md="6"></b-col>
            <b-col cols="12" md="6">
                <div class="fontstext my-3" v-show="coinChange">
                    <p style="text-align:center">Your Change :</p>
                    <b-row class="my-3">
                        <b-col cols="3" md="3" v-for="(c,index) in coin" :key="index">
                            <b-img class="coin" :src="require(`@/assets/${c.url}`)" style="width:50px;height:50px"></b-img>
                            {{c.coinC}}
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>

        <div v-show="restartbtn" class="my-5" style="text-align:center">
            <b-button variant="danger" size="lg" @click="restart()" style="margin-bottom:30px">Restart</b-button>
        </div>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            money: 0,
            money2: 0,
            coinCount: [],
            beverage: [],
            cart: [],
            itemCount: [],
            coinRefund: false,
            coinChange: false,
            receiveItem: false,
            btnCount: true,
            btnRefund: true,
            btnAccept: false,
            restartbtn: false,
            coin: [{
                coinNum: 10,
                url: 'coin10.png',
                coinC: 0,
                coinC2: 0,
            }, {
                coinNum: 5,
                url: 'coin5.png',
                coinC: 0,
                coinC2: 0,
            }, {
                coinNum: 2,
                url: 'coin2.png',
                coinC: 0,
                coinC2: 0,
            }, {
                coinNum: 1,
                url: 'coin1.png',
                coinC: 0,
                coinC2: 0,
            }],

        };
    },
    methods: {
        selectCoin(coin) {
            this.coinRefund = false
            this.btnRefund = false
            this.btnCount = false
            console.log("Insert : " + coin)
            this.coinCount.push(coin)
            this.money = this.money + coin
            this.money2 = this.money
            this.coinReturn = false
            console.log("Total1 : " + this.money)
            console.log("Total2 : " + this.money2)
            console.log(this.coinCount)
        },
        refund() {
            this.coinRefund = true
            this.btnRefund = true
            this.btnCount = true
            console.log("Refund = " + this.money)
            for (var i = 0; i < this.coinCount.length; i++) {
                console.log(this.coinCount[i])
                if (this.coinCount[i] == 10) {
                    this.coin[0].coinC += 1
                    this.money -= 10
                } else if (this.coinCount[i] == 5) {
                    this.coin[1].coinC += 1
                    this.money -= 5
                } else if (this.coinCount[i] == 2) {
                    this.coin[2].coinC += 1
                    this.money -= 2
                } else if (this.coinCount[i] == 1) {
                    this.coin[3].coinC += 1
                    this.money -= 1
                } else {
                    console.log("no refund")
                    break;
                }
            }
            this.coinCount = []
            this.money2 = this.money
            this.coin[0].coinC2 = this.coin[0].coinC
            this.coin[1].coinC2 = this.coin[1].coinC
            this.coin[2].coinC2 = this.coin[2].coinC
            this.coin[3].coinC2 = this.coin[3].coinC

            this.coin[0].coinC = 0
            this.coin[1].coinC = 0
            this.coin[2].coinC = 0
            this.coin[3].coinC = 0
            console.log("total = " + this.money)
        },
        increase(i, index) {
            if (this.money >= i.price) {
                this.cart.push(i)
                this.money2 = this.money2 - i.price
                i.count += 1
                console.log("money2" + this.money)
                console.log("You select " + i.name)
            } else {
                this.$refs['my-modal'].show()
                console.log("No enough money")
            }
        },
        decrease(i, index) {
            if (i.count > 0) {
                i.count -= 1
                this.money2 = this.money2 + i.price
                this.cart.splice(index, 1)
            } else {
                i.count == 0
            }
        },
        Accept() {
            //Accept your select beverage
            if (confirm("คุณต้องการยืนยันสินค้าใช่หรือไม่ ?")) {
                const cartArr = this.cart
                if (cartArr.length != 0 && this.money2 >= 0) {
                    this.receiveItem = true
                    this.coinChange = true
                    this.btnCount = true
                    this.restartbtn = true
                    this.btnRefund = true
                    this.btnAccept = true
                    this.money = this.money2
                    do {
                        if (this.money >= 10) {
                            this.coin[0].coinC += 1
                            this.money -= 10
                        } else if (this.money >= 5) {
                            this.coin[1].coinC += 1
                            this.money -= 5
                        } else if (this.money >= 2) {
                            this.coin[2].coinC += 1
                            this.money -= 2
                        } else if (this.money >= 1) {
                            this.coin[3].coinC += 1
                            this.money -= 1
                        } else {
                            console.log("no refund")
                            break;
                        }
                    } while (this.money > 0)
                    this.money2 = this.money
                } else {
                    alert("No products select")
                    console.log("empty")
                }
            } else {
                console.log("Nothing...")
            }
        },
        restart() {
            //Refresh webpage
            location.reload()
        }
    },
    mounted() {
        //GET Product listing 'https://www.mocky.io/v2/5c77c5b330000051009d64c9' or './product.json'
        axios.get('./product.json').then(response => {
                this.beverage = response.data
                console.log(this.beverage)
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>

<style>
.machine {
    border-radius: 24px;
    background-color: white;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}

.imgbev {
    width: 230px;
    height: 200px;
    border-radius: 24px;
}

.coin {
    width: 100px;
    height: 100px;
}

.coin:hover {
    background-color: #E8AB00;
    border-radius: 50%
}

.fontsB {
    font-weight: bold;
    text-align: center;
    margin: auto;
}

.fontsCoin {
    font-size: 40pt;
    font-weight: bold;
    text-align: center;
}

.fontstext {
    font-size: 16pt;
    font-weight: bold;
}
</style>
