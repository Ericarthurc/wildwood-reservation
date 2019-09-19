// Home.vue
<template>
  <div id="home">
    <header>
      <nav class="navbar fixed-top navbar-expand-sm navbar-dark">
        <a class="navbar-brand" href="https://www.wildwoodcalvarychapel.com">Wildwood Calvary Chapel</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active"></li>
            <li class="nav-item dropdown active">
              <a
                class="nav-link dropdown-toggle"
                href
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >About</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://pushpay.com/pay/wildwoodcalvarychapel"
                >Online Giving</a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.wildwoodcalvarychapel.com/our-history/"
                >Our History</a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.wildwoodcalvarychapel.com/pastoral-staff/"
                >Pastoral Staff</a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.wildwoodcalvarychapel.com/services/"
                >Services</a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.wildwoodcalvarychapel.com/statement-of-faith/"
                >Statement of Faith</a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.wildwoodcalvarychapel.com/support-staff/"
                >Support Staff</a>
              </div>
            </li>
            <li class="nav-item active">
              <a
                class="nav-link"
                target="_blank"
                href="https://www.wildwoodcalvarychapel.com/events-2/"
              >Events</a>
            </li>
            <li class="nav-item dropdown active">
              <a
                class="nav-link dropdown-toggle"
                href
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Other</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="http://www.wildwoodchristianschools.com/"
                >Wildwood Christian Academy</a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://wildwoodcalvary.ccbchurch.com/login.php"
                >Wildwood Online Community</a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="http://www.wildwoodworshipcommunity.com/"
                >Wildwood Worship Community</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div v-bind:class="[classA]">
            <ion-icon name="cloudy-night"></ion-icon>
            <p>8:00am</p>
            <p v-if="seatsDatabase.length">{{ seatsDatabase[0].serviceSeats }}</p>
            <input type="radio" @change="cssCheck" v-model="form1" value="one" />
          </div>
        </div>
        <div class="col-4">
          <div v-bind:class="[classB]">
            <ion-icon name="cloudy"></ion-icon>
            <p>9:45am</p>
            <p v-if="seatsDatabase.length">{{ seatsDatabase[1].serviceSeats }}</p>
            <input type="radio" @change="cssCheck" v-model="form1" value="two" />
          </div>
        </div>
        <div class="col-4">
          <div v-bind:class="[classC]">
            <ion-icon name="sunny"></ion-icon>
            <p>11:30am</p>
            <p v-if="seatsDatabase.length">{{ seatsDatabase[2].serviceSeats }}</p>
            <input type="radio" @change="cssCheck" v-model="form1" value="three" />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <p
            v-bind:style="[errorState ? {'color': 'red', 'font-weight': 'bold'} : {'color': 'rgb(0,200,100)', 'font-weight': 'bold'}]"
          >{{ errorMessage }}
          </p>
          <form @submit.prevent="formHandler">
            <div class="form-group">
              <input type="text" class="form-control" name="form2" placeholder="How many seats:" />
              <input type="name" class="form-control" name="form3" placeholder="Name:" />
              <input type="email" class="form-control" name="form4" placeholder="Email:" />
              <button class="myButton">Submit</button>
            </div>
          </form>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <!-- <div class="container">
      <div class="row">
        <div class="col-1"></div>
        <div class="form-group col-10">
          <div class="row">
            <div class="col-4">
              <div v-bind:class="[classA]">
                <ion-icon name="cloudy-night"></ion-icon>
                <p>First Service</p>
                <p v-if="seatsDatabase.length">{{ seatsDatabase[0].serviceSeats }}</p>
                <input type="radio" @change="cssCheck" v-model="form1" value="serviceOne" />
              </div>
            </div>
            <div class="col-4">
              <div v-bind:class="[classB]">
                <ion-icon name="cloudy"></ion-icon>
                <p>Second Service</p>
                <p v-if="seatsDatabase.length">{{ seatsDatabase[1].serviceSeats }}</p>
                <input type="radio" @change="cssCheck" v-model="form1" value="serviceTwo" />
              </div>
            </div>
            <div class="col-4">
              <div v-bind:class="[classC]">
                <ion-icon name="sunny"></ion-icon>
                <p>Third Service</p>
                <p v-if="seatsDatabase.length">{{ seatsDatabase[2].serviceSeats }}</p>
                <input type="radio" @change="cssCheck" v-model="form1" value="serviceThree" />
              </div>
            </div>
          </div>
          <p
            v-bind:style="[errorState ? {'color': 'red', 'font-weight': 'bold'} : {'color': 'rgb(0,200,100)', 'font-weight': 'bold'}]"
          >{{ errorMessage }}</p>
          <select v-model="form2" class="custom-select weha" placeholder="weha">
            <option selected>How many seats?</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
            <option value="9">Nine</option>
            <option value="10">Ten</option>
          </select>
          <input class="form-control weha" v-model="form3" type="text" placeholder="Place name:" />
          <input class="form-control weha" v-model="form4" type="email" placeholder="Place email:" />
          <button class="btn btn-dark" type="submit" @click="writeToDatabase">Submit</button>
        </div>
        <div class="col-1"></div>
      </div>
    </div>-->
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import validator from "validator";

export default {
  data() {
    return {
      classA: "serviceIconsUnclicked",
      classB: "serviceIconsUnclicked",
      classC: "serviceIconsUnclicked",
      randomNumber: 0,
      form1: "", // service selection
      form2: "", // seat selection
      form3: "", // name
      form4: "", // email
      errorMessage: "",
      selectState: true,
      errorState: "",
      database: [],
      seatsDatabase: []
    };
  },
  methods: {
    async formHandler(e) {
      let service = this.form1;
      let seats = e.target.elements.form2.value;
      let name = e.target.elements.form3.value;
      let email = e.target.elements.form4.value;
      // if (this.validateForm(email, selection, seats, name)) {
      //   console.log("Validated");
      // } else {
      //   console.log("Error");
      // }
      try {
        const req = await axios.post("/users", { name, email, service, seats });
        this.errorState = false
        this.errorMessage = "Successful!"
      } catch (e) {
        console.log('error', e.response.status)
        if (e.response.status === 400) {
          console.log("400 ERROR")
          this.errorState = true
          this.errorMessage = "400 ERROR"
        } else if (e.response.status === 422) {
          console.log("422 ERROR")
          this.errorState = true
          this.errorMessage = "422 ERROR"
        } else {
          console.log("U DUMB")
        }
      }
    },
    cssCheck() {
      if (this.form1 == "serviceOne") {
        this.classA = "serviceIconsClicked";
        this.classB = "serviceIconsUnclicked";
        this.classC = "serviceIconsUnclicked";
      } else if (this.form1 == "serviceTwo") {
        this.classA = "serviceIconsUnclicked";
        this.classB = "serviceIconsClicked";
        this.classC = "serviceIconsUnclicked";
      } else if (this.form1 == "serviceThree") {
        this.classA = "serviceIconsUnclicked";
        this.classB = "serviceIconsUnclicked";
        this.classC = "serviceIconsClicked";
      }
    },
    css(value) {
      console.log(value);
    },
    clearForm() {
      this.form1 = "";
      this.form2 = "How many seats?";
      this.form3 = "";
      this.form4 = "";
      this.classA = "serviceIconsUnclicked";
      this.classB = "serviceIconsUnclicked";
      this.classC = "serviceIconsUnclicked";
      // this.serviceSelection = ""
    },
    // async validateForm(a, b, c) {
    //   if (
    //     !validator.isEmpty(a) ||
    //     !validator.isEmpty(b) ||
    //     !validator.isEmpty(c)
    //   ) {
    //     console.log("validate fun ran");
    //     return true;
    //   } else {
    //     console.log("validate fun errored");
    //     return false;
    //   }
    // },
    // validateForm(a, b, c, d) {
    //   const re = /\S+@\S+\.\S+/;
    //   a = re.test(a);
    //   if (b == "" || d == "" || !a || c == "How many seats?") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    async getSeatsDatabase() {
      try {
        const res = await axios.get("/services");
        this.seatsDatabase = res.data;
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.getSeatsDatabase();
    // this.interval = setInterval(() => this.getSeatsDatabase(), 3000);
  }
};
</script>
